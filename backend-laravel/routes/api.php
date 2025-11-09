<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BarberController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/services', [ServiceController::class, 'index']); // Lista de serviços pública

// Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Autenticação
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->middleware('role:admin');
    Route::get('/dashboard/client', [DashboardController::class, 'client']);

    // Recursos
    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('barbers', BarberController::class);
    Route::apiResource('payments', PaymentController::class);

    // Rotas adicionais
    Route::get('/barbers/{id}/available-slots', [BarberController::class, 'availableSlots']);
});

