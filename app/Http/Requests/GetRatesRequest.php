<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetRatesRequest extends FormRequest
{
    /**
     * Evalua si el usuario está autorizado
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para la solicitud
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'region' => 'required|string',
            'comuna' => 'required|string',
            'products' => 'required|array|min:1',
            'products.*.weight' => 'required|numeric|min:0.1',
            'products.*.quantity' => 'required|integer|min:1',
        ];
    }
}
