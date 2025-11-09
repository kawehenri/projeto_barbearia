#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║                                        ║"
echo "║  🔧 RESOLVER NPM - BarberShop SaaS    ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Ir para o diretório do frontend
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react

echo "🗑️  Removendo cache do npm..."
rm -rf ~/.npm ~/.npm-cache

echo "🗑️  Removendo node_modules e package-lock.json..."
rm -rf node_modules package-lock.json

echo "🧹 Limpando cache do npm..."
npm cache clean --force

echo "✅ Verificando cache do npm..."
npm cache verify

echo ""
echo "📦 Instalando dependências..."
echo "   (Isso pode levar alguns minutos)"
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║                                        ║"
    echo "║  ✅ INSTALAÇÃO CONCLUÍDA!             ║"
    echo "║                                        ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "📊 Dependências instaladas:"
    echo ""
    ls -1 node_modules | wc -l | xargs echo "   Total de pacotes:"
    echo ""
    echo "🚀 Para iniciar o frontend:"
    echo "   cd frontend-react"
    echo "   npm run dev"
    echo ""
    echo "🌐 Acesse: http://localhost:5173"
    echo ""
else
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║                                        ║"
    echo "║  ❌ ERRO NA INSTALAÇÃO                ║"
    echo "║                                        ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "💡 SOLUÇÃO ALTERNATIVA - Usar Yarn:"
    echo ""
    echo "1. Instalar Yarn:"
    echo "   npm install -g yarn"
    echo ""
    echo "2. Instalar dependências:"
    echo "   yarn install"
    echo ""
    echo "3. Iniciar o frontend:"
    echo "   yarn dev"
    echo ""
    echo "📚 Veja mais soluções em: RESOLVER_NPM.md"
    echo ""
fi

