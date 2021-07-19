import React, { Component } from 'react'
import axios from "axios";

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book:{}
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/book/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    book: res.data
                });
                console.log(this.state.book);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {`${this.state.book.book_title}`}
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">Product Detail</h2>
                    </div>
                </section>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 border border-dark">
                            <div className="media">
                                <img className="align-self-start mr-3" src={'../../assets/bookcover/'+this.state.book.book_cover_photo+'.jpg'} alt="logo" style={{ width: '20%', marginTop: '10px' }} />
                                <div className="media-body">
                                    <h5 className="mt-0"></h5>
                                    <p></p>
                                    <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <div className="card-header">
                                    <del className="price-old">$20.87</del>
                                    <span><b style={{ fontSize: '30px' }}>$17.57</b></span>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <br />
                                    Quantity
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-outline-secondary" type="button">-</button>
                                        </div>
                                        <input type="text" className="form-control" value="1" style={{ textAlign: 'center' }} />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button">+</button>
                                        </div>
                                    </div>
                                    <br />
                                    <button type="button" className="btn btn-success">Add To Cart</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action active" style={{ textAlign: 'center' }}>
                                    Write a Review
                                </a>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Add Title</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Details please! Your review helps other shoppers</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter details" />
                                    </div>
                                    <div className="form-group">
                                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Select a rating star</label>
                                        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                            <option selected>Choose...</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Star</option>
                                            <option value="3">3 Star</option>
                                            <option value="4">4 Star</option>
                                            <option value="5">5 Star</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-success" style={{marginLeft: '480px'}}>Submit Review</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
