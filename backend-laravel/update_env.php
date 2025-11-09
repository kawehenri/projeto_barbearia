<?php

$envFile = __DIR__ . '/.env';
$envContent = file_get_contents($envFile);

// Gerar nova chave
$key = 'base64:' . base64_encode(random_bytes(32));

// Atualizar APP_KEY
$envContent = preg_replace('/^APP_KEY=.*$/m', 'APP_KEY=' . $key, $envContent);

// Salvar
file_put_contents($envFile, $envContent);

echo "✅ Chave APP_KEY atualizada com sucesso!\n";
echo "Chave gerada: " . $key . "\n";

