<?php

namespace App\Http\Controllers\Api\V1\Barber;

use App\Http\Controllers\Controller;
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
        $barberId = $request->user()->id;

        $stats = [
            'appointments_today' => Appointment::where('barber_id', $barberId)
                ->whereDate('scheduled_at', today())
                ->count(),
            'appointments_this_week' => Appointment::where('barber_id', $barberId)
                ->whereBetween('scheduled_at', [now()->startOfWeek(), now()->endOfWeek()])
                ->count(),
            'sales_today' => Sale::where('barber_id', $barberId)
                ->whereDate('created_at', today())
                ->sum('total'),
            'sales_this_month' => Sale::where('barber_id', $barberId)
                ->whereMonth('created_at', date('m'))
                ->sum('total'),
            'pending_commissions' => Commission::where('barber_id', $barberId)
                ->pending()
                ->sum('amount'),
            'total_commissions_month' => Commission::where('barber_id', $barberId)
                ->whereMonth('created_at', date('m'))
                ->sum('amount'),
        ];

        $upcomingAppointments = Appointment::where('barber_id', $barberId)
            ->where('scheduled_at', '>', now())
            ->with('client')
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();

        return response()->json([
            'stats' => $stats,
            'upcoming_appointments' => $upcomingAppointments,
        ]);
    }

    public function stats(Request $request)
    {
        $barberId = $request->user()->id;

        // Vendas por mês
        $monthlySales = Sale::where('barber_id', $barberId)
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total) as total')
            )
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->get();

        // Comissões por tipo
        $commissionsByType = Commission::where('barber_id', $barberId)
            ->select('type', DB::raw('SUM(amount) as total'))
            ->groupBy('type')
            ->get();

        return response()->json([
            'monthly_sales' => $monthlySales,
            'commissions_by_type' => $commissionsByType,
        ]);
    }

    public function mySales(Request $request)
    {
        $sales = Sale::where('barber_id', $request->user()->id)
            ->with(['client', 'product'])
            ->latest()
            ->paginate(20);

        return response()->json($sales);
    }

    public function myCommissions(Request $request)
    {
        $commissions = Commission::where('barber_id', $request->user()->id)
            ->with(['appointment', 'sale'])
            ->latest()
            ->get();

        return response()->json($commissions);
    }

    public function pendingCommissions(Request $request)
    {
        $commissions = Commission::where('barber_id', $request->user()->id)
            ->pending()
            ->with(['appointment', 'sale'])
            ->get();

        return response()->json($commissions);
    }

    public function paidCommissions(Request $request)
    {
        $commissions = Commission::where('barber_id', $request->user()->id)
            ->paid()
            ->with(['appointment', 'sale'])
            ->get();

        return response()->json($commissions);
    }

    public function myAppointments(Request $request)
    {
        $appointments = Appointment::where('barber_id', $request->user()->id)
            ->with(['client', 'service'])
            ->latest('scheduled_at')
            ->paginate(20);

        return response()->json($appointments);
    }

    public function completeAppointment(Request $request, $id)
    {
        $appointment = Appointment::where('barber_id', $request->user()->id)
            ->findOrFail($id);

        $appointment->update(['status' => 'completed']);

        return response()->json([
            'message' => 'Agendamento marcado como concluído!',
            'appointment' => $appointment,
        ]);
    }

    public function products(Request $request)
    {
        $companyId = $request->user()->company_id;

        $products = Product::where('company_id', $companyId)
            ->active()
            ->get();

        return response()->json($products);
    }
}

