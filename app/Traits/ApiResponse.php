<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * Retornar una respuesta exitosa
     *
     * @param mixed $data Datos a incluir en la respuesta
     * @param string $message Mensaje opcional
     * @param int $code Cod http
     * @return \Illuminate\Http\JsonResponse
     */
    protected function success($data = [], string $message = 'OK', int $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

     /**
     * Retornar una respuesta de error
     *
     * @param string $message Mensaje de error
     * @param int $code Cod http
     * @param mixed $data Datos extra
     * @return \Illuminate\Http\JsonResponse
     */
    protected function error(string $message = 'Error', int $code = 500, $data = [])
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => $data,
        ], $code);
    }
}
