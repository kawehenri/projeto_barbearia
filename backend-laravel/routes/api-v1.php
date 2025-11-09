<?php

use App\Http\Controllers\Api\V1\SuperAdmin\CompanyController;
use App\Http\Controllers\Api\V1\SuperAdmin\DashboardController as SuperAdminDashboard;
use App\Http\Controllers\Api\V1\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Api\V1\Admin\ProductController;
use App\Http\Controllers\Api\V1\Admin\SaleController;
use App\Http\Controllers\Api\V1\Admin\CommissionController;
use App\Http\Controllers\Api\V1\Barber\DashboardController as BarberDashboard;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API V1 Routes - Sistema SaaS de Barbearias
|--------------------------------------------------------------------------
*/

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas autenticadas
Route::middleware('auth:sanctum')->group(function () {
    
    // Rotas gerais
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // ============================================
    // SUPER ADMIN - Gestão Global
    // ============================================
    Route::prefix('superadmin')->middleware('superadmin')->group(function () {
        Route::get('/dashboard', [SuperAdminDashboard::class, 'index']);
        Route::get('/stats', [SuperAdminDashboard::class, 'stats']);
        
        // Gestão de Companies (Barbearias)
        Route::apiResource('companies', CompanyController::class);
        Route::post('companies/{id}/activate', [CompanyController::class, 'activate']);
        Route::post('companies/{id}/suspend', [CompanyController::class, 'suspend']);
        
        // Visualizar todas as vendas e comissões do sistema
        Route::get('/sales', [SaleController::class, 'allSales']);
        Route::get('/commissions', [CommissionController::class, 'allCommissions']);
        Route::get('/revenue', [SuperAdminDashboard::class, 'revenue']);
    });
    
    // ============================================
    // ADMIN - Gestão da Barbearia
    // ============================================
    Route::prefix('admin')->middleware(['admin', 'check.company'])->group(function () {
        Route::get('/dashboard', [AdminDashboard::class, 'index']);
        Route::get('/stats', [AdminDashboard::class, 'stats']);
        Route::get('/revenue', [AdminDashboard::class, 'revenue']);
        
        // Gestão de Produtos
        Route::apiResource('products', ProductController::class);
        Route::get('products/low-stock', [ProductController::class, 'lowStock']);
        
        // Gestão de Vendas
        Route::apiResource('sales', SaleController::class);
        Route::get('sales/by-barber/{barberId}', [SaleController::class, 'byBarber']);
        
        // Gestão de Comissões
        Route::get('commissions', [CommissionController::class, 'index']);
        Route::get('commissions/pending', [CommissionController::class, 'pending']);
        Route::post('commissions/{id}/pay', [CommissionController::class, 'markAsPaid']);
        Route::get('commissions/by-barber/{barberId}', [CommissionController::class, 'byBarber']);
        
        // Gestão de Barbeiros
        Route::get('barbers', [AdminDashboard::class, 'barbers']);
        Route::get('barbers/{id}/performance', [AdminDashboard::class, 'barberPerformance']);
        
        // Gestão de Clientes
        Route::get('clients', [AdminDashboard::class, 'clients']);
        
        // Configurações da Barbearia
        Route::get('company', [AdminDashboard::class, 'companySettings']);
        Route::put('company', [AdminDashboard::class, 'updateCompany']);
    });
    
    // ============================================
    // BARBEIRO - Área do Barbeiro
    // ============================================
    Route::prefix('barber')->middleware(['barber', 'check.company'])->group(function () {
        Route::get('/dashboard', [BarberDashboard::class, 'index']);
        Route::get('/stats', [BarberDashboard::class, 'stats']);
        
        // Minhas Vendas
        Route::get('sales', [BarberDashboard::class, 'mySales']);
        Route::post('sales', [SaleController::class, 'store']); // Registrar venda
        
        // Minhas Comissões
        Route::get('commissions', [BarberDashboard::class, 'myCommissions']);
        Route::get('commissions/pending', [BarberDashboard::class, 'pendingCommissions']);
        Route::get('commissions/paid', [BarberDashboard::class, 'paidCommissions']);
        
        // Meus Agendamentos
        Route::get('appointments', [BarberDashboard::class, 'myAppointments']);
        Route::post('appointments/{id}/complete', [BarberDashboard::class, 'completeAppointment']);
        
        // Produtos disponíveis
        Route::get('products', [BarberDashboard::class, 'products']);
    });
});

