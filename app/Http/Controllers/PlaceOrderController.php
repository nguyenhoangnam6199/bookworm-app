<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlaceOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


     public function __construct(Book $book, Order $order)
     {
        $this->book = $book;
        $this->order=$order;
     }
    public function store(Request $request)
    {
        $idBook = $request->input('cart.*.product.id');
        $quantity=$request->input('cart.*.quantity');
        $b = $this->book->whereIn('id', $idBook)->get();
        $order = DB::transaction(function () use ($b, $quantity) {
            $order = $this->orderModel->create([
                'order_date'   => now(),
                'order_amount' => 0,
            ]);

            $order_items = [];
            $order_amount = 0;
            for ($i = 0; $i < count($b); $i++) {
                $order_items[] = [
                    'book_id'  => $b[$i]->id,
                    'price'    => $b[$i]->final_price,
                    'quantity' => $quantity[$i],
                ];
                $order_amount += ($b[$i]->final_price * $b[$i]);
            }

            $order->items()->createMany($order_items);
            $order->update(['order_amount' => $order_amount]);

            return $order;
        });

        return response($order, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
