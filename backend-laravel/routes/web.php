<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'API Sistema de Barbearia',
        'version' => '1.0.0',
    ]);
});

Route::get('/login', function () {
    return response()->json([
        'message' => 'Use a API em /api/login',
    ]);
})->name('login');

