<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        if (!$user || (!$user->isAdmin() && !$user->isSuperAdmin())) {
            return response()->json([
                'message' => 'Acesso negado. Apenas Administradores podem acessar este recurso.'
            ], 403);
        }

        return $next($request);
    }
}

