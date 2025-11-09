# ⚡ QUICK START - Sistema SaaS Barbearia

## 🚀 Iniciar em 3 Passos

### PASSO 1: Backend (1 comando)
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel && ./MATAR_E_INICIAR.sh
```

✅ Backend: **http://localhost:8000**

---

### PASSO 2: Resolver NPM (1 comando)
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react && ./instalar-dependencias.sh
```

**OU se falhar, use Yarn:**
```bash
npm install -g yarn && yarn install
```

---

### PASSO 3: Frontend (1 comando)
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/frontend-react && npm run dev
```

✅ Frontend: **http://localhost:5173**

---

## 🔐 Logins Rápidos

### Super Admin (Vê Tudo)
```
http://localhost:5173/login
Email: superadmin@sistema.com
Senha: password
```

### Admin Barbearia VIP
```
http://localhost:5173/login
Email: admin@barbearia-vip.com
Senha: password
```

### Barbeiro Carlos
```
http://localhost:5173/login
Email: carlos-silva@barbearia-vip.com
Senha: password
```

---

## ✅ Testar Funcionalidades

### 1. Super Admin
- ✅ Ver estatísticas globais
- ✅ Listar todas as barbearias
- ✅ Ver faturamento total
- ✅ Acessar todas as vendas
- ✅ Ver todas as comissões

**Rotas para testar:**
```bash
# Dashboard
curl http://localhost:8000/api/v1/superadmin/dashboard \
  -H "Authorization: Bearer SEU_TOKEN"

# Listar barbearias
curl http://localhost:8000/api/v1/superadmin/companies \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 2. Admin (Barbearia VIP)
- ✅ Ver estatísticas da barbearia
- ✅ Listar barbeiros
- ✅ Listar produtos
- ✅ Ver vendas
- ✅ Gerenciar comissões

**Rotas para testar:**
```bash
# Dashboard
curl http://localhost:8000/api/v1/admin/dashboard \
  -H "Authorization: Bearer SEU_TOKEN"

# Listar produtos
curl http://localhost:8000/api/v1/admin/products \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 3. Barbeiro (Carlos)
- ✅ Ver minhas comissões
- ✅ Ver minhas vendas
- ✅ Listar produtos
- ✅ Ver agendamentos

**Rotas para testar:**
```bash
# Dashboard
curl http://localhost:8000/api/v1/barber/dashboard \
  -H "Authorization: Bearer SEU_TOKEN"

# Minhas comissões
curl http://localhost:8000/api/v1/barber/commissions \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🐛 Problemas Comuns

### Backend não inicia
```bash
cd backend-laravel
./diagnostico.sh
```

### Frontend com erro de módulos
```bash
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
✅ **Solução:** Use `http://localhost:5173` (não use `127.0.0.1`)

### 401 Unauthorized
✅ **Solução:** Token expirado, faça login novamente

---

## 📊 Estrutura Multi-Tenant

```
Super Admin
    │
    ├── Barbearia VIP (R$ 199/mês)
    │   ├── Admin: admin@barbearia-vip.com
    │   ├── 3 Barbeiros
    │   ├── 4 Clientes
    │   ├── 6 Produtos
    │   └── 10 Vendas
    │
    ├── Barbershop Elite (R$ 399/mês)
    │   └── ... (mesma estrutura)
    │
    └── BarberKing (R$ 99/mês)
        └── ... (mesma estrutura)
```

---

## 🎯 Próximos Passos

Após o sistema funcionar:

1. **Adicionar Gráficos** - Recharts já configurado
2. **Implementar CRUDs** - Produtos, Barbeiros, Clientes
3. **Adicionar Notificações** - Toast já configurado
4. **Implementar Filtros** - Por data, status, etc
5. **Adicionar Exportação** - PDF, Excel

---

## 📚 Documentação

- **README_FINAL.md** - Guia completo do sistema
- **BACKEND_COMPLETO.md** - Detalhes técnicos do backend
- **RESOLVER_NPM.md** - Como resolver problema do npm
- **TRANSFORMACAO_SAAS.md** - Processo de transformação

---

## 💡 Dicas

1. **Sempre use `localhost`** (não `127.0.0.1`)
2. **Scripts úteis:**
   - `MATAR_E_INICIAR.sh` - Reinicia backend
   - `diagnostico.sh` - Resolve problemas do backend
   - `instalar-dependencias.sh` - Resolve npm
3. **Token JWT expira em 24h** - Faça login novamente
4. **Cada barbearia é isolada** - Admins só veem seus dados

---

**✅ Sistema pronto para uso!**

Qualquer dúvida, veja a documentação completa em **README_FINAL.md**

