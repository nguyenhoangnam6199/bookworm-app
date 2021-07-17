import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg";

export default class Cart extends Component {
    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">Your cart: 3 items</h2>
                    </div>
                </section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div className="media">
                                                <img className="mr-3" src={logo} alt="logo" style={{ width: '30%' }} />
                                                <br />
                                                <div className="media-body">
                                                    <br />
                                                    <br />
                                                    <h3 className="mt-0">React Book</h3>
                                                    <h4>Author Name</h4>
                                                </div>
                                            </div>
                                        </th>
                                        <td>$17.57</td>
                                        <td>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <button>
                                                        <i class="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control" id="inputGroupFile01" value="1" style={{ textAlign: 'center' }} />
                                                <div className="input-group-append">
                                                    <button>
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$17.57</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center">
                                <div className="card-header">
                                    Cart Totals
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">$17.57</h5>
                                    <a href="#" className="btn btn-primary">Place Order</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
