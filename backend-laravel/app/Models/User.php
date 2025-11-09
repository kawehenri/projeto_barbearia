<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'company_id',
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Mutator para fazer hash da senha automaticamente (apenas se não estiver hasheada)
    public function setPasswordAttribute($value)
    {
        // Apenas hashear se não começar com $2y$ (padrão bcrypt)
        if (!str_starts_with($value, '$2y$')) {
            $this->attributes['password'] = bcrypt($value);
        } else {
            $this->attributes['password'] = $value;
        }
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function barber()
    {
        return $this->hasOne(Barber::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // Novos relacionamentos SaaS
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class, 'barber_id');
    }

    public function purchases()
    {
        return $this->hasMany(Sale::class, 'client_id');
    }

    public function commissions()
    {
        return $this->hasMany(Commission::class, 'barber_id');
    }

    // Métodos de permissão
    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isBarber()
    {
        return $this->role === 'barbeiro';
    }

    public function isCliente()
    {
        return $this->role === 'cliente';
    }

    // Scopes
    public function scopeOfCompany($query, $companyId)
    {
        return $query->where('company_id', $companyId);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeBarbers($query)
    {
        return $query->where('role', 'barbeiro');
    }

    public function scopeClients($query)
    {
        return $query->where('role', 'cliente');
    }
}

