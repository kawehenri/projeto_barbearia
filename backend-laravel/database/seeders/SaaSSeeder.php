<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\User;
use App\Models\Service;
use App\Models\Product;
use App\Models\Barber;
use App\Models\Appointment;
use App\Models\Sale;
use App\Models\Subscription;
use Illuminate\Support\Str;

class SaaSSeeder extends Seeder
{
    public function run()
    {
        echo "🚀 Iniciando seed do sistema SaaS...\n\n";

        // 1. Super Admin
        echo "👤 Criando Super Admin...\n";
        $superAdmin = User::create([
            'company_id' => null,
            'name' => 'Super Admin',
            'email' => 'superadmin@sistema.com',
            'password' => 'password',
            'role' => 'super_admin',
            'phone' => '(11) 99999-0000',
            'status' => 'active',
        ]);
        echo "✅ Super Admin criado: {$superAdmin->email}\n\n";

        // 2. Criar Companies (Barbearias)
        $companies = [
            [
                'name' => 'Barbearia VIP',
                'email' => 'contato@barbeariavip.com',
                'phone' => '(11) 98888-1111',
                'address' => 'Rua das Flores, 123 - São Paulo',
                'plan' => 'premium',
            ],
            [
                'name' => 'Barbershop Elite',
                'email' => 'contato@barbershopelite.com',
                'phone' => '(11) 98888-2222',
                'address' => 'Av. Paulista, 456 - São Paulo',
                'plan' => 'enterprise',
            ],
            [
                'name' => 'BarberKing',
                'email' => 'contato@barberking.com',
                'phone' => '(11) 98888-3333',
                'address' => 'Rua Oscar Freire, 789 - São Paulo',
                'plan' => 'basic',
            ],
        ];

        foreach ($companies as $companyData) {
            echo "🏢 Criando barbearia: {$companyData['name']}...\n";
            
            $company = Company::create([
                'name' => $companyData['name'],
                'slug' => Str::slug($companyData['name']),
                'email' => $companyData['email'],
                'phone' => $companyData['phone'],
                'address' => $companyData['address'],
                'status' => 'active',
                'subscription_plan' => $companyData['plan'],
                'subscription_expires_at' => now()->addMonth(),
                'business_hours' => [
                    'monday' => '09:00-18:00',
                    'tuesday' => '09:00-18:00',
                    'wednesday' => '09:00-18:00',
                    'thursday' => '09:00-18:00',
                    'friday' => '09:00-20:00',
                    'saturday' => '09:00-17:00',
                    'sunday' => 'closed',
                ],
            ]);

            // Criar assinatura
            Subscription::create([
                'company_id' => $company->id,
                'plan' => $companyData['plan'],
                'amount' => $this->getPlanPrice($companyData['plan']),
                'status' => 'active',
                'starts_at' => now(),
                'expires_at' => now()->addMonth(),
                'paid_at' => now(),
                'payment_method' => 'credit',
            ]);

            // Criar Admin da barbearia
            $admin = User::create([
                'company_id' => $company->id,
                'name' => "Admin - {$company->name}",
                'email' => "admin@" . Str::slug($company->name) . ".com",
                'password' => 'password',
                'role' => 'admin',
                'phone' => $companyData['phone'],
                'status' => 'active',
            ]);
            echo "  ✅ Admin: {$admin->email}\n";

            // Criar Barbeiros
            $barberNames = ['Carlos Silva', 'João Santos', 'Pedro Oliveira'];
            foreach ($barberNames as $index => $name) {
                $barber = User::create([
                    'company_id' => $company->id,
                    'name' => $name,
                    'email' => Str::slug($name) . '@' . Str::slug($company->name) . '.com',
                    'password' => 'password',
                    'role' => 'barbeiro',
                    'phone' => '(11) 9' . rand(1000, 9999) . '-' . rand(1000, 9999),
                    'status' => 'active',
                ]);

                // Criar registro na tabela barbers
                Barber::create([
                    'company_id' => $company->id,
                    'user_id' => $barber->id,
                    'specialty' => ['Corte', 'Barba', 'Sobrancelha'][rand(0, 2)],
                    'commission_rate' => [30, 35, 40][rand(0, 2)],
                ]);

                echo "  ✅ Barbeiro: {$barber->name}\n";
            }

            // Criar Clientes
            $clientNames = ['Maria Silva', 'Ana Costa', 'Juliana Lima', 'Fernanda Souza'];
            foreach ($clientNames as $name) {
                User::create([
                    'company_id' => $company->id,
                    'name' => $name,
                    'email' => Str::slug($name) . '-' . $company->id . '@cliente.com', // Único por company
                    'password' => 'password',
                    'role' => 'cliente',
                    'phone' => '(11) 9' . rand(1000, 9999) . '-' . rand(1000, 9999),
                    'status' => 'active',
                ]);
            }
            echo "  ✅ 4 Clientes criados\n";

            // Criar Serviços
            $services = [
                ['name' => 'Corte Masculino', 'price' => 50.00, 'duration' => 30, 'commission' => 30],
                ['name' => 'Barba', 'price' => 35.00, 'duration' => 20, 'commission' => 35],
                ['name' => 'Corte + Barba', 'price' => 75.00, 'duration' => 45, 'commission' => 30],
                ['name' => 'Sobrancelha', 'price' => 15.00, 'duration' => 10, 'commission' => 40],
                ['name' => 'Hidratação Capilar', 'price' => 80.00, 'duration' => 60, 'commission' => 25],
            ];

            foreach ($services as $serviceData) {
                Service::create([
                    'company_id' => $company->id,
                    'name' => $serviceData['name'],
                    'price' => $serviceData['price'],
                    'duration' => $serviceData['duration'],
                    'commission_rate' => $serviceData['commission'],
                ]);
            }
            echo "  ✅ 5 Serviços criados\n";

            // Criar Produtos
            $products = [
                ['name' => 'Pomada Modeladora', 'price' => 45.00, 'cost' => 20.00, 'stock' => 50],
                ['name' => 'Shampoo Anticaspa', 'price' => 35.00, 'cost' => 15.00, 'stock' => 30],
                ['name' => 'Óleo para Barba', 'price' => 55.00, 'cost' => 25.00, 'stock' => 25],
                ['name' => 'Cera Modeladora', 'price' => 40.00, 'cost' => 18.00, 'stock' => 40],
                ['name' => 'Gel Fixador', 'price' => 25.00, 'cost' => 10.00, 'stock' => 60],
                ['name' => 'Loção Pós-Barba', 'price' => 30.00, 'cost' => 12.00, 'stock' => 35],
            ];

            foreach ($products as $productData) {
                Product::create([
                    'company_id' => $company->id,
                    'name' => $productData['name'],
                    'sku' => 'SKU-' . rand(1000, 9999),
                    'price' => $productData['price'],
                    'cost' => $productData['cost'],
                    'stock' => $productData['stock'],
                    'min_stock' => 10,
                    'supplier' => ['Supplier A', 'Supplier B', 'Supplier C'][rand(0, 2)],
                    'status' => 'active',
                ]);
            }
            echo "  ✅ 6 Produtos criados\n";

            // Criar algumas vendas
            $barbers = User::where('company_id', $company->id)->barbers()->get();
            $clients = User::where('company_id', $company->id)->clients()->get();
            $productsInStock = Product::where('company_id', $company->id)->get();

            for ($i = 0; $i < 10; $i++) {
                Sale::create([
                    'company_id' => $company->id,
                    'barber_id' => $barbers->random()->id,
                    'client_id' => $clients->random()->id,
                    'product_id' => $productsInStock->random()->id,
                    'quantity' => rand(1, 3),
                    'unit_price' => $productsInStock->random()->price,
                    'commission_rate' => rand(10, 30),
                    'payment_method' => ['cash', 'credit', 'debit', 'pix'][rand(0, 3)],
                ]);
            }
            echo "  ✅ 10 Vendas criadas (comissões automáticas)\n";

            echo "✅ Barbearia '{$company->name}' configurada!\n\n";
        }

        echo "\n🎉 Seed completo! Sistema SaaS pronto para uso!\n\n";
        echo "═══════════════════════════════════════\n";
        echo "📋 CREDENCIAIS DE ACESSO:\n";
        echo "═══════════════════════════════════════\n\n";
        echo "🔐 SUPER ADMIN:\n";
        echo "   Email: superadmin@sistema.com\n";
        echo "   Senha: password\n\n";
        echo "🔐 ADMIN - Barbearia VIP:\n";
        echo "   Email: admin@barbearia-vip.com\n";
        echo "   Senha: password\n\n";
        echo "🔐 BARBEIRO:\n";
        echo "   Email: carlos-silva@barbearia-vip.com\n";
        echo "   Senha: password\n\n";
        echo "═══════════════════════════════════════\n";
    }

    private function getPlanPrice($plan)
    {
        return match($plan) {
            'basic' => 99.90,
            'premium' => 199.90,
            'enterprise' => 399.90,
            default => 99.90,
        };
    }
}

