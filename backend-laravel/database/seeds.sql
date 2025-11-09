-- Popular banco de dados com dados de exemplo

USE barbearia_db;

-- Inserir usuários (senha: password - hash bcrypt)
INSERT INTO users (name, email, password, role, phone, created_at, updated_at) VALUES
('Administrador', 'admin@barbearia.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '(11) 99999-9999', NOW(), NOW()),
('João Silva', 'cliente@teste.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cliente', '(11) 98888-8888', NOW(), NOW()),
('Maria Santos', 'maria@teste.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cliente', '(11) 97777-7777', NOW(), NOW()),
('Carlos Barbeiro', 'barbeiro@teste.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'barbeiro', '(11) 96666-6666', NOW(), NOW()),
('Pedro Estilista', 'pedro@teste.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'barbeiro', '(11) 95555-5555', NOW(), NOW());

-- Inserir barbeiros
INSERT INTO barbers (user_id, specialty, bio, active, created_at, updated_at) VALUES
(4, 'Corte Masculino', 'Especialista em cortes modernos e clássicos', TRUE, NOW(), NOW()),
(5, 'Barba e Bigode', 'Mestre em design de barba', TRUE, NOW(), NOW());

-- Inserir serviços
INSERT INTO services (name, description, price, duration, active, created_at, updated_at) VALUES
('Corte Masculino', 'Corte de cabelo masculino moderno', 35.00, 30, TRUE, NOW(), NOW()),
('Barba', 'Aparar e modelar barba', 25.00, 20, TRUE, NOW(), NOW()),
('Corte + Barba', 'Pacote completo: corte e barba', 50.00, 45, TRUE, NOW(), NOW()),
('Sobrancelha', 'Design de sobrancelhas', 15.00, 15, TRUE, NOW(), NOW()),
('Relaxamento', 'Relaxamento capilar', 80.00, 60, TRUE, NOW(), NOW());

-- Inserir agendamentos
INSERT INTO appointments (user_id, barber_id, service_id, date, time, status, notes, created_at, updated_at) VALUES
(2, 1, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:00:00', 'agendado', 'Primeira vez', NOW(), NOW()),
(3, 2, 3, DATE_ADD(CURDATE(), INTERVAL 3 DAY), '14:00:00', 'agendado', NULL, NOW(), NOW()),
(2, 1, 2, DATE_SUB(CURDATE(), INTERVAL 5 DAY), '16:00:00', 'concluido', NULL, NOW(), NOW()),
(3, 2, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), '11:00:00', 'concluido', NULL, NOW(), NOW()),
(2, 1, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '15:30:00', 'confirmado', 'Cliente regular', NOW(), NOW());

-- Inserir pagamentos
INSERT INTO payments (appointment_id, amount, status, method, paid_at, created_at, updated_at) VALUES
(1, 35.00, 'pendente', NULL, NULL, NOW(), NOW()),
(2, 50.00, 'pago', 'pix', NOW(), NOW(), NOW()),
(3, 25.00, 'pago', 'dinheiro', DATE_SUB(NOW(), INTERVAL 5 DAY), NOW(), NOW()),
(4, 35.00, 'pago', 'cartao', DATE_SUB(NOW(), INTERVAL 3 DAY), NOW(), NOW()),
(5, 50.00, 'pendente', NULL, NULL, NOW(), NOW());

-- Inserir notificações
INSERT INTO notifications (user_id, title, message, `read`, type, created_at, updated_at) VALUES
(2, 'Agendamento Confirmado', 'Seu agendamento para amanhã às 15:30 foi confirmado!', FALSE, 'success', NOW(), NOW()),
(2, 'Lembrete', 'Não esqueça do seu agendamento hoje!', FALSE, 'info', NOW(), NOW()),
(3, 'Pagamento Recebido', 'Seu pagamento foi confirmado. Obrigado!', TRUE, 'success', NOW(), NOW());

-- Inserir horários de trabalho
INSERT INTO work_schedules (barber_id, day_of_week, start_time, end_time, available, created_at, updated_at) VALUES
(1, 'monday', '08:00:00', '18:00:00', TRUE, NOW(), NOW()),
(1, 'tuesday', '08:00:00', '18:00:00', TRUE, NOW(), NOW()),
(1, 'wednesday', '08:00:00', '18:00:00', TRUE, NOW(), NOW()),
(1, 'thursday', '08:00:00', '18:00:00', TRUE, NOW(), NOW()),
(1, 'friday', '08:00:00', '18:00:00', TRUE, NOW(), NOW()),
(1, 'saturday', '08:00:00', '14:00:00', TRUE, NOW(), NOW()),
(2, 'monday', '09:00:00', '17:00:00', TRUE, NOW(), NOW()),
(2, 'tuesday', '09:00:00', '17:00:00', TRUE, NOW(), NOW()),
(2, 'wednesday', '09:00:00', '17:00:00', TRUE, NOW(), NOW()),
(2, 'thursday', '09:00:00', '17:00:00', TRUE, NOW(), NOW()),
(2, 'friday', '09:00:00', '17:00:00', TRUE, NOW(), NOW());

