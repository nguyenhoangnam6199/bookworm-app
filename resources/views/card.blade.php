@extends('layout')

@section('contents')
<section class="section-pagetop">
    <div class="container">
        <h2 class="title-page">Card</h2>
    </div>
</section>

{{-- <div class="container">
    <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
                <div class="col-md-3">
                    <img src="{{ asset('src/images/items/1.jpg')}}" style="width: 200px; height: 200px;">
                </div>
                <div class="col-md-9">
                    <p>SamSung Galaxy</p>
                </div>
            </th>
            <td>$17.56</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
</div>  --}}

<section class="section-content bg padding-y">
    <div class="container">
        <div class="row">
            <div class="col-md-9">
                <article class="card card-body mb-3">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <figure class="itemside">
                                <div class="aside"><img src="{{ asset('src/images/items/1.jpg')}}" class="border img-sm"></div>
                                <figcaption class="info">
                                    <a href="#" class="title">SamSung Galaxy </a>
                                </figcaption>
                            </figure>
                        </div> <!-- col.// -->
                        <div class="col">
                            <div class="input-group input-spinner">
                                <div class="input-group-prepend">
                                    <button class="btn btn-light" type="button" id="button-plus"> <i class="fa fa-minus"></i> </button>
                                </div>
                                <input type="text" class="form-control" value="1">
                                <div class="input-group-append">
                                    <button class="btn btn-light" type="button" id="button-minus"> <i class="fa fa-plus"></i> </button>
                                </div>
                            </div> <!-- input-group.// -->
                        </div> <!-- col.// -->
                        <div class="col">
                            <div class="price h5"> $17.56 </div>
                        </div>
                        <div class="col flex-grow-0 text-right">
                            <a href="#" class="btn btn-light"> <i class="fa fa-times"></i> </a>
                        </div>
                    </div> <!-- row.// -->
                </article>
            </div>
            <div class="col-md-3 mt-3 mt-md-0">
                <div class="card">
                    <div class="card-body">
                        <dl class="dlist-align">
                            <dt>Total price:</dt>
                            <dd class="text-right">$17.56</dd>
                        </dl>
                        <hr>
                        <a href="#" class="btn btn-light btn-block btn-success">Place Order</a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</section>
@endsection