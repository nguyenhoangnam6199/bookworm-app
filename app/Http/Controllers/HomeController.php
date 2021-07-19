<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use App\Models\Discount;
use Carbon\Carbon;

class HomeController extends Controller
{
    //Danh sách 10 sách khuyến mãi nhiều nhất
    function OnSaleBook(){
        $b = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
            ->join('authors','books.author_id','=','authors.id')
            ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','discounts.discount_price',DB::raw('books.book_price - discounts.discount_price as sub_price'))
            ->where(function($query) {
                $query->whereDate('discount_start_date','<=', now()->toDateString())
                      ->whereDate('discount_end_date','>=', now()->toDateString());
            })
            ->orWhere(function($query){
                $query->whereDate('discount_start_date','<=', now()->toDateString())
                      ->whereNull('discounts.discount_end_date');
            })
            ->orderByDesc('sub_price')
            ->limit(10)
            ->get();

        return response()->json($b);
    }

    //Danh sách 8 cuốn Recommended
    function RecommendedBook(){
        $book = DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name',
        DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_rating'),
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('final_price')
        ->groupBy('books.id')
        ->groupBy('authors.author_name')
        ->orderByDesc('avg_rating')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
    }

    //Danh sách 8 cuốn popular
    function PopularBook(){
        $book =  DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name',
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
        DB::raw('count(books.id) as num_review'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('final_price')
        ->groupBy('books.id')
        ->groupBy('authors.author_name')
        ->orderByDesc('num_review')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
    } 
}
