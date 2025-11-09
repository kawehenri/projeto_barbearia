# Guia de Instalação Detalhado

## Passo a Passo Completo

### 1. Preparar Ambiente

#### Instalar XAMPP
1. Baixe o XAMPP: https://www.apachefriends.org/
2. Instale e inicie o Apache e MySQL
3. Acesse http://localhost/phpmyadmin

#### Instalar Composer (se necessário)
- **macOS**: `brew install composer`
- **Windows**: Baixe de https://getcomposer.org/download/
- **Linux**: `sudo apt install composer`

#### Instalar Node.js
- Baixe de https://nodejs.org/ (versão 20 ou superior)

### 2. Configurar Banco de Dados

1. Abra o phpMyAdmin: http://localhost/phpmyadmin
2. Clique em "Novo" para criar um banco de dados
3. Nome: `barbearia_db`
4. Collation: `utf8mb4_unicode_ci`
5. Clique em "Criar"

### 3. Configurar Backend Laravel

```bash
# Navegar para o diretório do backend
cd backend-laravel

# Instalar dependências PHP
composer install

# Se não tiver o arquivo .env, copie o exemplo
# (O arquivo .env já foi criado, mas verifique as configurações)

# Editar .env e configurar:
# DB_DATABASE=barbearia_db
# DB_USERNAME=root
# DB_PASSWORD= (deixe vazio se não tiver senha)

# Gerar chave da aplicação
php artisan key:generate

# Executar migrations (criar tabelas)
php artisan migrate

# Popular banco com dados de exemplo
php artisan db:seed

# Iniciar servidor
php artisan serve
```

O backend estará rodando em: **http://localhost:8000**

### 4. Configurar Frontend React

```bash
# Navegar para o diretório do frontend
cd frontend-react

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: **http://localhost:5173**

### 5. Testar o Sistema

1. Acesse http://localhost:5173
2. Clique em "Cadastrar" ou use as credenciais:
   - **Admin**: admin@barbearia.com / password
   - **Cliente**: cliente@teste.com / password
   - **Barbeiro**: barbeiro@teste.com / password

## Estrutura de Arquivos Criados

### Backend
- ✅ Migrations (7 tabelas)
- ✅ Models com relacionamentos
- ✅ Controllers da API
- ✅ Rotas da API
- ✅ Middleware de autenticação
- ✅ Seeders com dados de exemplo

### Frontend
- ✅ Páginas principais (Home, Login, Register, Dashboards)
- ✅ Componentes reutilizáveis
- ✅ Integração com API via Axios
- ✅ Sistema de autenticação
- ✅ Rotas protegidas

## Comandos Úteis

### Backend
```bash
# Limpar cache
php artisan cache:clear
php artisan config:clear

# Recriar banco de dados
php artisan migrate:fresh --seed

# Criar novo controller
php artisan make:controller Api/NomeController

# Criar nova migration
php artisan make:migration create_nome_table
```

### Frontend
```bash
# Build para produção
npm run build

# Preview build de produção
npm run preview
```

## Problemas Comuns

### "Class not found" no Laravel
```bash
composer dump-autoload
```

### Erro de permissões
```bash
# No Linux/Mac
chmod -R 775 storage bootstrap/cache
```

### Porta já em uso
```bash
# Backend - usar porta diferente
php artisan serve --port=8001

# Frontend - editar vite.config.js
server: { port: 5174 }
```

