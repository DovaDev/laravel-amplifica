<?php

use App\Http\Controllers\Admin\HistoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ShippingController;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Auth;

Route::middleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
])->group(function () {
    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login correcto',
            'data' => ['user' => Auth::user()]
        ]);
    });

    Route::post('/logout', function (Request $request) {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout correcto']);
    });
});

Route::prefix('v1')->group(function () {
    Route::get('/regions', [ShippingController::class, 'getRegions']);
    Route::post('/rates', [ShippingController::class, 'getRates']);
    Route::get('/history', [HistoryController::class, 'apiIndex']);

    Route::middleware(['auth:sanctum', 'admin'])->get('/admin/historial', [HistoryController::class, 'apiIndex']);

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return response()->json($request->user());
    });
});
