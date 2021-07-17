<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Carbon\Carbon;

class ShopController extends Controller
{
    //Lấy ra 1 sách với ID tương ứng
    function GetBookByID($id){
        $book = DB::table('books')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->join('authors','books.author_id','=','authors.id')
        ->select('books.id','books.book_title','authors.author_name','discounts.discount_price')
        ->where('books.id',$id)
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->get();
        return response()->json($book);
    }

    //Lọc theo 1 loại
    function FilterByCategory($condition,$category, $per, $page, $isAccending){
        if($condition==="sale"){
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
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();

            return response()->json($b);
        }
        else if($condition==="popular"){
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
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($b4);
        }
        else if($condition==="recommend"){
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
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($b4);
        
        }
        else if($condition==="price"){
            $b =Book::select('books.id','authors.author_name','books.author_id')
            ->FinalPrice()
            ->join('authors', 'books.author_id','=','authors.id')
            ->groupBy('final_price','books.id','authors.author_name','authors.id')
            ->join('categories','books.category_id','=','categories.id')
            ->where('category_id',$category)
            ->limit($per)
            ->offset(($page-1)*$per)
            ->with('author');
            if($isAccending==="true"){
                $b=$b->orderBy('final_price');
            }else{
                $b=$b->orderByDesc('final_price');
            }
            $b=$b->get();
            return response()->json($b);
        }
    }

}
