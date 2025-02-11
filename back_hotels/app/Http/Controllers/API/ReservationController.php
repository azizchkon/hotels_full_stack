<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index()
    {
        return response()->json(Reservation::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'nb_personne' => 'required|integer|min:1',
            'option' => 'nullable|string',
            'date_debut' => 'required|date', 
            'date_fin' => 'required|date|after_or_equal:date_debut', 
        ]);
        $hotel = Hotel::find($request->hotel_id);
        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }
        $date_debut = strtotime($request->date_debut);
        $date_fin = strtotime($request->date_fin);
        $nbre_nuit = ($date_fin - $date_debut) / (60 * 60 * 24); 
        if ($nbre_nuit < 1) {
            return response()->json(['message' => 'La date de fin doit être après la date de début'], 400);
        }
        $prix_total = $nbre_nuit * $hotel->prix_nuit;
        if (!Auth::check()) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }
        $reservation = Reservation::create([
            'hotel_id' => $request->hotel_id,
            'user_id' => Auth::id(),
            'nb_personne' => $request->nb_personne,
            'option' => $request->option,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'nbre_nuit' => $nbre_nuit,
            'prix_total' => $prix_total,
        ]);
        return response()->json($reservation, 201);
    }
    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        $reservation->delete();
        
        return response()->json(['message' => 'Réservation supprimée avec succès'], 200);
    }
}
