<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Payment;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function admin(Request $request)
    {
        $today = now()->toDateString();
        $thisMonth = now()->format('Y-m');
        $lastMonth = now()->subMonth()->format('Y-m');

        // Estatísticas gerais
        $stats = [
            'total_appointments' => Appointment::count(),
            'appointments_today' => Appointment::whereDate('date', $today)->count(),
            'appointments_this_month' => Appointment::whereRaw("DATE_FORMAT(date, '%Y-%m') = ?", [$thisMonth])->count(),
            'total_revenue' => Payment::where('status', 'pago')->sum('amount'),
            'revenue_this_month' => Payment::where('status', 'pago')
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m') = ?", [$thisMonth])
                ->sum('amount'),
            'revenue_last_month' => Payment::where('status', 'pago')
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m') = ?", [$lastMonth])
                ->sum('amount'),
            'pending_payments' => Payment::where('status', 'pendente')->count(),
            'total_clients' => User::where('role', 'cliente')->count(),
            'total_barbers' => User::where('role', 'barbeiro')->count(),
        ];

        // Agendamentos recentes
        $recent_appointments = Appointment::with(['user', 'barber.user', 'service'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->limit(10)
            ->get();

        // Serviços mais populares
        $popular_services = Service::select('services.*', DB::raw('COUNT(appointments.id) as total'))
            ->leftJoin('appointments', 'services.id', '=', 'appointments.service_id')
            ->groupBy('services.id')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        // Receita por mês (últimos 6 meses)
        $monthly_revenue = Payment::select(
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                DB::raw('SUM(amount) as total')
            )
            ->where('status', 'pago')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_appointments' => $recent_appointments,
            'popular_services' => $popular_services,
            'monthly_revenue' => $monthly_revenue,
        ]);
    }

    public function client(Request $request)
    {
        $user = $request->user();

        $stats = [
            'total_appointments' => $user->appointments()->count(),
            'upcoming_appointments' => $user->appointments()
                ->where('date', '>=', now()->toDateString())
                ->where('status', '!=', 'cancelado')
                ->count(),
            'completed_appointments' => $user->appointments()
                ->where('status', 'concluido')
                ->count(),
            'total_spent' => Payment::whereHas('appointment', function($q) use ($user) {
                $q->where('user_id', $user->id);
            })->where('status', 'pago')->sum('amount'),
        ];

        $upcoming = $user->appointments()
            ->with(['barber.user', 'service', 'payment'])
            ->where('date', '>=', now()->toDateString())
            ->where('status', '!=', 'cancelado')
            ->orderBy('date')
            ->orderBy('time')
            ->limit(5)
            ->get();

        $history = $user->appointments()
            ->with(['barber.user', 'service', 'payment'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'upcoming_appointments' => $upcoming,
            'appointment_history' => $history,
        ]);
    }
}

