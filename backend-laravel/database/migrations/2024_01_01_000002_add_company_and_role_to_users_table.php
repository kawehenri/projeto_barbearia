<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Adicionar company_id (null para super_admin)
            $table->foreignId('company_id')->nullable()->after('id')->constrained()->onDelete('cascade');
            
            // Avatar do usuário
            $table->string('avatar')->nullable()->after('phone');
            
            // Status do usuário
            $table->enum('status', ['active', 'inactive'])->default('active')->after('avatar');
        });
        
        // Atualizar role via SQL direto (evitar problema com Doctrine DBAL)
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('super_admin', 'admin', 'barbeiro', 'cliente') DEFAULT 'cliente'");
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn(['company_id', 'avatar', 'status']);
        });
    }
};

