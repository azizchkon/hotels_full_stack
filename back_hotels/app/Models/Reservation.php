<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id', 'user_id', 'nb_personne', 'option', 
        'date_debut', 'date_fin', 'prix_total'
    ];   
     public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
    protected static function boot()
{
    parent::boot();
    static::creating(function ($reservation) {
        $hotel = $reservation->hotel; 
        $nbre_nuit = (strtotime($reservation->date_fin) - strtotime($reservation->date_debut)) / (60 * 60 * 24);
        $reservation->prix_total = $nbre_nuit * $hotel->prix;
    });
}

}