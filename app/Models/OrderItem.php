<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['book_id', 'quantity', 'order_id', 'price'];

    public function order()
    {
        $this->belongsTo(Order::class);
    }
}
