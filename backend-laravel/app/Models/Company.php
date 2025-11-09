<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'address',
        'logo',
        'business_hours',
        'status',
        'subscription_plan',
        'subscription_expires_at',
    ];

    protected $casts = [
        'business_hours' => 'array',
        'subscription_expires_at' => 'datetime',
    ];

    // Relacionamentos
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function admins()
    {
        return $this->users()->where('role', 'admin');
    }

    public function barbers()
    {
        return $this->users()->where('role', 'barbeiro');
    }

    public function clients()
    {
        return $this->users()->where('role', 'cliente');
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function commissions()
    {
        return $this->hasMany(Commission::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeSuspended($query)
    {
        return $query->where('status', 'suspended');
    }

    // Helpers
    public function isActive()
    {
        return $this->status === 'active';
    }

    public function isSubscriptionValid()
    {
        return $this->subscription_expires_at && $this->subscription_expires_at->isFuture();
    }
}

