<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Bootstrap-ecommerce by Vosidiy M.">

    <title>Bookworm App</title>
    <script src="{{ asset('src/js/bootstrap.bundle.min.js') }}" type="text/javascript"></script>
    <link href="{{ asset('src/css/bootstrap.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('src/fonts/fontawesome/css/all.min.css') }}" type="text/css" rel="stylesheet">
    <link href="{{ asset('src/plugins/slickslider/slick.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('src/plugins/slickslider/slick-theme.css')}}" rel="stylesheet" type="text/css" />
    <script src="{{ asset('src/plugins/slickslider/slick.min.js')}}"></script>
    <link href="{{ asset('src/fonts/feathericons/css/iconfont.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('src/fonts/material-icons/css/materialdesignicons.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('src/css/ui.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('src/css/responsive.css') }}" rel="stylesheet" />
    <script src="{{ asset('ecommerce/js/script.js') }}" type="text/javascript"></script>
</head>
<body>
    <header class="section-header">
        <section class="border-bottom">
            <nav class="navbar navbar-main  navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand py-2" href="http://127.0.0.1:8000"><img src="{{ asset('assets/bookworm_icon.svg') }}" class="logo"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav2" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                    <div class="collapse navbar-collapse" id="main_nav2">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000">Home </a>
                                {{-- <a class="nav-link" href="{{route('home')}}">Home </a> --}}
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/shop">Shop</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="http://127.0.0.1:8000/card">Card (0)</a>
                            </li>
                        </ul>
                    </div>
                </div> 
            </nav>
        </section>
    </header>

    {{-- Main --}}
    <div class="container-fluid">
        @yield('contents')
    </div>

    <footer class="section-footer border-top">
        <div class="container">
            <section class="footer-top padding-y">
                <div class="row">
                    <div class="col-md-3">
                        <img src="{{ asset('assets/bookworm_icon.svg') }}" class="logo-footer">
                    </div>
                    <div class="col-md-8">
                        <div class="font-weight-bold">BOOKWORM</div>
                        Address: 97 MAN THIEN HIEP PHU
                        <br>Phone: 0917-338-345
                    </div>
                </div>
            </section>
        </div>
    </footer>

    {{-- Phần điều hướng mũi tên --}}
    <script>
        $(document).ready(function() {
            if ($('.slider-items-slick').length > 0) {
                $('.slider-items-slick').slick({
                    infinite: true,
                    swipeToSlide: true,
                    slidesToShow: 4,
                    dots: true,
                    slidesToScroll: 2,
                    prevArrow: '<button type="button" class="d-none d-sm-block slick-prev"><i class="fa fa-chevron-left"></i></button>',
                    nextArrow: '<button type="button" class="d-none d-sm-block slick-next"><i class="fa fa-chevron-right"></i></button>',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 640,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        });
    </script>
</body>
</html>