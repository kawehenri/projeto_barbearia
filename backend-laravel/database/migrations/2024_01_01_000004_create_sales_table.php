<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->foreignId('barber_id')->constrained('users')->onDelete('cascade'); // Barbeiro que vendeu
            $table->foreignId('client_id')->nullable()->constrained('users')->onDelete('set null'); // Cliente
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2); // Preço unitário no momento da venda
            $table->decimal('total', 10, 2); // Total da venda
            $table->decimal('commission_rate', 5, 2)->default(10.00); // % de comissão
            $table->decimal('commission_amount', 10, 2); // Valor da comissão
            $table->enum('payment_method', ['cash', 'credit', 'debit', 'pix'])->default('cash');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales');
    }
};

