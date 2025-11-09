<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class BarberMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        if (!$user || (!$user->isBarber() && !$user->isAdmin() && !$user->isSuperAdmin())) {
            return response()->json([
                'message' => 'Acesso negado. Apenas Barbeiros podem acessar este recurso.'
            ], 403);
        }

        return $next($request);
    }
}

