# Sistema de Barbearia Full Stack

Sistema completo para gerenciamento de barbearia com painel administrativo, área do cliente e portal público.

## 🛠️ Tecnologias

- **Backend**: PHP Laravel 11+ com API RESTful
- **Frontend**: React 18+ com Vite
- **Banco de Dados**: MySQL (via XAMPP)
- **Autenticação**: Laravel Sanctum

## 📋 Pré-requisitos

- PHP 8.2+
- Composer
- Node.js 20+
- XAMPP (MySQL e phpMyAdmin)
- MySQL configurado

## 🚀 Instalação

### 1. Configurar Banco de Dados

1. Inicie o XAMPP e certifique-se de que o MySQL está rodando
2. Acesse o phpMyAdmin: http://localhost/phpmyadmin
3. Crie um novo banco de dados chamado `barbearia_db`

### 2. Backend (Laravel)

```bash
cd backend-laravel

# Instalar dependências (se tiver Composer instalado)
composer install

# Ou se não tiver Composer, você precisará instalá-lo primeiro
# No macOS: brew install composer
# No Windows: Baixe de https://getcomposer.org/

# Configurar .env (já está criado, mas verifique as credenciais do banco)
# DB_DATABASE=barbearia_db
# DB_USERNAME=root
# DB_PASSWORD= (deixe vazio se não tiver senha)

# Gerar chave da aplicação
php artisan key:generate

# Executar migrations
php artisan migrate

# Popular banco com dados de exemplo
php artisan db:seed

# Iniciar servidor
php artisan serve
```

O backend estará disponível em: http://localhost:8000

### 3. Frontend (React)

```bash
cd frontend-react

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: http://localhost:5173

### 4. Configurar CORS (se necessário)

Se houver problemas de CORS, verifique o arquivo `backend-laravel/config/cors.php` e ajuste as origens permitidas.

## 📁 Estrutura do Projeto

```
/projeto_barbearia
├── backend-laravel/     # API Laravel
├── frontend-react/      # Aplicação React
└── README.md
```

## 🔐 Credenciais Padrão

Após executar os seeders, você terá:
- **Admin**: admin@barbearia.com / password
- **Cliente**: cliente@teste.com / password
- **Barbeiro**: barbeiro@teste.com / password

## 📝 Funcionalidades

- ✅ Autenticação JWT (Sanctum)
- ✅ CRUD de Agendamentos
- ✅ CRUD de Serviços
- ✅ CRUD de Barbeiros
- ✅ Dashboard Administrativo
- ✅ Dashboard do Cliente
- ✅ Sistema de Pagamentos
- ✅ Notificações

## 🔗 URLs

- **Backend API**: http://localhost:8000/api
- **Frontend**: http://localhost:5173
- **phpMyAdmin**: http://localhost/phpmyadmin

## 📚 Estrutura da API

### Endpoints Principais

#### Autenticação
- `POST /api/register` - Registrar novo usuário
- `POST /api/login` - Fazer login
- `POST /api/logout` - Fazer logout (requer autenticação)
- `GET /api/user` - Obter dados do usuário autenticado

#### Agendamentos
- `GET /api/appointments` - Listar agendamentos
- `POST /api/appointments` - Criar agendamento
- `GET /api/appointments/{id}` - Obter agendamento específico
- `PUT /api/appointments/{id}` - Atualizar agendamento
- `DELETE /api/appointments/{id}` - Excluir agendamento

#### Serviços
- `GET /api/services` - Listar serviços
- `POST /api/services` - Criar serviço (admin)
- `GET /api/services/{id}` - Obter serviço específico
- `PUT /api/services/{id}` - Atualizar serviço (admin)
- `DELETE /api/services/{id}` - Excluir serviço (admin)

#### Barbeiros
- `GET /api/barbers` - Listar barbeiros
- `GET /api/barbers/{id}/available-slots` - Horários disponíveis

#### Dashboard
- `GET /api/dashboard/admin` - Dashboard administrativo
- `GET /api/dashboard/client` - Dashboard do cliente

## 🎯 Próximos Passos

1. **Integração com Pagamento**: Adicionar integração com Mercado Pago ou PIX
2. **Notificações**: Implementar sistema de notificações em tempo real
3. **Calendário**: Adicionar visualização de calendário para agendamentos
4. **Relatórios**: Criar relatórios detalhados de faturamento
5. **Avaliações**: Sistema de avaliação de barbeiros e serviços

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o MySQL está rodando no XAMPP
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco `barbearia_db` foi criado

### Erro de CORS
- Verifique se o frontend está rodando na porta 5173
- Confirme as configurações em `config/cors.php`

### Erro de autenticação
- Verifique se o token está sendo enviado no header Authorization
- Confirme se o Laravel Sanctum está configurado corretamente

