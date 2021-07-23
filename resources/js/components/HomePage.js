import React, { Component } from 'react';
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Product from './Product';
import logo from "../../../public/images/404.jpg";

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onSale: [],
            books: [],
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
                    books: res.data
                });
                console.log(this.state.reCommend);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async popularShow() {
        await axios.get("http://127.0.0.1:8000/api/popularBook").then(response => {
            this.setState({ books: response.data });
            document.getElementById("popular").style.background = "grey";
            document.getElementById("recommend").style.background = "white";
            document.getElementById("recommend").style.color = "black";
        }).catch(error => console.log(error));
    }
    async recommendShow() {
        axios.get("http://127.0.0.1:8000/api/recommandBook").then(response => {
            this.setState({ books: response.data });
            document.getElementById("recommend").style.background = "grey";
            document.getElementById("popular").style.background = "white";
        }).catch(error => console.log(error));
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4 className="d-inline">OnSale</h4>
                        <Link to="/shop" className="btn btn-secondary float-right">View all <i className="fa fa-caret-right ml-2"></i></Link>
                    </div>
                </div>
                <br />
                <div style={{ padding: '20px', borderStyle: 'solid', background: '#484d51eb' }}>
                    <br />
                    <Slider {...settings}>
                        {this.state.onSale.map(book => (
                            <Link key={book.id} to={"/book/" + book.id}>
                                <div className="card" style={{ marginRight: '10px', minWidth: '200px', marginBottom: '20px' }} >
                                    {
                                        (book.book_cover_photo == null)
                                            ? <img style={{ minHeight: '200px' }} className="card-img-top" src={logo} alt={book.book_title + " photo"} />
                                            : <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} />
                                    }
                                    <div className="card-body" style={{ maxHeight: '120px' }}>
                                        <h5 className="card-title" style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.book_title}</h5>
                                        <p className="card-text" >{book.author_name}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            {(book.book_price !== book.final_price)
                                                ? <del>${book.book_price}</del>
                                                : ""
                                            }
                                            <span>${book.final_price}</span>
                                        </li>
                                    </ul>
                                </div>

                            </Link>
                        ))}
                    </Slider>
                </div>
                <br />
                <br />
                <div className="featured-books">
                    <h3 style={{marginLeft: '460px' }}>Featured Books</h3>
                    <br></br>
                    <button style={{ marginLeft: '450px' }} id="recommend" className="btn btn-secondary border-0" onClick={() => this.recommendShow()}>Recommended</button>
                    <button id="popular" className="btn" onClick={() => this.popularShow()}>Popular</button>
                    <br></br>
                    <br></br>
                    <div style={{borderStyle: 'solid', padding: '20px',background: '#484d51eb'}}>
                        <div className="list-featured-books">
                            <div className="row">
                                {this.state.books.map(book => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={book.id}>
                                        <Link key={book.id} to={"/book/" + book.id}>
                                            <div className="card" style={{ marginRight: '10px', width: '15rem' }} >
                                                {
                                                    (book.book_cover_photo == null)
                                                        ? <img style={{ minHeight: '200px' }} className="card-img-top" src={logo} alt={book.book_title + " photo"} />
                                                        : <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} />
                                                }
                                                {/* <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} /> */}
                                                <div className="card-body" style={{ maxHeight: '100px' }}>
                                                    <h5 className="card-title" style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} >{book.book_title}</h5>
                                                    <p className="card-text" >{book.author_name}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        {(book.book_price !== book.final_price)
                                                            ? <del>${book.book_price}</del>
                                                            : ""
                                                        }
                                                        ${book.final_price}
                                                    </li>
                                                </ul>
                                            </div>
                                            <br />
                                        </Link>

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        )
    }
}
