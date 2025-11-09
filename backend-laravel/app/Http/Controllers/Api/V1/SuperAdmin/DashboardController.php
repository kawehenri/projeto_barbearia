<?php

namespace App\Http\Controllers\Api\V1\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Sale;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_companies' => Company::count(),
            'active_companies' => Company::active()->count(),
            'suspended_companies' => Company::suspended()->count(),
            'total_users' => User::count(),
            'total_barbers' => User::barbers()->count(),
            'total_clients' => User::clients()->count(),
            'total_appointments' => Appointment::count(),
            'total_sales' => Sale::sum('total'),
            'total_commissions_pending' => Commission::pending()->sum('amount'),
            'total_commissions_paid' => Commission::paid()->sum('amount'),
        ];

        $recentCompanies = Company::latest()->take(5)->get();
        $topCompanies = $this->getTopCompanies();

        return response()->json([
            'stats' => $stats,
            'recent_companies' => $recentCompanies,
            'top_companies' => $topCompanies,
        ]);
    }

    public function stats()
    {
        // Estatísticas detalhadas
        $monthlyRevenue = Sale::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(total) as revenue')
        )
        ->whereYear('created_at', date('Y'))
        ->groupBy('month')
        ->get();

        $companiesByPlan = Company::select('subscription_plan', DB::raw('count(*) as total'))
            ->groupBy('subscription_plan')
            ->get();

        return response()->json([
            'monthly_revenue' => $monthlyRevenue,
            'companies_by_plan' => $companiesByPlan,
        ]);
    }

    public function revenue()
    {
        $totalRevenue = Sale::sum('total');
        $monthlyRevenue = Sale::whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'))
            ->sum('total');

        $revenueByCompany = Company::withCount(['sales as total_sales' => function ($query) {
            $query->select(DB::raw('SUM(total)'));
        }])->orderBy('total_sales', 'desc')->take(10)->get();

        return response()->json([
            'total_revenue' => $totalRevenue,
            'monthly_revenue' => $monthlyRevenue,
            'top_companies' => $revenueByCompany,
        ]);
    }

    private function getTopCompanies()
    {
        return Company::withCount(['appointments', 'sales'])
            ->with(['sales' => function ($query) {
                $query->select('company_id', DB::raw('SUM(total) as revenue'))
                    ->groupBy('company_id');
            }])
            ->orderBy('sales_count', 'desc')
            ->take(10)
            ->get();
    }
}

