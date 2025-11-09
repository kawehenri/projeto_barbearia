# 🔄 Como Reiniciar o Backend

## ⚠️ IMPORTANTE - Leia com Atenção!

O backend **PRECISA** ser reiniciado após mudanças na configuração de CORS.

---

## 📋 Passo a Passo:

### 1️⃣ Parar o Servidor Atual

No terminal onde o backend está rodando, pressione:
```
CTRL + C
```

Você verá algo como:
```
^C
kawehenrique@MacBook-Air-de-Kawe backend-laravel %
```

---

### 2️⃣ Reiniciar o Servidor

Execute um destes comandos:

**Opção A - Script Automático (Recomendado):**
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel
./reiniciar.sh
```

**Opção B - Manualmente:**
```bash
cd /Applications/XAMPP/xamppfiles/htdocs/www/projeto_barbearia/backend-laravel
/Applications/XAMPP/xamppfiles/bin/php artisan config:clear
/Applications/XAMPP/xamppfiles/bin/php artisan cache:clear
/Applications/XAMPP/xamppfiles/bin/php artisan serve
```

---

### 3️⃣ Aguardar Inicialização

Você verá:
```
Starting Laravel development server: http://127.0.0.1:8000
```

Aguarde até aparecer essa mensagem. Agora está pronto!

---

### 4️⃣ Testar o Login

1. **Acesse**: http://localhost:5173/login
   - ⚠️ Use **localhost**, não 127.0.0.1
   
2. **Credenciais**:
   - Email: `admin@barbearia.com`
   - Senha: `password`

3. **Clique em "Entrar"**

4. **Deve funcionar agora!** ✅

---

## 🔍 Como Saber se o Backend Está Rodando?

### Teste rápido:
```bash
curl http://localhost:8000/api/services
```

Se retornar JSON com serviços = está funcionando! ✅

---

## ❓ Se o erro continuar:

### Verifique o Console do Navegador

1. Pressione **F12** no navegador
2. Vá na aba **Console**
3. Veja se há erros diferentes

### Use localhost ao invés de 127.0.0.1

- ❌ Não use: http://127.0.0.1:5173/login
- ✅ Use: http://localhost:5173/login

### Limpe o Cache do Navegador

- Chrome/Edge: CTRL + SHIFT + R
- Firefox: CTRL + F5
- Safari: CMD + SHIFT + R

---

## ✅ Checklist:

- [ ] Backend foi parado (CTRL+C)
- [ ] Backend foi reiniciado (./reiniciar.sh)
- [ ] Servidor mostrou "Starting Laravel development server"
- [ ] Acessou http://localhost:5173/login (não 127.0.0.1)
- [ ] Usou credenciais corretas
- [ ] Testou o login

---

## 💡 Dica Pro:

Para não precisar reiniciar sempre, mantenha sempre os dois servidores rodando:

**Terminal 1 - Backend:**
```bash
cd backend-laravel
./start-server.sh
```

**Terminal 2 - Frontend:**
```bash
cd frontend-react
npm run dev
```

---

## 🆘 Se Nada Funcionar:

1. Verifique se o MySQL está rodando no XAMPP
2. Teste a API diretamente:
   ```bash
   curl http://localhost:8000/api/services
   ```
3. Veja os logs do Laravel em `storage/logs/laravel.log`

---

**Após reiniciar, o login DEVE funcionar!** 🚀

