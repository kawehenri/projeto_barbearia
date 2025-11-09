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
        'name',
        'email',
        'password',
        'role',
        'phone',
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
}

