<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Sale;
use App\Models\Commission;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $stats = [
            'total_barbers' => User::ofCompany($companyId)->barbers()->count(),
            'total_clients' => User::ofCompany($companyId)->clients()->count(),
            'total_appointments' => Appointment::where('company_id', $companyId)->count(),
            'appointments_today' => Appointment::where('company_id', $companyId)
                ->whereDate('scheduled_at', today())
                ->count(),
            'total_products' => Product::where('company_id', $companyId)->count(),
            'low_stock_products' => Product::where('company_id', $companyId)->lowStock()->count(),
            'total_sales' => Sale::where('company_id', $companyId)->sum('total'),
            'sales_this_month' => Sale::where('company_id', $companyId)
                ->whereMonth('created_at', date('m'))
                ->sum('total'),
            'pending_commissions' => Commission::where('company_id', $companyId)
                ->pending()
                ->sum('amount'),
        ];

        $recentSales = Sale::where('company_id', $companyId)
            ->with(['barber', 'client', 'product'])
            ->latest()
            ->take(10)
            ->get();

        $topBarbers = $this->getTopBarbers($companyId);

        return response()->json([
            'stats' => $stats,
            'recent_sales' => $recentSales,
            'top_barbers' => $topBarbers,
            'company' => $request->user()->company,
        ]);
    }

    public function stats(Request $request)
    {
        $companyId = $request->user()->company_id;

        // Vendas por mês
        $monthlySales = Sale::where('company_id', $companyId)
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total) as total')
            )
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->get();

        // Comissões por barbeiro
        $commissionsByBarber = Commission::where('company_id', $companyId)
            ->with('barber')
            ->select('barber_id', DB::raw('SUM(amount) as total'))
            ->groupBy('barber_id')
            ->get();

        return response()->json([
            'monthly_sales' => $monthlySales,
            'commissions_by_barber' => $commissionsByBarber,
        ]);
    }

    public function revenue(Request $request)
    {
        $companyId = $request->user()->company_id;

        $totalRevenue = Sale::where('company_id', $companyId)->sum('total');
        $totalCost = Sale::where('company_id', $companyId)
            ->join('products', 'sales.product_id', '=', 'products.id')
            ->sum(DB::raw('sales.quantity * products.cost'));
        
        $profit = $totalRevenue - $totalCost;

        return response()->json([
            'total_revenue' => $totalRevenue,
            'total_cost' => $totalCost,
            'profit' => $profit,
            'profit_margin' => $totalRevenue > 0 ? ($profit / $totalRevenue) * 100 : 0,
        ]);
    }

    public function barbers(Request $request)
    {
        $companyId = $request->user()->company_id;

        $barbers = User::ofCompany($companyId)
            ->barbers()
            ->withCount('appointments')
            ->with(['sales' => function ($query) {
                $query->select('barber_id', DB::raw('SUM(total) as total_sales'))
                    ->groupBy('barber_id');
            }])
            ->get();

        return response()->json($barbers);
    }

    public function clients(Request $request)
    {
        $companyId = $request->user()->company_id;

        $clients = User::ofCompany($companyId)
            ->clients()
            ->withCount('appointments')
            ->get();

        return response()->json($clients);
    }

    public function barberPerformance(Request $request, $id)
    {
        $companyId = $request->user()->company_id;

        $barber = User::ofCompany($companyId)
            ->barbers()
            ->findOrFail($id);

        $stats = [
            'total_appointments' => $barber->appointments()->count(),
            'total_sales' => $barber->sales()->sum('total'),
            'total_commissions' => $barber->commissions()->sum('amount'),
            'pending_commissions' => $barber->commissions()->pending()->sum('amount'),
            'paid_commissions' => $barber->commissions()->paid()->sum('amount'),
        ];

        return response()->json([
            'barber' => $barber,
            'stats' => $stats,
        ]);
    }

    public function companySettings(Request $request)
    {
        return response()->json($request->user()->company);
    }

    public function updateCompany(Request $request)
    {
        $company = $request->user()->company;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'business_hours' => 'nullable|array',
        ]);

        $company->update($validated);

        return response()->json([
            'message' => 'Configurações atualizadas com sucesso!',
            'company' => $company,
        ]);
    }

    private function getTopBarbers($companyId)
    {
        return User::ofCompany($companyId)
            ->barbers()
            ->withCount('appointments')
            ->with(['sales' => function ($query) {
                $query->select('barber_id', DB::raw('SUM(total) as revenue'))
                    ->groupBy('barber_id');
            }])
            ->orderBy('appointments_count', 'desc')
            ->take(5)
            ->get();
    }
}

