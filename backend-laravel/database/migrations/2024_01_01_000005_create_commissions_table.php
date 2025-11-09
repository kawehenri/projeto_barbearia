<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->foreignId('barber_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('cascade'); // Comissão de serviço
            $table->foreignId('sale_id')->nullable()->constrained()->onDelete('cascade'); // Comissão de produto
            $table->enum('type', ['service', 'product']); // Tipo de comissão
            $table->decimal('amount', 10, 2); // Valor da comissão
            $table->decimal('rate', 5, 2); // % aplicada
            $table->enum('status', ['pending', 'paid'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commissions');
    }
};

