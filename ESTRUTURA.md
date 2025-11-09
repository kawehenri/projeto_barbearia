# Estrutura do Projeto - Sistema de Barbearia

## 📂 Backend Laravel

```
backend-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php       # Login, Register, Logout
│   │   │       ├── AppointmentController.php # CRUD Agendamentos
│   │   │       ├── ServiceController.php     # CRUD Serviços
│   │   │       ├── BarberController.php     # CRUD Barbeiros
│   │   │       ├── PaymentController.php     # CRUD Pagamentos
│   │   │       └── DashboardController.php  # Dashboards Admin/Cliente
│   │   └── Middleware/
│   │       └── RoleMiddleware.php            # Middleware de permissões
│   └── Models/
│       ├── User.php                          # Usuários (clientes, barbeiros, admin)
│       ├── Barber.php                        # Barbeiros
│       ├── Service.php                       # Serviços
│       ├── Appointment.php                   # Agendamentos
│       ├── Payment.php                       # Pagamentos
│       ├── Notification.php                  # Notificações
│       └── WorkSchedule.php                  # Horários de trabalho
├── database/
│   ├── migrations/                           # 7 migrations criadas
│   └── seeders/
│       └── DatabaseSeeder.php                # Dados de exemplo
├── routes/
│   ├── api.php                               # Rotas da API
│   └── web.php                               # Rotas web
└── config/
    ├── cors.php                              # Configuração CORS
    └── sanctum.php                           # Configuração Sanctum
```

## 📂 Frontend React

```
frontend-react/
├── src/
│   ├── pages/
│   │   ├── Home.jsx                          # Página inicial
│   │   ├── Login.jsx                          # Login
│   │   ├── Register.jsx                      # Cadastro
│   │   ├── DashboardCliente.jsx              # Dashboard do cliente
│   │   ├── DashboardAdmin.jsx                # Dashboard admin
│   │   ├── Agendamentos.jsx                  # Lista de agendamentos
│   │   ├── Servicos.jsx                      # Lista de serviços
│   │   ├── Barbeiros.jsx                    # Lista de barbeiros
│   │   ├── Financeiro.jsx                    # Controle financeiro
│   │   └── Perfil.jsx                        # Perfil do usuário
│   ├── components/
│   │   ├── Navbar.jsx                        # Barra de navegação
│   │   ├── Footer.jsx                        # Rodapé
│   │   ├── ServiceCard.jsx                   # Card de serviço
│   │   ├── BarberCard.jsx                    # Card de barbeiro
│   │   ├── ScheduleForm.jsx                   # Formulário de agendamento
│   │   └── ChartCard.jsx                     # Card de estatísticas
│   ├── services/
│   │   └── api.js                            # Configuração Axios
│   ├── utils/
│   │   └── auth.js                           # Utilitários de autenticação
│   ├── App.jsx                               # Componente principal
│   └── main.jsx                              # Entry point
├── package.json                              # Dependências
└── vite.config.js                            # Configuração Vite
```

## 🗄️ Banco de Dados

### Tabelas Criadas

1. **users** - Usuários do sistema (admin, cliente, barbeiro)
2. **barbers** - Dados dos barbeiros
3. **services** - Serviços oferecidos
4. **appointments** - Agendamentos
5. **payments** - Pagamentos
6. **notifications** - Notificações
7. **work_schedules** - Horários de trabalho dos barbeiros

### Relacionamentos

- User → hasMany(Appointment)
- User → hasOne(Barber)
- Barber → hasMany(Appointment)
- Barber → hasMany(WorkSchedule)
- Service → hasMany(Appointment)
- Appointment → belongsTo(User, Barber, Service)
- Appointment → hasOne(Payment)
- Payment → belongsTo(Appointment)
- Notification → belongsTo(User)

## 🔐 Autenticação

- **Laravel Sanctum** para autenticação via token
- Tokens armazenados no localStorage do frontend
- Middleware `auth:sanctum` nas rotas protegidas
- Middleware `role` para verificar permissões

## 🎨 Frontend

- **React 18** com hooks
- **Material-UI** para componentes
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Vite** como build tool

## 📝 Funcionalidades Implementadas

### ✅ Autenticação
- Login/Logout
- Registro de usuários
- Proteção de rotas
- Diferentes níveis de acesso (admin, cliente, barbeiro)

### ✅ Agendamentos
- Criar agendamento
- Listar agendamentos
- Atualizar agendamento
- Excluir agendamento
- Verificar horários disponíveis

### ✅ Serviços
- Listar serviços
- Criar serviço (admin)
- Editar serviço (admin)
- Excluir serviço (admin)

### ✅ Barbeiros
- Listar barbeiros
- Ver horários disponíveis
- Agendar com barbeiro específico

### ✅ Dashboard
- Dashboard administrativo com estatísticas
- Dashboard do cliente com histórico
- Gráficos e métricas

### ✅ Financeiro
- Listar pagamentos
- Ver estatísticas financeiras
- Filtrar por status

## 🚀 Próximas Melhorias

1. Sistema de notificações em tempo real
2. Integração com gateway de pagamento
3. Sistema de avaliações
4. Calendário visual de agendamentos
5. Relatórios em PDF
6. Upload de fotos de perfil
7. Sistema de lembretes por email/SMS

