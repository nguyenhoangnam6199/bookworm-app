<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = ['order_date', 'order_amount'];

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
