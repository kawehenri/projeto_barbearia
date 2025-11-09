<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome da barbearia
            $table->string('slug')->unique(); // URL amigável
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('logo')->nullable(); // Logo da barbearia
            $table->json('business_hours')->nullable(); // Horários de funcionamento
            $table->enum('status', ['active', 'suspended', 'inactive'])->default('active');
            $table->enum('subscription_plan', ['basic', 'premium', 'enterprise'])->default('basic');
            $table->timestamp('subscription_expires_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('companies');
    }
};

