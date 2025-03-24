<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RateHistory extends Model
{
    protected $fillable = [
        'region', 'comuna', 'products', 'rates', 'status', 'error_message',
    ];

    protected $casts = [
        'products' => 'array',
        'rates' => 'array',
    ];
}
