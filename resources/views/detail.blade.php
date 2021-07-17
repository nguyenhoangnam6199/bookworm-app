@extends('layout')

@section('contents')
<section class="section-content bg padding-y">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <article class="card">
                    <div class="card-body">
                        <div class="row">
                            <aside class="col-md-4">
                                <article class="gallery-wrap">
                                    <div class="card img-wrap">
                                        <a href="#"> <img src="{{ asset('src/images/items/1.jpg')}}"></a>
                                    </div>
                                </article>
                            </aside>
                            <main class="col-md-8">
                                <article>
                                    <a href="#" class="text-primary btn-link">Mobile Phone</a>
                                    <h3 class="title">SamSung Galaxy</h3>
                                </article>
                            </main>
                        </div>
                    </div>
                </article>
            </div>
            <div class="col-md-4 mt-3 mt-md-0">
                <div class="card">
                    <div class="card-header">
                        <div class="">
                            <del class="text-gray-light">$20.87</del>
                            <var class="price h4">$17.56</var> <br>
                        </div> <!-- price-detail-wrap .// -->
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="form-group col-md flex-grow-0">
                                <label>Quantity</label>
                                <div class="input-group mb-3 input-spinner">
                                    <div class="input-group-prepend">
                                        <button class="btn btn-light" type="button" id="button-plus"> + </button>
                                    </div>
                                    <input type="text" class="form-control" value="1">
                                    <div class="input-group-append">
                                        <button class="btn btn-light" type="button" id="button-minus"> − </button>
                                    </div>
                                </div>
                            </div> <!-- col.// -->
                            <button class="btn btn-block btn-primary">Apply</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection