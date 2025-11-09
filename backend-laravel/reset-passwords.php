<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "Resetando senhas...\n\n";

$users = [
    'admin@barbearia.com',
    'cliente@teste.com',
    'maria@teste.com',
    'barbeiro@teste.com',
    'pedro@teste.com',
];

foreach ($users as $email) {
    $user = User::where('email', $email)->first();
    if ($user) {
        // Atualizar diretamente no banco sem passar pelo mutator
        \DB::table('users')
            ->where('id', $user->id)
            ->update(['password' => Hash::make('password')]);
        echo "✅ Senha resetada para: $email\n";
    }
}

echo "\n✅ Todas as senhas foram resetadas para: password\n";
echo "\nTeste agora o login!\n";

