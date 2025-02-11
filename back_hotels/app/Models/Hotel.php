<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_hotel', 'location', 'emplacement', 'categories', 
        'description', 'prix_nuit', 'image_principale', 
        'image_secondaire', 'image_troisieme'
    ];
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
