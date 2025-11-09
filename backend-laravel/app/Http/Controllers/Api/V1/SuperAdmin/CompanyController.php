<?php

namespace App\Http\Controllers\Api\V1\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::with(['admins', 'subscriptions'])
            ->withCount(['users', 'appointments', 'sales'])
            ->paginate(20);

        return response()->json($companies);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'subscription_plan' => 'required|in:basic,premium,enterprise',
            // Dados do admin
            'admin_name' => 'required|string',
            'admin_email' => 'required|email|unique:users,email',
            'admin_password' => 'required|min:8',
        ]);

        // Criar company
        $company = Company::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'status' => 'active',
            'subscription_plan' => $validated['subscription_plan'],
            'subscription_expires_at' => now()->addMonth(),
        ]);

        // Criar admin da barbearia
        $admin = User::create([
            'company_id' => $company->id,
            'name' => $validated['admin_name'],
            'email' => $validated['admin_email'],
            'password' => $validated['admin_password'], // Mutator vai hashear
            'role' => 'admin',
            'status' => 'active',
        ]);

        // Criar primeira assinatura
        Subscription::create([
            'company_id' => $company->id,
            'plan' => $validated['subscription_plan'],
            'amount' => $this->getPlanPrice($validated['subscription_plan']),
            'status' => 'active',
            'starts_at' => now(),
            'expires_at' => now()->addMonth(),
        ]);

        return response()->json([
            'message' => 'Barbearia criada com sucesso!',
            'company' => $company->load('admins'),
        ], 201);
    }

    public function show($id)
    {
        $company = Company::with(['users', 'services', 'products', 'appointments', 'sales', 'commissions', 'subscriptions'])
            ->withCount(['users', 'barbers', 'clients', 'appointments', 'sales'])
            ->findOrFail($id);

        return response()->json($company);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:companies,email,' . $id,
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'subscription_plan' => 'sometimes|in:basic,premium,enterprise',
            'status' => 'sometimes|in:active,suspended,inactive',
        ]);

        $company->update($validated);

        return response()->json([
            'message' => 'Barbearia atualizada com sucesso!',
            'company' => $company,
        ]);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();

        return response()->json([
            'message' => 'Barbearia removida com sucesso!',
        ]);
    }

    public function activate($id)
    {
        $company = Company::findOrFail($id);
        $company->update(['status' => 'active']);

        return response()->json([
            'message' => 'Barbearia ativada com sucesso!',
            'company' => $company,
        ]);
    }

    public function suspend($id)
    {
        $company = Company::findOrFail($id);
        $company->update(['status' => 'suspended']);

        return response()->json([
            'message' => 'Barbearia suspensa com sucesso!',
            'company' => $company,
        ]);
    }

    private function getPlanPrice($plan)
    {
        $prices = [
            'basic' => 99.90,
            'premium' => 199.90,
            'enterprise' => 399.90,
        ];

        return $prices[$plan] ?? 99.90;
    }
}

