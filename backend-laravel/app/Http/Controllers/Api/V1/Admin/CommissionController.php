<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;

class CommissionController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $commissions = Commission::where('company_id', $companyId)
            ->with(['barber', 'appointment', 'sale'])
            ->latest()
            ->paginate(20);

        return response()->json($commissions);
    }

    public function pending(Request $request)
    {
        $companyId = $request->user()->company_id;

        $commissions = Commission::where('company_id', $companyId)
            ->pending()
            ->with(['barber', 'appointment', 'sale'])
            ->latest()
            ->get();

        return response()->json($commissions);
    }

    public function markAsPaid(Request $request, $id)
    {
        $commission = Commission::where('company_id', $request->user()->company_id)
            ->findOrFail($id);

        $commission->markAsPaid();

        return response()->json([
            'message' => 'Comissão marcada como paga!',
            'commission' => $commission,
        ]);
    }

    public function byBarber(Request $request, $barberId)
    {
        $commissions = Commission::where('company_id', $request->user()->company_id)
            ->where('barber_id', $barberId)
            ->with(['appointment', 'sale'])
            ->latest()
            ->get();

        $stats = [
            'total' => $commissions->sum('amount'),
            'pending' => $commissions->where('status', 'pending')->sum('amount'),
            'paid' => $commissions->where('status', 'paid')->sum('amount'),
        ];

        return response()->json([
            'commissions' => $commissions,
            'stats' => $stats,
        ]);
    }

    public function allCommissions(Request $request)
    {
        // Somente para Super Admin
        $commissions = Commission::with(['company', 'barber', 'appointment', 'sale'])
            ->latest()
            ->paginate(50);

        return response()->json($commissions);
    }
}

