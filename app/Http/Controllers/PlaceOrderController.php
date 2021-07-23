<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlaceOrderController extends Controller
{
   
    public function store(Request $request)
    {
        $input_id = $request->input("cart.*.product.id");
        $input_quantity = $request->input("cart.*.quantity");

        $books = Book::whereIn('books.id', $input_id)
        ->leftJoin('discounts', 'books.id', '=', 'discounts.book_id')
        ->select(
            'books.id',
            'books.book_cover_photo',
            'books.book_title',
            'books.book_price',
            DB::raw('CASE WHEN (discounts.discount_price is null) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
        )->get();

        $order = DB::transaction(function () use ($books, $input_quantity) {
            $total = 0;
            foreach ($books as $i => $book) {
                $order_books[] = [
                    'book_id' => $book->id,
                    'price' => $book->final_price,
                    'quantity' => $input_quantity[$i]
                ];
                $total += ($book->final_price * $input_quantity[$i]);
                //$total += ($book['price'] * $book['quantity']);
            }
            $order = Order::create([
                'order_date' => now(),
                'order_amount' => $total
            ]);
            $order->order_items()->createMany($order_books);

            return $order;
        });
        
        return response($order, 201);
    }

 
    
}
