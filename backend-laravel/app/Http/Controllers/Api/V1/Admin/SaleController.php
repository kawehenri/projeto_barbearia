<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $sales = Sale::where('company_id', $companyId)
            ->with(['barber', 'client', 'product'])
            ->latest()
            ->paginate(20);

        return response()->json($sales);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'barber_id' => 'required|exists:users,id',
            'client_id' => 'nullable|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'commission_rate' => 'nullable|numeric|min:0|max:100',
            'payment_method' => 'required|in:cash,credit,debit,pix',
            'notes' => 'nullable|string',
        ]);

        // Verificar estoque
        $product = Product::find($validated['product_id']);
        if ($product->stock < $validated['quantity']) {
            return response()->json([
                'message' => 'Estoque insuficiente!',
            ], 400);
        }

        // Criar venda (comissão calculada automaticamente no Model)
        $sale = Sale::create([
            ...$validated,
            'company_id' => $request->user()->company_id,
            'unit_price' => $product->price,
            'commission_rate' => $validated['commission_rate'] ?? 10.00,
        ]);

        // Atualizar estoque
        $product->decrement('stock', $validated['quantity']);

        return response()->json([
            'message' => 'Venda registrada com sucesso!',
            'sale' => $sale->load(['barber', 'client', 'product']),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $sale = Sale::where('company_id', $request->user()->company_id)
            ->with(['barber', 'client', 'product', 'commission'])
            ->findOrFail($id);

        return response()->json($sale);
    }

    public function byBarber(Request $request, $barberId)
    {
        $sales = Sale::where('company_id', $request->user()->company_id)
            ->where('barber_id', $barberId)
            ->with(['client', 'product'])
            ->latest()
            ->paginate(20);

        return response()->json($sales);
    }

    public function allSales(Request $request)
    {
        // Somente para Super Admin (ver todas as vendas do sistema)
        $sales = Sale::with(['company', 'barber', 'client', 'product'])
            ->latest()
            ->paginate(50);

        return response()->json($sales);
    }
}

