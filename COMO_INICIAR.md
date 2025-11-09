# 🚀 Como Iniciar o Servidor

## ⚠️ IMPORTANTE: Use o PHP do XAMPP!

O macOS tem PHP 7.3 instalado, mas o projeto precisa do PHP 8.0+ do XAMPP.

## 📝 Opções para iniciar:

### Opção 1 - Script automático (RECOMENDADO):
```bash
cd backend-laravel
./start-server.sh
```

### Opção 2 - Comando completo:
```bash
cd backend-laravel
/Applications/XAMPP/xamppfiles/bin/php artisan serve
```

### Opção 3 - Criar alias permanente (uma vez):
```bash
# Adicionar ao seu .zshrc
echo 'alias php="/Applications/XAMPP/xamppfiles/bin/php"' >> ~/.zshrc
source ~/.zshrc

# Depois pode usar normalmente:
cd backend-laravel
php artisan serve
```

## ✅ O servidor está rodando quando aparecer:

```
Starting Laravel development server: http://127.0.0.1:8000
```

Então acesse: **http://localhost:8000**

## 🔐 Teste o login:

Acesse: http://localhost:8000/api/login

Com:
```json
{
  "email": "admin@barbearia.com",
  "password": "password"
}
```

## 🐛 Erros comuns:

### Erro: "PHP version 7.3.29"
**Causa**: Usando PHP do sistema ao invés do XAMPP  
**Solução**: Use `/Applications/XAMPP/xamppfiles/bin/php` ou crie o alias

### Erro: "port already in use"
**Causa**: Porta 8000 ocupada  
**Solução**: Use outra porta:
```bash
/Applications/XAMPP/xamppfiles/bin/php artisan serve --port=8001
```

## 📍 URLs do Sistema:

- Backend: http://localhost:8000
- API: http://localhost:8000/api
- Frontend (após npm install): http://localhost:5173
- phpMyAdmin: http://localhost/phpmyadmin



