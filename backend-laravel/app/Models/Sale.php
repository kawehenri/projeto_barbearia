<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'barber_id',
        'client_id',
        'product_id',
        'quantity',
        'unit_price',
        'total',
        'commission_rate',
        'commission_amount',
        'payment_method',
        'notes',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        // Calcular totais automaticamente
        static::creating(function ($sale) {
            $sale->total = $sale->quantity * $sale->unit_price;
            $sale->commission_amount = ($sale->total * $sale->commission_rate) / 100;
        });

        // Criar comissão após venda
        static::created(function ($sale) {
            Commission::create([
                'company_id' => $sale->company_id,
                'barber_id' => $sale->barber_id,
                'sale_id' => $sale->id,
                'type' => 'product',
                'amount' => $sale->commission_amount,
                'rate' => $sale->commission_rate,
                'status' => 'pending',
            ]);
        });
    }

    // Relacionamentos
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function barber()
    {
        return $this->belongsTo(User::class, 'barber_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function commission()
    {
        return $this->hasOne(Commission::class);
    }
}

