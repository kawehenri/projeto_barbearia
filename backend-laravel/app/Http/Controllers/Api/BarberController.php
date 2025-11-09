<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barber;
use Illuminate\Http\Request;

class BarberController extends Controller
{
    public function index()
    {
        $barbers = Barber::with('user')
            ->where('active', true)
            ->get();

        return response()->json($barbers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|unique:barbers,user_id',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'active' => 'boolean',
        ]);

        $barber = Barber::create($request->all());
        $barber->load('user');

        return response()->json($barber, 201);
    }

    public function show($id)
    {
        $barber = Barber::with(['user', 'workSchedules', 'appointments'])
            ->findOrFail($id);

        return response()->json($barber);
    }

    public function update(Request $request, $id)
    {
        $barber = Barber::findOrFail($id);

        $request->validate([
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'photo' => 'nullable|string',
            'active' => 'boolean',
        ]);

        $barber->update($request->all());
        $barber->load('user');

        return response()->json($barber);
    }

    public function destroy($id)
    {
        $barber = Barber::findOrFail($id);
        $barber->delete();

        return response()->json(['message' => 'Barbeiro excluído com sucesso']);
    }

    public function availableSlots(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $barber = Barber::findOrFail($id);
        $date = $request->date;

        // Horários disponíveis (exemplo: 8h às 18h, intervalos de 30min)
        $slots = [];
        $start = strtotime($date . ' 08:00');
        $end = strtotime($date . ' 18:00');
        $interval = 30 * 60; // 30 minutos

        for ($time = $start; $time <= $end; $time += $interval) {
            $slotTime = date('H:i', $time);
            
            // Verificar se já existe agendamento
            $hasAppointment = $barber->appointments()
                ->where('date', $date)
                ->where('time', $slotTime)
                ->where('status', '!=', 'cancelado')
                ->exists();

            if (!$hasAppointment) {
                $slots[] = $slotTime;
            }
        }

        return response()->json(['slots' => $slots]);
    }
}

