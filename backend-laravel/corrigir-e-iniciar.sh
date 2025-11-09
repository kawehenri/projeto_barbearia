#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║   LIMPANDO E INICIANDO BACKEND         ║"
echo "╚════════════════════════════════════════╝"
echo ""

cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel

echo "🧹 Limpando cache..."
/Applications/XAMPP/xamppfiles/bin/php artisan config:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan cache:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan route:clear 2>/dev/null
/Applications/XAMPP/xamppfiles/bin/php artisan view:clear 2>/dev/null

echo "✅ Cache limpo!"
echo ""
echo "╔════════════════════════════════════════╗"
echo "║   🚀 INICIANDO SERVIDOR                ║"
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

