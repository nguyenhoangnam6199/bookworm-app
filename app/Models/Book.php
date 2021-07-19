<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class);
    }

    public function scopeSelectSubPrice($query)
    {
        return $query
            ->whereHas('discounts',function($query){
                $query->validDate();
            })
            ->addSelect([
                'sub_price' => Discount::select(DB::raw('books.book_price - discount_price'))
                    ->whereColumn('book_id', 'books.id')
            ]);
    }
    public function scopeSelectAverageStar($query){
        return $query->addSelect([
            'star'=>Review::averageStar()
                ->whereColumn('book_id','books.id')
        ]);
    }
    public function scopeSelectCountComment($query){
        return $query->addSelect([
            'comment'=>Review::countComment()
                ->whereColumn('book_id','books.id')
        ]);
    }

    public function scopeSelectFinalPrice($query)
    {
        return $query->selectRaw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price')
            ->leftJoin('discounts', function ($join) {
                $join->on('books.id', '=', 'discounts.book_id')
                    ->where(function($query){
                        $query->where(function($query){
                            $query->whereDate('discount_start_date', '<=', now())
                                         ->whereDate('discount_end_date','>=',now());
                         })
                         ->orWhere(function ($query) {
                          $query->whereDate('discount_start_date', '<=', now())
                                 ->WhereNull('discount_end_date');
                         });
                    });
            });
    }
}
