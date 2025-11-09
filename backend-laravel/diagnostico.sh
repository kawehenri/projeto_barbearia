#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║     DIAGNÓSTICO DO BACKEND             ║"
echo "╚════════════════════════════════════════╝"
echo ""

cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel

echo "1. Verificando PHP..."
/Applications/XAMPP/xamppfiles/bin/php -v | head -1

echo ""
echo "2. Testando sintaxe dos arquivos..."
/Applications/XAMPP/xamppfiles/bin/php -l app/Http/Middleware/Cors.php

echo ""
echo "3. Limpando cache..."
/Applications/XAMPP/xamppfiles/bin/php artisan config:clear 2>&1
/Applications/XAMPP/xamppfiles/bin/php artisan cache:clear 2>&1
/Applications/XAMPP/xamppfiles/bin/php artisan route:clear 2>&1

echo ""
echo "4. Testando conexão com banco..."
/Applications/XAMPP/xamppfiles/bin/mysql -u root -e "SELECT 'OK' as status;" 2>&1 | grep OK

echo ""
echo "╔════════════════════════════════════════╗"
echo "║     DIAGNÓSTICO COMPLETO               ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Agora inicie o servidor:"
echo "./start-server.sh"

