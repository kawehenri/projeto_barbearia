#!/bin/bash

echo "=========================================="
echo "📦 Instalando Frontend React"
echo "=========================================="
echo ""
echo "Isso pode demorar 3-5 minutos..."
echo ""

# Limpar instalação anterior
echo "🧹 Limpando instalações anteriores..."
rm -rf node_modules package-lock.json 2>/dev/null
npm cache clean --force 2>/dev/null

echo ""
echo "📥 Baixando dependências..."
npm install

echo ""
echo "=========================================="
echo "✅ Instalação concluída!"
echo "=========================================="
echo ""
echo "🚀 Para iniciar o frontend:"
echo "   npm run dev"
echo ""
echo "📍 Frontend estará em: http://localhost:5173"
echo "=========================================="

