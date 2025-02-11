<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(Hotel::all(), 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nom_hotel' => 'required|string|max:255',
            'location' => 'required|string',
            'emplacement' => 'required|string',
            'categories' => 'required|integer|min:1|max:5',
            'description' => 'required|string',
            'prix_nuit' => 'required|numeric',
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_secondaire' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_troisieme' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        $hotel = new Hotel([
            'nom_hotel' => $request->nom_hotel,
            'location' => $request->location,
            'emplacement' => $request->emplacement,
            'categories' => $request->categories,
            'description' => $request->description,
            'prix_nuit' => $request->prix_nuit,
        ]);
        if ($request->hasFile('image_principale')) {
            $hotel->image_principale = $request->file('image_principale')->store('hotels', 'public');
        }
    
        if ($request->hasFile('image_secondaire')) {
            $hotel->image_secondaire = $request->file('image_secondaire')->store('hotels', 'public');
        }
    
        if ($request->hasFile('image_troisieme')) {
            $hotel->image_troisieme = $request->file('image_troisieme')->store('hotels', 'public');
        }
    
        $hotel->save();
    
        return response()->json($hotel, 201);
    }
    
    public function show($id)
    {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }
        return response()->json($hotel, 200);
    }
    public function update(Request $request, $id)
{
    $hotel = Hotel::find($id);
    if (!$hotel) {
        return response()->json(['message' => 'Hôtel non trouvé'], 404);
    }

    $request->validate([
        'nom_hotel' => 'sometimes|string|max:255',
        'location' => 'sometimes|string',
        'emplacement' => 'sometimes|string',
        'categories' => 'sometimes|integer|min:1|max:5',
        'description' => 'sometimes|string',
        'prix_nuit' => 'sometimes|numeric',
        'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'image_secondaire' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'image_troisieme' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $hotel->update($request->except(['image_principale', 'image_secondaire', 'image_troisieme']));

    if ($request->hasFile('image_principale')) {
        $hotel->image_principale = $request->file('image_principale')->store('hotels', 'public');
    }

    if ($request->hasFile('image_secondaire')) {
        $hotel->image_secondaire = $request->file('image_secondaire')->store('hotels', 'public');
    }

    if ($request->hasFile('image_troisieme')) {
        $hotel->image_troisieme = $request->file('image_troisieme')->store('hotels', 'public');
    }

    $hotel->save();

    return response()->json($hotel, 200);
}


public function destroy($id)
{
    $hotel = Hotel::find($id);
    if (!$hotel) {
        return response()->json(['message' => 'Hôtel non trouvé'], 404);
    }
    if ($hotel->image_principale) {
        Storage::disk('public')->delete($hotel->image_principale);
    }
    if ($hotel->image_secondaire) {
        Storage::disk('public')->delete($hotel->image_secondaire);
    }
    if ($hotel->image_troisieme) {
        Storage::disk('public')->delete($hotel->image_troisieme);
    }
    $hotel->delete();

    return response()->json(['message' => 'Hôtel supprimé avec succès'], 200);
}

}