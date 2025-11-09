# 🔧 Corrigir Node.js no macOS Catalina

## ❌ Problema Identificado:

Você tem macOS Catalina (10.15), mas instalou uma versão do Node.js para macOS mais recente.

**Erro**: `Symbol not found` / `Built for Mac OS X 13.5`

---

## ✅ Solução: Instalar Node.js LTS 16 (compatível com Catalina)

### Opção 1 - Download Direto (RECOMENDADO)

1. **Remover Node.js atual:**
```bash
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/bin/npm
sudo rm -rf /usr/local/lib/node_modules
```

2. **Baixar Node.js 16 LTS:**
- Acesse: https://nodejs.org/dist/v16.20.2/
- Baixe: **node-v16.20.2.pkg** (versão universal)
- Link direto: https://nodejs.org/dist/v16.20.2/node-v16.20.2.pkg

3. **Instalar:**
- Execute o arquivo `.pkg`
- Siga as instruções
- **Feche e reabra o terminal**

4. **Verificar:**
```bash
node --version  # Deve mostrar: v16.20.2
npm --version   # Deve mostrar: 8.x.x
```

---

### Opção 2 - Via NVM (Node Version Manager)

Se preferir gerenciar múltiplas versões:

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Fechar e reabrir terminal

# Instalar Node 16
nvm install 16
nvm use 16
nvm alias default 16
```

---

## ✅ Após corrigir:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react
npm install
npm run dev
```

---

## 🔍 Versões Compatíveis com macOS Catalina:

- ✅ **Node.js 14.x** (EOL mas funciona)
- ✅ **Node.js 16.x** (LTS - RECOMENDADO)
- ✅ **Node.js 18.x** (pode funcionar)
- ❌ **Node.js 20.x+** (requer macOS mais recente)

---

## 🐛 Se o erro persistir:

```bash
# Verificar qual Node está sendo usado
which node

# Verificar se há múltiplas instalações
ls -la /usr/local/bin/node
ls -la /opt/homebrew/bin/node

# Limpar completamente
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}
```

---

## 📞 Links Úteis:

- Node 16 LTS: https://nodejs.org/dist/v16.20.2/
- Versões antigas: https://nodejs.org/dist/
- NVM: https://github.com/nvm-sh/nvm


