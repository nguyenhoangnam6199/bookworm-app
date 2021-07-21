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
            ->get();
        return response()->json($book);
    }


    //Lọc theo 1 category
    function FilterBy(Request $request)
    {
        // $loai, $condition, $category, $per, $isAscending
        $loai = $request->loai;
        $condition = $request->condition;
        $category = $request->category;
        $per = $request->per;
        $isAscending = $request->isAscending;

        if ($loai === "1") {
            if ($condition === "sale") {
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
                    ->paginate($per);
                return response()->json($b);
            } else if ($condition === 'popular') {
                $book = DB::table('books')
                    ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'books.book_title',
                        'authors.author_name',
                        'books.book_price',
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                        DB::raw('count(books.id) as num_review')
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
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->orderByDesc('num_review')
                    ->orderBy('final_price')
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    // ->get();
                    ->paginate($per);
                return response()->json($book);
            } else if ($condition === "price") {
                $books = Book::select('books.id', 'books.book_title', 'authors.author_name', 'books.author_id', 'books.book_cover_photo', 'books.book_price')
                    ->selectFinalPrice()
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->groupBy('authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->where('category_id', $category)
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    ->with('author');
                if ($isAscending === "true") {
                    $books = $books->orderBy('final_price');
                } else {
                    $books = $books->orderByDesc('final_price');
                }
                $books = $books->paginate($per);
                return response()->json($books);
            }
        }
        //Lọc theo tác giả
        else if ($loai === "2") {
            if ($condition === "sale") {
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
                    ->where('books.author_id', $category)
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
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    // ->get();
                    ->paginate($per);
                return response()->json($b);
            } else if ($condition === 'popular') {
                $book = DB::table('books')
                    ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'books.book_title',
                        'authors.author_name',
                        'books.book_price',
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                        DB::raw('count(books.id) as num_review')
                    )
                    ->where('books.author_id', $category)
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
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->orderByDesc('num_review')
                    ->orderBy('final_price')
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    // ->get();
                    ->paginate($per);
                return response()->json($book);
            } else if ($condition === "price") {
                $books = Book::select('books.id','books.book_price', 'authors.author_name', 'books.author_id', 'books.book_cover_photo', 'books.book_title')
                    ->selectFinalPrice()
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->groupBy('authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->where('books.author_id', $category)
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    ->with('author');
                if ($isAscending === "true") {
                    $books = $books->orderBy('final_price');
                } else {
                    $books = $books->orderByDesc('final_price');
                }
                $books = $books->paginate($per);
                return response()->json($books);
            }
        }
        //Lọc theo số sao review
        else if ($loai === "3") {
            if ($condition === 'sale') {
                $b = DB::table('books')
                    ->join('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->join('reviews', 'books.id', '=', 'reviews.book_id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'categories.category_name',
                        'books.book_title',
                        'books.book_price',
                        'authors.author_name',
                        DB::raw('CAST(AVG(CAST (reviews.rating_start AS INT)) as INT) as star'),
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price',
                        )
                    )
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
                    ->havingRaw('cast(avg(CAST (reviews.rating_start AS INT)) as int) = ?',[$category])
                    ->groupBy('books.id','categories.category_name','authors.author_name','discounts.discount_price')
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    // ->get();
                    ->paginate($per);
                return response()->json($b);
            } else if ($condition === "popular") {
                $book = DB::table('books')
                    ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->join('reviews', 'books.id', '=', 'reviews.book_id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'books.book_title',
                        'authors.author_name',
                        'books.book_price',
                        DB::raw('CAST(AVG(CAST (reviews.rating_start AS INT)) as INT) as star'),
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                        DB::raw('count(books.id) as num_review')
                    )
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
                    ->havingRaw('cast(avg(CAST (reviews.rating_start AS INT)) as int) = ?',[$category])
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->orderByDesc('num_review')
                    ->orderBy('final_price')
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    // ->get();
                    ->paginate($per);
                return response()->json($book);
            } else if ($condition === "price") {
                $books = Book::select(
                    'books.id', 'books.book_title', 'authors.author_name', 
                    'books.author_id', 'books.book_cover_photo', 'books.book_price',
                    DB::raw('CAST(AVG(CAST (reviews.rating_start AS INT)) as INT) as star'))
                    ->selectFinalPrice()
                    ->havingRaw('cast(avg(CAST (reviews.rating_start AS INT)) as int) = ?',[$category])
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('reviews', 'books.id', '=', 'reviews.book_id')
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->groupBy('authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    // ->limit($per)
                    // ->offset(($page - 1) * $per)
                    ->with('author');
                if ($isAscending === "true") {
                    $books = $books->orderBy('final_price');
                } else {
                    $books = $books->orderByDesc('final_price');
                }
                $books = $books->paginate($per);
                return response()->json($books);
            }
        }
    }


    //Lọc theo 1 category
    function FilterBy1($loai, $condition, $category, $per, $isAscending)
    {
        if ($loai === "1") {
            if ($condition === "sale") {
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
                    ->paginate($per);
                return response()->json($b);
            } else if ($condition === 'popular') {
                $book = DB::table('books')
                    ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'books.book_title',
                        'authors.author_name',
                        'books.book_price',
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                        DB::raw('count(books.id) as num_review')
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
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->orderByDesc('num_review')
                    ->orderBy('final_price')
                    ->paginate($per);
                return response()->json($book);
            } else if ($condition === "price") {
                $books = Book::select('books.id', 'authors.author_name', 'books.author_id', 'books.book_cover_photo', 'books.book_price')
                    ->selectFinalPrice()
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->groupBy('authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->where('category_id', $category)
                    ->with('author');
                if ($isAscending === "true") {
                    $books = $books->orderBy('final_price');
                } else {
                    $books = $books->orderByDesc('final_price');
                }
                $books = $books->paginate($per);
                return response()->json($books);
            }
        }
        //Lọc theo tác giả
        else if ($loai === "2") {
            if ($condition === "sale") {
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
                    ->where('books.author_id', $category)
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
                    ->paginate($per);
                return response()->json($b);
            } else if ($condition === 'popular') {
                $book = DB::table('books')
                    ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->select(
                        'books.id',
                        'books.book_cover_photo',
                        'books.book_title',
                        'authors.author_name',
                        'books.book_price',
                        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                        DB::raw('count(books.id) as num_review')
                    )
                    ->where('books.author_id', $category)
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
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->orderByDesc('num_review')
                    ->orderBy('final_price')
                    ->paginate($per);
                return response()->json($book);
            } else if ($condition === "price") {
                $books = Book::select('books.id', 'authors.author_name', 'books.author_id', 'books.book_cover_photo')
                    ->selectFinalPrice()
                    ->join('authors', 'books.author_id', '=', 'authors.id')
                    ->groupBy('final_price')
                    ->groupBy('books.id')
                    ->groupBy('authors.author_name')
                    ->groupBy('authors.id')
                    ->join('categories', 'books.category_id', '=', 'categories.id')
                    ->where('books.author_id', $category)
                    ->with('author');
                if ($isAscending === "true") {
                    $books = $books->orderBy('final_price');
                } else {
                    $books = $books->orderByDesc('final_price');
                }
                $books = $books->paginate($per);;
                return response()->json($books);
            }
        }
    }
}
