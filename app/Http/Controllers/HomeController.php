<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Carbon\Carbon;

class HomeController extends Controller
{
    //Danh sách 10 sách khuyến mãi nhiều nhất
    function OnSaleBook(){
        $b = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
            ->join('authors','books.author_id','=','authors.id')
            ->select('books.id','books.book_title','authors.author_name','discounts.discount_price',DB::raw('book_price - discount_price as sub_price'))
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
        ;
    }

    //Danh sách 8 cuốn Recommended
    //theo sql query
    function index1(){
        $b3 = DB::select('select books.id, discounts.discount_price, sum(cast(reviews.rating_start as integer))/count(*) as avg_rating
        from books join reviews ON reviews.book_id = books.id
            left join discounts ON discounts.book_id = books.id
            where  (current_date between discounts.discount_start_date and discounts.discount_end_date) or  (current_date >=discounts.discount_start_date and discounts.discount_end_date isnull)
        group by books.id, discounts.discount_price
        order by discounts.discount_price asc
        LIMIT 8');
        return response()->json($b3);
    }

    //Theo query buider
    function RecommendedBook(){
        $b4 = DB::table('books')
        ->join('reviews','books.id','=','reviews.book_id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','discounts.discount_price',DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_rating'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('books.id','discounts.discount_price')
        ->orderByDesc('avg_rating')
        ->orderBy('discounts.discount_price','asc')
        ->limit(8)
        ->get();
        return response()->json($b4);
    }

    //Danh sách 8 cuốn popular
    public function index3(){
        function index3(){
            $b3 = DB::select('select books.id, discounts.discount_price, count(books.id) as num_review
            from books join reviews ON reviews.book_id = books.id
                left join discounts ON discounts.book_id = books.id
            where  (current_date between discounts.discount_start_date and discounts.discount_end_date) 
            or  (current_date >=discounts.discount_start_date and discounts.discount_end_date isnull)
            group by books.id, discounts.discount_price
            order by num_review desc, discounts.discount_price asc
            LIMIT 8');
            return response()->json($b3);
        }
    }

    function PopularBook(){
        $b4 = DB::table('books')
        ->join('reviews','books.id','=','reviews.book_id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','discounts.discount_price',DB::raw('count(books.id) as num_review'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('books.id','discounts.discount_price')
        ->orderByDesc('num_review')
        ->orderBy('discounts.discount_price','asc')
        ->limit(8)
        ->get();
        return response()->json($b4);
    }

    
}
