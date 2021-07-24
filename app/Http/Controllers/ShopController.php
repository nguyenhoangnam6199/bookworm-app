<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Book;
use Carbon\Carbon;

class ShopController extends Controller
{
    //Test paginate
    function index($category)
    {
        $b = DB::table('books')
            ->join('discounts', 'books.id', '=', 'discounts.book_id')
            ->join('authors', 'books.author_id', '=', 'authors.id')
            ->join('categories', 'books.category_id', '=', 'categories.id')
            ->select(
                'books.id',
                'books.book_cover_photo',
                'categories.category_name',
                'books.book_title',
                'books.book_price',
                'authors.author_name',
                'discounts.discount_price',
                DB::raw('books.book_price - discounts.discount_price as sub_price'),
                DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price')
            )
            ->where('categories.id', $category)
            ->where(function ($q) {
                $q->where(function ($k) {
                    $k->whereDate('discount_start_date', '<=', now()->toDateString())
                        ->whereDate('discount_end_date', '>=', now()->toDateString());
                })
                    ->orwhere(function ($k) {
                        $k->whereDate('discount_start_date', '<=', now()->toDateString())
                            ->whereNull('discounts.discount_end_date');
                    });
            })
            ->paginate(2);
        return response()->json($b);
    }
    //Lấy ra danh sách tên loại
    function getCategory()
    {
        $category = DB::table('categories')
            ->select('categories.id', 'categories.category_name')
            ->get();
        return response()->json($category);
    }

    //Lấy danh sách tác giả
    function getAuthor()
    {
        $author = DB::table('authors')
            ->select('authors.id', 'authors.author_name')
            ->get();
        return response()->json($author);
    }
    //Lấy ra 1 sách với ID tương ứng
    function getBook($id)
    {
        $book = Book::where('books.id', $id)
            ->select('books.*')
            ->with('author')
            ->with('category')
            ->with('reviews')
            ->selectFinalPrice()
            ->SelectAverageStar()
            ->first(); 
        return response()->json($book);
    }

    //Đếm số lượng từng star ứng với sản phẩm có id tương ứng
    function countStart($id)
    {
        $b = DB::table('books')
            ->join('reviews', 'books.id', '=', 'reviews.book_id')
            ->select(
                'books.id',
                'reviews.rating_start',
                DB::raw('count(cast(reviews.rating_start as int)) as sl')

            )
            ->where('books.id', $id)
            ->groupBy('books.id', 'reviews.rating_start')
            ->get();
        return response()->json($b);
    }

    //Đếm tổng số lượng star của 1 sản phẩm có id tương ứng
    function sumStar($id)
    {
        $b = DB::table('books')
            ->join('reviews', 'books.id', '=', 'reviews.book_id')
            ->select(
                'books.id',
                DB::raw('sum(cast(reviews.rating_start as int)) as SumOfStar')
            )
            ->where('books.id', $id)
            ->groupBy('books.id')
            ->first();
        return response()->json($b);
    }

    //Lọc theo 1 category
    function FilterBy(Request $request)
    {
        $filter = $request->filter;
        $sort = $request->sort;
        $filterValue = $request->filterValue;
        $per = $request->per;

        $query = Book::query()
                    ->leftJoin('discounts', function ($join) {
                        $join->on('books.id', '=', 'discounts.book_id')
                            ->whereDate('discount_start_date', '<=', now())
                            ->where(function ($query) {
                                $query->whereDate('discount_end_date', '>', now())
                                    ->orWhereNull('discount_end_date');
                            });
                    })
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->select(
                        'books.*',
                        'categories.category_name',
                        'authors.author_name',
                        'discounts.discount_price',
                        DB::raw('(CASE WHEN discount_price IS NULL THEN 0 ELSE book_price - discount_price END) as sub_price'),
                        DB::raw('CASE WHEN (discounts.discount_price IS NULL) THEN books.book_price ELSE discounts.discount_price end  as final_price')
                    );


        //Mac dinh trang shop
        switch ($filter) {
            case "category":
                $query = $query->where('books.category_id', $filterValue);
                break;
            
            case "author":
                $query = $query->where('books.author_id', $filterValue);
                break;

            case "star":
                $query = $query
                    ->join('reviews', 'books.id', '=', 'reviews.book_id')
                    ->addSelect([
                        'star' => DB::raw('CAST(AVG(CAST (reviews.rating_start AS INT)) as INT)'),
                    ])
                    ->groupByRaw('books.id')
                    ->groupByRaw('authors.author_name')
                    ->groupByRaw('categories.category_name')
                    ->groupByRaw('discounts.discount_price')
                    ->havingRaw('cast(avg(CAST (reviews.rating_start AS INT)) as int) = ?', [$filterValue]);

            default:
                # code...
                break;
        }

        switch ($sort) {
            case 'popular':
                $query = $query
                    ->withCount('reviews')
                    ->orderByDesc('reviews_count')
                    ->orderBy('final_price');
                break;
                
            case 'price-asc':
                $query = $query->orderBy('final_price');
                break;
                
            case 'price-desc':
                $query = $query->orderByDesc('final_price');
                break;
            
            default: // onsale is default
                $query = $query
                ->orderByDesc('sub_price')
                ->orderBy('final_price');
            break;
        } 

        // return $query->toSql();
        $books = $query->paginate($per);
        return response()->json($books);
    }

    function FilterReview($idBook, $idStar, $condition,$isAscending, $per)
    {
        if($condition==="time"){
            $b = DB::table('books')
                ->join('reviews', 'books.id', '=', 'reviews.book_id')
                ->select(
                    'reviews.id',
                    'reviews.review_title',
                    'reviews.review_details',
                    'reviews.review_date'
                )
                ->where('books.id', $idBook)
                ->havingRaw('cast(reviews.rating_start as int) = ?', [$idStar])
                ->groupBy(
                    'reviews.id',
                    'reviews.review_title',
                    'reviews.review_details',
                    'reviews.review_date',
                    'reviews.rating_start'
                );

                if($isAscending==="true"){
                    $b=$b->orderBy('reviews.review_date')->paginate($per);
                }
                else{
                    $b=$b->orderByDesc('reviews.review_date')->paginate($per);
                }
                // ->paginate($per);
            return response()->json($b);
        }
    }
}
