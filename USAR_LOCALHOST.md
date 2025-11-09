# 🌐 Use LOCALHOST, não 127.0.0.1!

## ⚠️ Problema:

Você está acessando: `http://127.0.0.1:5173`  
Isso causa erro de CORS!

## ✅ Solução:

Use: `http://localhost:5173`

---

## 🔄 Como Corrigir:

### 1. Feche a aba do navegador atual

### 2. Abra uma nova aba e digite:
```
http://localhost:5173/login
```

### 3. OU configure o Vite:

Edite `frontend-react/vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost', // Força localhost
    strictPort: true
  }
})
```

---

## 📝 Por que isso acontece?

- `localhost` e `127.0.0.1` são TECNICAMENTE o mesmo
- MAS para o navegador, são **origens diferentes**
- O CORS trata eles como domínios separados
- Por isso precisa configurar ambos OU usar sempre localhost

---

## ✅ Checklist Final:

- [ ] Backend reiniciado com `./reiniciar.sh`
- [ ] Acessando via `http://localhost:5173/login`
- [ ] Não via `http://127.0.0.1:5173`
- [ ] Credenciais: admin@barbearia.com / password

---

## 💡 Dica:

Sempre use **localhost** em todos os lugares:
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
- API: `http://localhost:8000/api`

Evite usar 127.0.0.1 para prevenir problemas de CORS!

---

## 🎯 Teste Agora:

1. **Reinicie backend**: `./reiniciar.sh`
2. **Acesse**: `http://localhost:5173/login`
3. **Login**: admin@barbearia.com / password
4. **Funciona!** ✅

---

**IMPORTANTE**: O middleware CORS foi atualizado para aceitar qualquer origem, mas ainda precisa reiniciar o backend!

