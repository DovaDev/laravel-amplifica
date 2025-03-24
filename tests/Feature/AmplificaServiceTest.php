<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;
use App\Services\AmplificaService;

class AmplificaServiceTest extends TestCase
{
    /** @test */
    public function it_fetches_regional_config()
    {
        Http::fake([
            'https://postulaciones.amplifica.io/regionalConfig' => Http::response([
                'Región A' => ['Comuna B', 'Comuna C']
            ], 200)
        ]);

        $service = new AmplificaService();
        $data = $service->getRegionalConfig();

        $this->assertIsArray($data);
        $this->assertArrayHasKey('Región A', $data);
        $this->assertContains('Comuna B', $data['Región A']);
    }

    /** @test */
    public function it_fetches_shipping_rates()
    {
        Http::fake([
            'https://postulaciones.amplifica.io/auth' => Http::response([
                'token' => 'fake-token'
            ], 200),

            'https://postulaciones.amplifica.io/getRate' => Http::response([
                'tarifas' => ['Estándar' => 2900]
            ], 200),
        ]);

        $service = new AmplificaService();
        $data = $service->getRates('Región Metropolitana', 'Providencia', [
            ['quantity' => 1, 'weight' => 1]
        ]);

        $this->assertIsArray($data);
        $this->assertArrayHasKey('tarifas', $data);
    }
}
