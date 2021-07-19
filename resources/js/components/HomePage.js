import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg"
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Product from './Product';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSale: [],
            reCommend: [],
            Popular: []
        };
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/onSaleBook')
            .then(res => {
                this.setState({
                    onSale: res.data
                });
                console.log(this.state.onSale);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://127.0.0.1:8000/api/recommandBook')
            .then(res => {
                this.setState({
                    reCommend: res.data
                });
                console.log(this.state.reCommend);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://127.0.0.1:8000/api/popularBook')
            .then(res => {
                this.setState({
                    Popular: res.data
                });
                console.log(this.state.Popular);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div className="container">
                <h2>OnSale</h2>
                <div className="border border-dark" style={{ paddingLeft: '20px' }}>
                    <br />
                    <Slider {...settings}>
                        {this.state.onSale.map(book => (
                            <div key={book.id}>
                                <div className="card" style={{ width: '13rem' }}>
                                    <img className="card-img-top" src={'../../assets/bookcover/' + book.book_cover_photo + '.jpg'} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.book_title}</h5>
                                        <p className="card-text">{book.author_name}</p>
                                        <Link to={"/book/" + book.id} className="btn btn-primary">
                                            <del className="price-old" style={{ marginRight: '15px' }}>${book.book_price}</del>
                                            <span className="price">${book.final_price}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <br />
                <br />
                <h2>Recommend</h2>
                <div className="row border border-dark">
                    {this.state.reCommend.map(book => (
                        <div key={book.id} className="col-md-3">
                            <div className="item-slide p-2">
                                <div className="card" style={{ width: '13rem' }}>
                                    <img className="card-img-top" src={'../../assets/bookcover/' + book.book_cover_photo + '.jpg'} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.book_title}</h5>
                                        <p className="card-text">{book.author_name}</p>
                                        <Link to={"/book/" + book.id} className="btn btn-primary">
                                            <span className="price">${parseFloat(book.final_price)}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <h2>Popular</h2>
                <div className="row border border-dark">
                    {this.state.Popular.map(book => (
                        <div key={book.id} className="col-md-3">
                            <div className="item-slide p-2">
                                <div className="card" style={{ width: '13rem' }}>
                                    <img className="card-img-top" src={'../../assets/bookcover/' + book.book_cover_photo + '.jpg'} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.book_title}</h5>
                                        <p className="card-text">{book.author_name}</p>
                                        <Link to={"/book/" + book.id} className="btn btn-primary">
                                            <span className="price">${parseFloat(book.final_price)}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br />
                <br />
            </div>
        )
    }
}
