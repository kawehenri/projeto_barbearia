#!/bin/bash

echo "=========================================="
echo "🔄 Reiniciando Servidor Laravel..."
echo "=========================================="
echo ""

# Limpar cache de configuração
echo "Limpando cache..."
/Applications/XAMPP/xamppfiles/bin/php artisan config:clear
/Applications/XAMPP/xamppfiles/bin/php artisan cache:clear

echo ""
echo "✅ Cache limpo!"
echo ""
echo "=========================================="
echo "🚀 Iniciando servidor..."
echo "=========================================="
echo ""
echo "📍 Backend rodando em: http://localhost:8000"
echo "📍 API disponível em: http://localhost:8000/api"
echo ""
echo "🔐 Credenciais de teste:"
echo "   Admin: admin@barbearia.com / password"
echo "   Cliente: cliente@teste.com / password"
echo ""
echo "⏹️  Pressione CTRL+C para parar o servidor"
echo "=========================================="
echo ""

/Applications/XAMPP/xamppfiles/bin/php artisan serve

