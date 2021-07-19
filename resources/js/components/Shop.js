import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg";

export default class Shop extends Component {
    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">Books (Filter by Category #1)</h2>
                    </div>
                </section>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <b>Filter By</b>
                            <div className="card" style={{ width: '11rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Category</h5>
                                    <a href="#" className="card-title">Category 1</a>
                                    <br />
                                    <a href="#" className="card-title">Category 2</a>
                                    <br />
                                    <a href="#" className="card-title">Category 3</a>
                                </div>
                            </div>
                            <br />
                            <div className="card" style={{ width: '11rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Author</h5>
                                    <a href="#" className="card-title">Author 1</a>
                                    <br />
                                    <a href="#" className="card-title">Author 2</a>
                                    <br />
                                    <a href="#" className="card-title">Author 3</a>
                                </div>
                            </div>
                            <br />
                            <div className="card" style={{ width: '11rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Rating View</h5>
                                    <a href="#" className="card-title">1 Star</a>
                                    <br />
                                    <a href="#" className="card-title">2 Star</a>
                                    <br />
                                    <a href="#" className="card-title">3 Star</a>
                                    <br />
                                    <a href="#" className="card-title">4 Star</a>
                                    <br />
                                    <a href="#" className="card-title">5 Star</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9" style={{ marginLeft: '10px' }}>
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Showing 1-12 of 126 books</p>
                                </div>
                                <p>        </p>
                                <div className="col-md-3" style={{ marginLeft: '200px' }}>
                                    <select className="custom-select">
                                        <option value ="#">Sort By OnSale</option>
                                        <option value="#">Sort By Popularity</option>
                                        <option value="#">Sort By Price: low to high</option>
                                        <option value="#">Sort By Price: hight to low</option>
                                    </select>
                                </div>
                                <div className="col-md-2" >
                                <select className="custom-select">
                                        <option value ="#">Show 8</option>
                                        <option value="#">Show 12</option>
                                        <option value="#">Show 16</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            {/* Contents */}
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item-slide p-2">
                                        <div className="card" style={{ width: '13rem' }}>
                                            <img className="card-img-top" src={logo} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title">React Book</h5>
                                                <p className="card-text">Author</p>
                                                <a href="#" className="btn btn-primary">
                                                    <del className="price-old" style={{ marginRight: '15px' }}>$20.87</del>
                                                    <span className="price">$17.56</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* Pagination */}
                            <div className="row">
                                <nav aria-label="Page navigation example" style={{ marginLeft: '320px' }}>
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
