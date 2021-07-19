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
    function getBook($id)
    {
        $book = Book::where('books.id', $id)
            ->select('books.*')
            ->with('author')
            ->with('category')
            ->with('reviews')
            ->selectFinalPrice()
            ->get();
        return response()->json($book);
    }

    function getBook1($id)
    {
        $book = Book::where('books.id', $id)
            ->select('books.*')
            ->with('author')
            ->with('category')
            ->with('reviews')
            ->selectFinalPrice()
            ->get();
        return response()->json($book);
    }

    //Lọc theo 1 category
    function FilterBy($condition,$category,$per,$page,$isAscending)
    {
        if($condition==="sale")
        {
            $b = DB::table('books')
            ->join('discounts','books.id','=','discounts.book_id')
            ->join('authors','books.author_id','=','authors.id')
            ->join('categories','books.category_id','=','categories.id')
            ->select('books.id','books.book_cover_photo','categories.category_name','books.book_title','books.book_price','authors.author_name','discounts.discount_price',
            DB::raw('books.book_price - discounts.discount_price as sub_price'),
            DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
            ->where('categories.id',$category)
            ->where(function($q){
                $q->where(function($k){
                    $k->whereDate('discount_start_date','<=', now()->toDateString())
                    ->whereDate('discount_end_date','>=', now()->toDateString());
                })
                ->orwhere(function($k){
                    $k->whereDate('discount_start_date','<=', now()->toDateString())
                    ->whereNull('discounts.discount_end_date');
                });
            })
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($b);
        }
        else if($condition==='popular'){
            $books=Book::select('books.id','authors.author_name')
            ->join('reviews', 'books.id','=','reviews.book_id')
            ->join('authors', 'books.author_id','=','authors.id')
            ->selectCountComment()
            ->orderByDesc('comment')
            ->selectFinalPrice()
            ->orderBy('final_price')
            ->groupBy('final_price')
            ->groupBy('books.id')
            ->groupBy('authors.author_name')
            ->join('categories','books.category_id','=','categories.id')
            ->where('category_id',$category)
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($books);
        }
        else if($condition==="price"){
            $books=Book::select('books.id','authors.author_name','books.author_id')
            ->selectFinalPrice()
            ->join('authors', 'books.author_id','=','authors.id')
            ->groupBy('final_price')
            ->groupBy('books.id')
            ->groupBy('authors.author_name')
            ->groupBy('authors.id')
            ->join('categories','books.category_id','=','categories.id')
            ->where('category_id',$category)
            ->limit($per)
            ->offset(($page-1)*$per)
            ->with('author');
            if($isAscending==="true"){
                $books=$books->orderBy('final_price');
            }else{
                $books=$books->orderByDesc('final_price');
            }
            $books=$books->get();
            return response()->json($books);
        }
    }

    //Lọc theo 1 Author
    function filterbyAuthor($condition,$author,$per,$page,$isAscending){
        if($condition==="sale")
        {
            $b = DB::table('books')
            ->join('discounts','books.id','=','discounts.book_id')
            ->join('authors','books.author_id','=','authors.id')
            ->join('categories','books.category_id','=','categories.id')
            ->select('books.id','books.book_cover_photo','books.book_title','books.book_price','authors.author_name','discounts.discount_price',
            DB::raw('books.book_price - discounts.discount_price as sub_price'),
            DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
            ->where('books.author_id',$author)
            ->where(function($q){
                $q->where(function($k){
                    $k->whereDate('discount_start_date','<=', now()->toDateString())
                    ->whereDate('discount_end_date','>=', now()->toDateString());
                })
                ->orwhere(function($k){
                    $k->whereDate('discount_start_date','<=', now()->toDateString())
                    ->whereNull('discounts.discount_end_date');
                });
            })
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
             return response()->json($b);

            // $books=Book::selectSubPrice()
            // ->orderByDesc('sub_price')
            // ->limit($per)
            // ->offset(($page-1)*$per)
            // ->join('authors','books.author_id','=','authors.id')
            // ->where('author_id',$author)
            // ->with('author')
            // ->get();
            // return response()->json($books);
        }
        else if($condition==='popular'){
            $books=Book::select('books.id','authors.author_name')
            ->join('reviews', 'books.id','=','reviews.book_id')
            ->join('authors', 'books.author_id','=','authors.id')
            ->selectCountComment()
            ->orderByDesc('comment')
            ->selectFinalPrice()
            ->orderBy('final_price')
            ->groupBy('final_price')
            ->groupBy('books.id')
            ->groupBy('authors.author_name')
            ->join('categories','books.category_id','=','categories.id')
            ->where('books.author_id',$author)
            ->limit($per)
            ->offset(($page-1)*$per)
            ->get();
            return response()->json($books);
        }
        else if($condition==="price"){
            $books=Book::select('books.id','authors.author_name','books.author_id')
            ->selectFinalPrice()
            ->join('authors', 'books.author_id','=','authors.id')
            ->groupBy('final_price')
            ->groupBy('books.id')
            ->groupBy('authors.author_name')
            ->groupBy('authors.id')
            ->join('categories','books.category_id','=','categories.id')
            ->where('books.author_id',$author)
            ->limit($per)
            ->offset(($page-1)*$per)
            ->with('author');
            if($isAscending==="true"){
                $books=$books->orderBy('final_price');
            }else{
                $books=$books->orderByDesc('final_price');
            }
            $books=$books->get();
            return response()->json($books);
        }
    }

}
