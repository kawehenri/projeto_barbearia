<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Payment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::with(['user', 'barber.user', 'service', 'payment']);

        // Filtros
        if ($request->user()->isCliente()) {
            $query->where('user_id', $request->user()->id);
        } elseif ($request->user()->isBarber()) {
            $query->where('barber_id', $request->user()->barber->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        $appointments = $query->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->paginate(15);

        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'barber_id' => 'required|exists:barbers,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'notes' => 'nullable|string',
        ]);

        // Verificar se já existe agendamento no mesmo horário
        $existing = Appointment::where('barber_id', $request->barber_id)
            ->where('date', $request->date)
            ->where('time', $request->time)
            ->where('status', '!=', 'cancelado')
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Este horário já está ocupado'
            ], 422);
        }

        $appointment = Appointment::create([
            'user_id' => $request->user()->id,
            'barber_id' => $request->barber_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'agendado',
            'notes' => $request->notes,
        ]);

        // Criar pagamento pendente
        $service = $appointment->service;
        Payment::create([
            'appointment_id' => $appointment->id,
            'amount' => $service->price,
            'status' => 'pendente',
        ]);

        $appointment->load(['user', 'barber.user', 'service', 'payment']);

        return response()->json($appointment, 201);
    }

    public function show($id)
    {
        $appointment = Appointment::with(['user', 'barber.user', 'service', 'payment'])
            ->findOrFail($id);

        return response()->json($appointment);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        // Verificar permissões
        if ($request->user()->isCliente() && $appointment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Não autorizado'], 403);
        }

        $request->validate([
            'barber_id' => 'sometimes|exists:barbers,id',
            'service_id' => 'sometimes|exists:services,id',
            'date' => 'sometimes|date',
            'time' => 'sometimes|date_format:H:i',
            'status' => 'sometimes|in:agendado,confirmado,em_andamento,concluido,cancelado',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($request->only([
            'barber_id', 'service_id', 'date', 'time', 'status', 'notes'
        ]));

        $appointment->load(['user', 'barber.user', 'service', 'payment']);

        return response()->json($appointment);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Agendamento excluído com sucesso']);
    }
}

