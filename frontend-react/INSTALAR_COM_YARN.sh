#!/bin/bash

echo "╔════════════════════════════════════════╗"
echo "║                                        ║"
echo "║  📦 INSTALAR COM YARN (Alternativa)   ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Verificar se Yarn está instalado
if ! command -v yarn &> /dev/null; then
    echo "⚠️  Yarn não está instalado."
    echo ""
    echo "Opção 1 - Com sudo (recomendado):"
    echo "   sudo npm install -g yarn"
    echo ""
    echo "Opção 2 - Sem sudo (local):"
    echo "   npm install --prefix ~/.local -g yarn"
    echo "   export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
    echo "Depois execute este script novamente."
    echo ""
    exit 1
fi

echo "✅ Yarn instalado: $(yarn --version)"
echo ""

# Ir para o diretório
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react

echo "🗑️  Removendo node_modules..."
rm -rf node_modules yarn.lock

echo "📦 Instalando dependências com Yarn..."
echo "   (Isso pode levar alguns minutos)"
echo ""

yarn install

if [ $? -eq 0 ]; then
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║                                        ║"
    echo "║  ✅ INSTALAÇÃO CONCLUÍDA COM YARN!    ║"
    echo "║                                        ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "📊 Dependências instaladas:"
    ls -1 node_modules | wc -l | xargs echo "   Total de pacotes:"
    echo ""
    echo "🚀 Para iniciar o frontend:"
    echo "   yarn dev"
    echo ""
    echo "🌐 Acesse: http://localhost:5173"
    echo ""
    echo "🔐 Login:"
    echo "   Super Admin: superadmin@sistema.com"
    echo "   Admin VIP:   admin@barbearia-vip.com"
    echo "   Barbeiro:    carlos-silva@barbearia-vip.com"
    echo "   Senha:       password"
    echo ""
else
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║                                        ║"
    echo "║  ❌ ERRO NA INSTALAÇÃO COM YARN       ║"
    echo "║                                        ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "Tente reinstalar o Node.js:"
    echo "https://nodejs.org/dist/v16.20.2/node-v16.20.2.pkg"
    echo ""
fi

