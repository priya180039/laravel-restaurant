<?php

namespace App\Http\Controllers;

use App\Models\Beverages;
use Illuminate\Http\Request;

class BeveragesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $beverages = Beverages::paginate(15);
        return response()->json([
            'data' => $beverages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $beverage = Beverages::create([
            'beverage_name' => $request->beverage_name,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $request->image,
            'description' => $request->description
        ]);
        return response()->json([
            'data' => $beverage
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Beverages $beverage)
    {
        return response()->json([
            'data' => $beverage
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Beverages $beverage)
    {
        $beverage->beverage_name = $request->beverage_name;
        $beverage->price = $request->price;
        $beverage->stock = $request->stock;
        $beverage->image = $request->image;
        $beverage->description = $request->description;
        $beverage->save();

        return response()->json([
            'data' => $beverage
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Beverages $beverage)
    {
        $beverage->delete();
        return response()->json([
            'data' => $beverage
        ]);
    }
}
