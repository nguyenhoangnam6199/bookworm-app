<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShopController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/onSaleBook',[HomeController::class,'OnSaleBook']);

Route::get('/recommandBook',[HomeController::class,'RecommendedBook']);

Route::get('/popularBook',[HomeController::class,'PopularBook']);

Route::get('/book/{id}',[ShopController::class,'getBook']);

Route::get('filter/{condition}/{sortAsc}/{per}/{page}',[ShopController::class],'FilterBy');
