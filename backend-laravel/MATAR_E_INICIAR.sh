#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║   🔪 MATANDO SERVIDOR ANTIGO          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Matar qualquer processo do artisan serve na porta 8000
echo "Procurando processos na porta 8000..."
lsof -ti:8000 | xargs kill -9 2>/dev/null
sleep 2

echo "✅ Processos antigos mortos!"
echo ""

cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel

echo "╔════════════════════════════════════════╗"
echo "║   🧹 LIMPANDO CACHE                    ║"
echo "╚════════════════════════════════════════╝"
echo ""

/Applications/XAMPP/xamppfiles/bin/php artisan config:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan cache:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan route:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan view:clear 2>/dev/null

echo "✅ Cache limpo!"
echo ""

echo "╔════════════════════════════════════════╗"
echo "║   🚀 INICIANDO SERVIDOR NOVO           ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📍 Backend: http://localhost:8000"
echo "📍 API: http://localhost:8000/api"
echo ""
echo "🔐 Credenciais:"
echo "   admin@barbearia.com / password"
echo ""
echo "⏹️  Pressione CTRL+C para parar"
echo ""
echo "════════════════════════════════════════"
echo ""

/Applications/XAMPP/xamppfiles/bin/php artisan serve

