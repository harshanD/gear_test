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
    return response()->json(['message' => 'Success', 'code' => 200]);
});
Route::post('signup', 'UserController@store');


Route::group(['middleware' => ['auth:api']], function () {

    Route::get('users-list', function () {
        return response()->json(\App\User::orderBy('name')->get(), 200);
    });

    Route::get('users-activation', function (Request $request) {
        DB::table('users')
            ->where('id', $request->input('id'))
            ->update([
                'status' => $request->input('status') === 'true' ? 0 : 1
            ]);
        return response()->json(['message' => 'Success', 'code' => 200]);
    });

    Route::get('books-list', function (Request $request) {

        if ($request->user()->hasRole('Admin')) {
            return response()->json(\App\Books::with('user')->get(), 200);
        } else {
            return response()->json(\App\Books::with('user')->where('author_id', $request->user()->id)->orderBy('books.name')->get(), 200);
        }

    });

//    Route::post('users-list', 'UserController@list');
});
