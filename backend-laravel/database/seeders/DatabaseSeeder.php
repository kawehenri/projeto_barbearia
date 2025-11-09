<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Barber;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Criar Admin
        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@barbearia.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '(11) 99999-9999',
        ]);

        // Criar Clientes
        $cliente1 = User::create([
            'name' => 'João Silva',
            'email' => 'cliente@teste.com',
            'password' => Hash::make('password'),
            'role' => 'cliente',
            'phone' => '(11) 98888-8888',
        ]);

        $cliente2 = User::create([
            'name' => 'Maria Santos',
            'email' => 'maria@teste.com',
            'password' => Hash::make('password'),
            'role' => 'cliente',
            'phone' => '(11) 97777-7777',
        ]);

        // Criar Barbeiros
        $barbeiroUser1 = User::create([
            'name' => 'Carlos Barbeiro',
            'email' => 'barbeiro@teste.com',
            'password' => Hash::make('password'),
            'role' => 'barbeiro',
            'phone' => '(11) 96666-6666',
        ]);

        $barbeiro1 = Barber::create([
            'user_id' => $barbeiroUser1->id,
            'specialty' => 'Corte Masculino',
            'bio' => 'Especialista em cortes modernos e clássicos',
            'active' => true,
        ]);

        $barbeiroUser2 = User::create([
            'name' => 'Pedro Estilista',
            'email' => 'pedro@teste.com',
            'password' => Hash::make('password'),
            'role' => 'barbeiro',
            'phone' => '(11) 95555-5555',
        ]);

        $barbeiro2 = Barber::create([
            'user_id' => $barbeiroUser2->id,
            'specialty' => 'Barba e Bigode',
            'bio' => 'Mestre em design de barba',
            'active' => true,
        ]);

        // Criar Serviços
        $servico1 = Service::create([
            'name' => 'Corte Masculino',
            'description' => 'Corte de cabelo masculino moderno',
            'price' => 35.00,
            'duration' => 30,
            'active' => true,
        ]);

        $servico2 = Service::create([
            'name' => 'Barba',
            'description' => 'Aparar e modelar barba',
            'price' => 25.00,
            'duration' => 20,
            'active' => true,
        ]);

        $servico3 = Service::create([
            'name' => 'Corte + Barba',
            'description' => 'Pacote completo: corte e barba',
            'price' => 50.00,
            'duration' => 45,
            'active' => true,
        ]);

        $servico4 = Service::create([
            'name' => 'Sobrancelha',
            'description' => 'Design de sobrancelhas',
            'price' => 15.00,
            'duration' => 15,
            'active' => true,
        ]);

        // Criar Agendamentos
        $appointment1 = Appointment::create([
            'user_id' => $cliente1->id,
            'barber_id' => $barbeiro1->id,
            'service_id' => $servico1->id,
            'date' => now()->addDays(2)->toDateString(),
            'time' => '10:00',
            'status' => 'agendado',
            'notes' => 'Primeira vez',
        ]);

        Payment::create([
            'appointment_id' => $appointment1->id,
            'amount' => $servico1->price,
            'status' => 'pendente',
        ]);

        $appointment2 = Appointment::create([
            'user_id' => $cliente2->id,
            'barber_id' => $barbeiro2->id,
            'service_id' => $servico3->id,
            'date' => now()->addDays(3)->toDateString(),
            'time' => '14:00',
            'status' => 'agendado',
        ]);

        Payment::create([
            'appointment_id' => $appointment2->id,
            'amount' => $servico3->price,
            'status' => 'pago',
            'method' => 'pix',
            'paid_at' => now(),
        ]);

        $appointment3 = Appointment::create([
            'user_id' => $cliente1->id,
            'barber_id' => $barbeiro1->id,
            'service_id' => $servico2->id,
            'date' => now()->subDays(5)->toDateString(),
            'time' => '16:00',
            'status' => 'concluido',
        ]);

        Payment::create([
            'appointment_id' => $appointment3->id,
            'amount' => $servico2->price,
            'status' => 'pago',
            'method' => 'dinheiro',
            'paid_at' => now()->subDays(5),
        ]);
    }
}

