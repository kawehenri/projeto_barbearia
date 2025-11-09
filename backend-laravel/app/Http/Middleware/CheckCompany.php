<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckCompany
{
    /**
     * Middleware para garantir que usuários acessem apenas dados de sua company
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        // Super Admin pode acessar tudo
        if ($user && $user->isSuperAdmin()) {
            return $next($request);
        }

        // Usuários devem ter company_id
        if (!$user || !$user->company_id) {
            return response()->json([
                'message' => 'Acesso negado. Usuário não está vinculado a nenhuma barbearia.'
            ], 403);
        }

        // Verificar se a company está ativa
        if ($user->company && !$user->company->isActive()) {
            return response()->json([
                'message' => 'Acesso negado. Sua barbearia está suspensa. Entre em contato com o suporte.'
            ], 403);
        }

        // Verificar se a assinatura está válida
        if ($user->company && !$user->company->isSubscriptionValid()) {
            return response()->json([
                'message' => 'Assinatura expirada. Renove sua assinatura para continuar usando o sistema.'
            ], 402); // 402 Payment Required
        }

        return $next($request);
    }
}

