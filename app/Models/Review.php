<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function scopeAverageStar($query){
        return $query->select(DB::raw('avg(CAST (rating_start AS FLOAT)) as star'));
    }
    public function scopeCountComment($query){
        return $query->select(DB::raw('count(reviews.book_id) as comment_count'));
    }
}
