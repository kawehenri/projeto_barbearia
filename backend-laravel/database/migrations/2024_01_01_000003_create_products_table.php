<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('sku')->nullable(); // Código do produto
            $table->decimal('price', 10, 2);
            $table->decimal('cost', 10, 2)->nullable(); // Custo (para cálculo de lucro)
            $table->integer('stock')->default(0); // Estoque
            $table->integer('min_stock')->default(0); // Estoque mínimo (alerta)
            $table->string('supplier')->nullable(); // Fornecedor
            $table->string('image')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};

