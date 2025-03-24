<?php

namespace App\Services;

use App\Models\RateHistory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AmplificaService
{
    protected $baseUrl = 'https://postulaciones.amplifica.io';

    /**
     * Autentica en la API externa y retorna un token.
     *
     * @return string
     * @throws \Exception
     */
    public function authenticate(): string
    {
        $cacheKey = 'amplifica_token';

        if (Cache::has($cacheKey)) {
            Log::info('Token JWT recuperado desde caché.');
            return Cache::get($cacheKey);
        }

        $response = Http::post("{$this->baseUrl}/auth", [
            'username' => env('AMPLIFICA_USER'),
            'password' => env('AMPLIFICA_PASS'),
        ]);

        if (!$response->ok()) {
            Log::error('Error autenticando con Amplifica', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            throw new \Exception('No se pudo autenticar con Amplifica');
        }

        $token = $response->json('token');
        Cache::put($cacheKey, $token, now()->addSeconds(55));

        Log::info('Token JWT autenticado correctamente.');
        return $token;
    }

    /**
     * Obtiene la configuración regional desde la API.
     *
     * @return array
     * @throws \Exception
     */
    public function getRegionalConfig()
    {
        $token = $this->authenticate();

        $response = Http::withToken($token)
            ->get("{$this->baseUrl}/regionalConfig");

        if (!$response->ok()) {
            Log::error('Error obteniendo regionalConfig', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            throw new \Exception('No se pudieron obtener las regiones');
        }

        Log::info('Regiones obtenidas exitosamente.');
        return $response->json();
    }

    /**
     * Consulta tarifas para una comuna y guarda el historial.
     *
     * @param string $region
     * @param string $comuna
     * @param array $products
     * @return array
     * @throws \Exception
     */
    public function getRates(string $region, string $comuna, array $products)
    {
        $token = $this->authenticate();

        $payload = [
            'comuna' => $comuna,
            'products' => $products,
        ];

        try {
            $response = Http::withToken($token)
                ->post("{$this->baseUrl}/getRate", $payload);

            if (!$response->ok()) {
                throw new \Exception($response->body());
            }

            $rates = $response->json();

            // Guardamos éxito
            RateHistory::create([
                'region' => $region,
                'comuna' => $comuna,
                'products' => $products,
                'rates' => $rates,
                'status' => 'success',
                'error_message' => null,
            ]);

            Log::info('Tarifas obtenidas con éxito', [
                'region' => $region,
                'comuna' => $comuna,
                'cantidad_productos' => count($products)
            ]);

            return $rates;

        } catch (\Exception $e) {
            // Guardamos error
            RateHistory::create([
                'region' => $region,
                'comuna' => $comuna,
                'products' => $products,
                'rates' => [],
                'status' => 'error',
                'error_message' => $e->getMessage(),
            ]);

            Log::error('Error consultando tarifas', [
                'region' => $region,
                'comuna' => $comuna,
                'error' => $e->getMessage()
            ]);

            throw new \Exception('No se pudieron obtener las tarifas');
        }
    }
}
