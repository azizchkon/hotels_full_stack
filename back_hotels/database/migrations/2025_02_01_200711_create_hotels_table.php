<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('nom_hotel');
            $table->string('location');
            $table->string('emplacement');
            $table->integer('categories');
            $table->text('description');
            $table->decimal('prix_nuit', 10, 2);
            $table->string('image_principale');
            $table->string('image_secondaire')->nullable();
            $table->string('image_troisieme')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hotels');
    }
};
