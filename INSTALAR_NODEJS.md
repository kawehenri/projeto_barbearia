# 📦 Como Instalar Node.js no macOS

## 🎯 O que você precisa:

O frontend React precisa do **Node.js** (que inclui o **npm**).

---

## 📥 Opção 1 - Instalador Oficial (RECOMENDADO)

### Passo 1: Baixar
Acesse: **https://nodejs.org/**

Escolha a versão **LTS** (Long Term Support) - Recomendado para a maioria dos usuários

### Passo 2: Instalar
1. Baixe o arquivo `.pkg`
2. Execute o instalador
3. Siga as instruções (apenas clique em "Continuar")
4. Quando terminar, **feche e reabra o terminal**

### Passo 3: Verificar
```bash
node --version
npm --version
```

Deve mostrar algo como:
```
v20.x.x
10.x.x
```

---

## 📥 Opção 2 - Via Homebrew (se você tiver)

```bash
brew install node
```

---

## ✅ Após instalar o Node.js:

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react
npm install
npm run dev
```

O frontend estará em: **http://localhost:5173**

---

## 🐛 Problemas Comuns:

### "command not found: npm" mesmo após instalar
**Solução**: Feche e reabra o terminal

### Erro de permissões
**Solução**: 
```bash
sudo chown -R $(whoami) ~/.npm
```

### Instalação lenta
**Normal!** A primeira instalação pode demorar alguns minutos (muitas dependências)

---

## 📊 Status Atual do Projeto:

✅ **Backend Laravel**: PRONTO E FUNCIONANDO  
⏳ **Node.js**: Precisa instalar  
⏳ **Frontend React**: Aguardando Node.js  

## 🔗 Links Úteis:

- Node.js: https://nodejs.org/
- Documentação: https://nodejs.org/docs/



