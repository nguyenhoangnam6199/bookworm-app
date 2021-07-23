import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg";
import { connect } from 'react-redux';
import { DecreaseQuantity, IncreaseQuantity, EmptyCart } from "../store/actions";
import EmptyCartNoti from './EmptyCartNoti';

export class Cart extends Component {
    addFunction() {
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) + 1;
        var kt = document.getElementById("test").innerText.slice(0);
        // kt= parseFloat(kt);
        console.log(kt);
        var load = parseFloat(rs) * parseFloat(kt)
        console.log(load);
        document.getElementById('number').value = parseInt(rs);
        document.getElementById('PriceTotal').innerHTML = load.toFixed(2);
        document.getElementById('cartTol').innerHTML = load.toFixed(2);
    }

    minusFunction() {
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) - 1;
        if (rs < 0) {
            rs = 0;
        }
        var kt = document.getElementById("test").innerText.slice(0);
        // kt= parseFloat(kt);
        console.log(kt);
        var load = parseFloat(rs) * parseFloat(kt)
        console.log(load);
        document.getElementById('number').value = parseInt(rs);
        document.getElementById('PriceTotal').innerHTML = load.toFixed(2);
        document.getElementById('cartTol').innerHTML = load.toFixed(2);
    }

    calculatePrice(price, quantity) {
        return (price * quantity);
    }

    calculateCart() {
        let TotalCart = 0;
        console.log(this.props.cart)
        this.props.cart.forEach(item => {
            TotalCart += (item.quantity * item.product.final_price);
        })

        TotalCart = Math.round(TotalCart * 100) / 100
        return TotalCart;
    }


    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 className="title-page text-white">Your cart: {this.props.cart.length} items</h2>
                    </div>
                </section>
                <div className="container">
                    {(this.props.cart.length == 0) ?
                        <EmptyCartNoti />
                        :
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
                                        {this.props.cart.map(item => (
                                            <tr key={item.product.id}>
                                                <th scope="row">
                                                    <div className="media">
                                                        <img className="mr-3" src={"images/" + item.product.book_cover_photo + ".jpg"} alt="logo" style={{ width: '30%' }} />
                                                        <br />
                                                        <div className="media-body">
                                                            <br />
                                                            <h3 className="mt-0">{item.product.book_title}</h3>
                                                            <h4>{item.product.author.author_name}</h4>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>
                                                    $<span id="test">{item.product.final_price}</span>
                                                </td>
                                                <td>
                                                    <div className="input-group number-spinner" style={{ margin: 'auto' }}>
                                                        <span className="input-group-btn">
                                                            <button id="btnSub" className="btn btn-default" data-dir="dwn" onClick={() =>this.props.DecreaseQuantity(item.product)}>-</button>
                                                        </span>
                                                        <input id="number" type="text" className="form-control text-center" value={item.quantity} readOnly />
                                                        <span className="input-group-btn">
                                                            <button id="btnAdd" className="btn btn-default" data-dir="up" onClick={() => this.props.IncreaseQuantity(item.product)}>+</button>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    $<span id="PriceTotal">{this.calculatePrice(item.product.final_price, item.quantity)}</span>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-3">
                                <div className="card text-center">
                                    <div className="card-header">
                                        Cart Totals
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">$<span id="cartTol">{this.calculateCart()}</span></h5>
                                        <button className="btn btn-primary">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state._cartReducers.carts,
    }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, EmptyCart })(Cart)