<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{path?}', function () {
    return view('welcome');
})->where('path', '[a-zA-Z0-9-/]+');

// Route::get('/', function () {
//     return view('home');
// });

// Route::get('/shop', function () {
//     return view('shop');
// });

// Route::get('/about', function () {
//     return view('about');
// });

// Route::get('/card', function () {
//     return view('card');
// });

// Route::get('/detail', function () {
//     return view('detail');
// });

