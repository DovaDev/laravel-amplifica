<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetRatesRequest;
use App\Models\RateHistory;
use Illuminate\Http\Request;
use App\Services\AmplificaService;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    use ApiResponse;

    /**
     * @var AmplificaService
     */
    protected AmplificaService $amplifica;

    /**
     * ShippingController constructor
     *
     * @param AmplificaService $amplifica Servicio encargado de manejar la comunicación con la API externa
     */
    public function __construct(AmplificaService $amplifica)
    {
        $this->amplifica = $amplifica;
    }

    /**
     * Obtener lista de regiones y comunas desde la API externa
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRegions()
    {
        try {
            $data = $this->amplifica->getRegionalConfig();
            return $this->success($data, 'Regiones obtenidas');
        } catch (\Exception $e) {
            return $this->error('No se pudo obtener la información de regiones', 500);
        }
    }

    /**
     * Calcula tarifas de envío segun productos y comuna
     *
     * @param GetRatesRequest $request Contiene los datos validados
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRates(GetRatesRequest  $request)
    {
        try {
            $data = $this->amplifica->getRates($request->region, $request->comuna, $request->products);

            RateHistory::create([
                'region' => $request->region ?? 'Desconocida',
                'comuna' => $request->comuna,
                'products' => $request->products,
                'rates' => $data,
                'status' => 'success',
            ]);

            return $this->success($data, 'Tarifas obtenidas');
        } catch (\Exception $e) {
            Log::channel('amplifica')->error('Fallo al obtener tarifas', [
                'region' => $request->region ?? 'Desconocida',
                'comuna' => $request->comuna,
                'products' => $request->products,
                'error' => $e->getMessage(),
                'time' => now()->toDateTimeString(),
            ]);

            RateHistory::create([
                'region' => $request->region ?? 'Desconocida',
                'comuna' => $request->comuna,
                'products' => $request->products,
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);
            return $this->error('No se pudo obtener las tarifas', 500);
        }
    }

}
