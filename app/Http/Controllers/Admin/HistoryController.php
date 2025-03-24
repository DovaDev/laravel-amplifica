<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RateHistory;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    use ApiResponse;

    public function apiIndex(Request $request)
    {
        $region = $request->input('region');
        $days = $request->input('days', 4);
    
        $query = RateHistory::query();
    
        if ($region) {
            $query->where('region', $region);
        }
    
        $query->where('created_at', '>=', now()->subDays($days));
    
        $histories = $query->latest()->take(50)->get();
    
        return $this->success($histories, 'Historial filtrado correctamente');
    }
}
