import React, { Component } from 'react';
import {notification} from 'antd';
import logo from "../../assets/404.jpg";
import { connect } from 'react-redux';
import { DecreaseQuantity, IncreaseQuantity, EmptyCart, DeleteItemFromCart } from "../store/actions";
import EmptyCartNoti from './EmptyCartNoti';
import axios from "axios"
import { Link } from "react-router-dom";
import CartResult from './CartResult';

export class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            placedOrder: false
        }
        this.Order = this.Order.bind(this);
        this.calculateCart = this.calculateCart.bind(this);
        this.calculatePrice = this.calculatePrice.bind(this);
    }

    calculatePrice(price, quantity) {
        return Math.round((price * quantity) * 100) / 100;
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

    openNotificationWithIcon = (type, title, message) => {
        notification[type]({
          message: title,
          description: message
        });
      };

    async Order() {
        const {cart}  = this.props;

        let params = {
            cart: cart
        }

        const resGetIdBooks = await axios.get("/api/bookID");
        const {status, data}  = resGetIdBooks;
        let idArr = []
        let itemIdNotExist = [];
        let itemNameNotExist = [];
        if(status === 200){
            console.log(data);
            data.map(item => idArr.push(item.id));
            cart.map(item => {
                const {id, book_title} = item.product
                if(!idArr.includes(id)){
                    itemIdNotExist.push(id);
                    itemNameNotExist.push(book_title);
                }
            })

            if(itemIdNotExist.length > 0){
                console.log('item not exist: ' + itemNameNotExist.join(' & '))
                itemIdNotExist.map(item => this.props.DeleteItemFromCart(item));
                return;
            }
        }

        await axios.post("/api/orders", params).then(
            (res) => {
                
                console.log(res.data);
                this.setState(
                    {
                        placedOrder: true,
                    }
                )
                this.props.EmptyCart();
            }
        )
    }

    render() {
        if (this.state.placedOrder) {
            return <CartResult />
        }
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
                                            // <Link key={item.product.id} to={"/book/" + item.product.id}>   
                                            // </Link>
                                            <tr key={item.product.id}>
                                                <th scope="row">
                                                    <Link key={item.product.id} to={"/book/" + item.product.id}>
                                                        <div className="media">
                                                            {
                                                                (item.product.book_cover_photo === null)
                                                                    ? <img className="mr-3" src={logo} alt="logo" style={{ width: '30%', minHeight: '200px' }} />
                                                                    : <img className="mr-3" src={"images/" + item.product.book_cover_photo + ".jpg"} alt="logo" style={{ width: '30%', minHeight: '200px' }} />
                                                            }

                                                            <br />
                                                            <div className="media-body">
                                                                <br />
                                                                <h3 className="mt-0">{item.product.book_title}</h3>
                                                                <h6>{item.product.author.author_name}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </th>
                                                <td style={{ paddingTop: '60px' }}>
                                                    $<span id="test">{item.product.final_price}</span>
                                                    <br />
                                                    {
                                                        (item.product.final_price === item.product.book_price)
                                                            ? ""
                                                            : <del>${item.product.book_price}</del>
                                                    }
                                                </td>
                                                <td style={{ paddingTop: '53px' }}>
                                                    <div className="input-group number-spinner" style={{ margin: 'auto' }}>
                                                        <span className="input-group-btn">
                                                            <button id="btnSub" className="btn btn-default" data-dir="dwn" onClick={() => this.props.DecreaseQuantity(item.product)}>-</button>
                                                        </span>
                                                        <input id="number" type="text" className="form-control text-center" value={item.quantity} readOnly />
                                                        <span className="input-group-btn">
                                                            <button id="btnAdd" className="btn btn-default" data-dir="up" onClick={() => this.props.IncreaseQuantity(item.product)}>+</button>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{ paddingTop: '60px' }}>
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
                                        <button className="btn btn-primary"
                                            onClick={() => this.Order()}
                                        >
                                            Place Order
                                        </button>
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
        numbercart: state._cartReducers.numberCart
    }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, EmptyCart, DeleteItemFromCart })(Cart)