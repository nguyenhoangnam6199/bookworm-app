<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;

    const CREATED_AT = "review_date";
    const UPDATED_AT = "review_date";

    protected $fillable = ['review_title', 'review_details', 'rating_start', 'book_id'];
    
    public function scopeAverageStar($query){
        return $query->select(DB::raw('avg(CAST (rating_start AS FLOAT)) as star'));
    }
    public function scopeCountComment($query){
        return $query->select(DB::raw('count(reviews.book_id) as comment_count'));
    }
}
