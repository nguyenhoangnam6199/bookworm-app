<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function Book()
    {
        return $this->belongsTo(Book::class);
    }
    public function scopeValidDate($query)
    {
        return $query->where(function($query){
           $query->whereDate('discount_start_date', '<=', now())
                        ->whereDate('discount_end_date','>=',now());
        })
        ->orWhere(function ($query) {
         $query->whereDate('discount_start_date', '<=', now())
                ->WhereNull('discount_end_date');
        });
    }
}
