<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $products = Product::where('company_id', $companyId)
            ->when($request->status, function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->paginate(20);

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'supplier' => 'nullable|string',
        ]);

        $product = Product::create([
            ...$validated,
            'company_id' => $request->user()->company_id,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Produto criado com sucesso!',
            'product' => $product,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $product = Product::where('company_id', $request->user()->company_id)
            ->findOrFail($id);

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::where('company_id', $request->user()->company_id)
            ->findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'cost' => 'nullable|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'supplier' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Produto atualizado com sucesso!',
            'product' => $product,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $product = Product::where('company_id', $request->user()->company_id)
            ->findOrFail($id);
        
        $product->delete();

        return response()->json([
            'message' => 'Produto removido com sucesso!',
        ]);
    }

    public function lowStock(Request $request)
    {
        $companyId = $request->user()->company_id;

        $products = Product::where('company_id', $companyId)
            ->lowStock()
            ->get();

        return response()->json($products);
    }
}

