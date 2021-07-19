<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Carbon\Carbon;

class ShopController extends Controller
{
    function getBook($id){
        $book=Book::where('books.id',$id)
        ->select('books.*')
        ->with('author')
        ->with('category')
        ->with('reviews')
        ->selectFinalPrice()
        ->get();
        return response()->json($book);
    }
    //Lấy ra 1 sách với ID tương ứng
    function GetBookByID($id){
        // $book = DB::table('books')
        // ->leftJoin('discounts','books.id','=','discounts.book_id')
        // ->join('authors','books.author_id','=','authors.id')
        // ->select('books.id','books.book_title','authors.author_name','discounts.discount_price',
        // DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        // ->where('books.id',$id)
        // ->where(function($query) {
        //     $query->whereDate('discount_start_date','<=', now()->toDateString())
        //           ->whereDate('discount_end_date','>=', now()->toDateString());
        // })
        // ->orWhere(function($query){
        //     $query->whereDate('discount_start_date','<=', now()->toDateString())
        //           ->whereNull('discounts.discount_end_date');
        // })
        // ->limit(1)
        // ->get();
        $book=DB::table('books')
        ->join('authors','books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.*','authors.author_name',DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        ->where('books.id',$id)
        ->get();
        return response()->json($book);
    }

    //Lọc theo 1 điều kiện tương ứng
    function FilterBy($condition,$sortAsc,$per,$page){
        if($condition==="sale"){
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
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();

             return response()->json($b);
        }
        else if($condition==="popular"){
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
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($book);
        }
        else if($condition==="price"){
            $book = DB::table('books')
            ->join('authors', 'books.author_id','=','authors.id')
            ->leftJoin('discounts','books.id','=','discounts.book_id')
            ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name',
            DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
            ->groupBy('books.id');
            if($sortAsc==="true"){
                $book=$book->orderBy('final_price')
                ->limit($per)
                ->offset(($page-1)*$per)
                ->get();
            }
            else{
                $book=$book->orderByDesc('final_price')
                ->limit($per)
                ->offset(($page-1)*$per)
                ->get();
            }
            return response()->json($book);
        }
    }
    

}
