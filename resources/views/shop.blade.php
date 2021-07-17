@extends('layout')

@section('contents')
<section class="section-pagetop">
    <div class="container">
        <h2 class="title-page">Shop</h2>
    </div>
</section>
<section class="section-content bg padding-y">
    <div class="container">
        <div class="row">
            <aside class="col-md-3">
                <div class="card">
                    <article class="filter-group">
                        <header class="card-header">
                            <a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" class="">
                                <h6 class="title">Category</h6>
                            </a>
                        </header>
                        <div class="filter-content collapse show" id="collapse_5" style="">
                            <div class="card-body">
                                <label class="custom-control custom-radio">
                                    <input type="radio" name="myfilter_radio" checked="" class="custom-control-input">
                                    <div class="custom-control-label">Sale</div>
                                </label>

                                <label class="custom-control custom-radio">
                                    <input type="radio" name="myfilter_radio" class="custom-control-input">
                                    <div class="custom-control-label">Recommend</div>
                                </label>

                                <label class="custom-control custom-radio">
                                    <input type="radio" name="myfilter_radio" class="custom-control-input">
                                    <div class="custom-control-label">Popular</div>
                                </label>
                            </div>
                        </div>
                    </article>
                </div>

            </aside>
            <main class="col-md-9">
                <header class="border-bottom mb-4 pb-3">
                    <div class="form-inline">
                        <span class="mr-md-auto">10 Items found </span>
                        <select class="mr-2 form-control">
                            <option>Sort by Price: low to hight</option>
                            <option>Sort by Price: hight to low</option>
                        </select>
                    </div>
                </header>

                {{-- main --}}
                <div class="row">
                    <div class="col-md-3">
                        <figure class="card card-product-grid">
                            <div class="img-wrap">
                                <span class="topbar">
                                    <span class="badge badge-success"> Sale </span>
                                </span>
                                <img src="{{ asset('src/images/items/1.jpg')}}">
                            </div>
                            <figcaption class="info-wrap border-top">
                                <a href="#" class="title">SamSung Galaxy</a>
                                <div class="price-wrap mt-2">
                                    <span class="price">$17.56</span>
                                    <del class="price-old">$20.87</del>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="col-md-3">
                        <figure class="card card-product-grid">
                            <div class="img-wrap">
                                <span class="topbar">
                                    <span class="badge badge-success"> Sale </span>
                                </span>
                                <img src="{{ asset('src/images/items/1.jpg')}}">
                            </div>
                            <figcaption class="info-wrap border-top">
                                <a href="#" class="title">SamSung Galaxy</a>
                                <div class="price-wrap mt-2">
                                    <span class="price">$17.56</span>
                                    <del class="price-old">$20.87</del>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="col-md-3">
                        <figure class="card card-product-grid">
                            <div class="img-wrap">
                                <span class="topbar">
                                    <span class="badge badge-success"> Sale </span>
                                </span>
                                <img src="{{ asset('src/images/items/1.jpg')}}">
                            </div>
                            <figcaption class="info-wrap border-top">
                                <a href="#" class="title">SamSung Galaxy</a>
                                <div class="price-wrap mt-2">
                                    <span class="price">$17.56</span>
                                    <del class="price-old">$20.87</del>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div> 


                <nav class="mt-4" aria-label="Page navigation sample">
                    <ul class="pagination">
                        <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>

            </main>
        </div>
    </div>
</section>
@endsection