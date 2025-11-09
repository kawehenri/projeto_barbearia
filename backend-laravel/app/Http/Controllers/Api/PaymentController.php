<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with('appointment.user', 'appointment.service');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $payments = $query->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:dinheiro,cartao,pix,transferencia',
        ]);

        $payment = Payment::create([
            'appointment_id' => $request->appointment_id,
            'amount' => $request->amount,
            'status' => 'pago',
            'method' => $request->method,
            'paid_at' => now(),
        ]);

        $payment->load('appointment.user', 'appointment.service');

        return response()->json($payment, 201);
    }

    public function show($id)
    {
        $payment = Payment::with('appointment.user', 'appointment.service')
            ->findOrFail($id);

        return response()->json($payment);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $request->validate([
            'status' => 'sometimes|in:pendente,pago,cancelado,reembolsado',
            'method' => 'sometimes|in:dinheiro,cartao,pix,transferencia',
            'transaction_id' => 'nullable|string',
        ]);

        if ($request->status === 'pago' && !$payment->paid_at) {
            $request->merge(['paid_at' => now()]);
        }

        $payment->update($request->all());
        $payment->load('appointment.user', 'appointment.service');

        return response()->json($payment);
    }

    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Pagamento excluído com sucesso']);
    }
}

