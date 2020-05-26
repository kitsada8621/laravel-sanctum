<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/login', function () {
    abort(401);
})->name('login');
Route::post('/login','Api\LoginController@login');

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/user','Api\UserController@index');
    Route::post('/user','Api\UserController@store');
    Route::put('/user/{id}','Api\UserController@update');
    Route::delete('/user/{id}','Api\UserController@delete');

});
