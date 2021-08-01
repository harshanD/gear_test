<?php

use Illuminate\Http\Request;

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

//Route::group(middleware('auth:api')->get('/user', function (Request $request) {
////    return $request->user();
//    Route::resource('roles', 'RoleController');
//    Route::resource('users', 'UserController');
//}));

Route::middleware('auth:api')->get('/token/revoke', function (Request $request) {
    DB::table('oauth_access_tokens')
        ->where('user_id', $request->user()->id)
        ->update([
            'revoked' => true
        ]);
    return response()->json('DONE');
});

//Route::group(['middleware' => ['auth:api']], function () {
//    Route::resource('roles', 'RoleController');
//    Route::resource('users', 'UserController');
//    Route::resource('products', 'ProductController');
//});
