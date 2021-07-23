import React, { Component } from 'react';
import logo from "../../assets/404.jpg";
import { connect } from 'react-redux';
import { DecreaseQuantity, IncreaseQuantity, EmptyCart } from "../store/actions";
import EmptyCartNoti from './EmptyCartNoti';
import axios from "axios"
import CartResult from './CartResult';

export class Cart extends Component {

    constructor(props){
        super(props)
        this.state={
            placedOrder: false
        }
        this.Order=this.Order.bind(this);
        this.calculateCart=this.calculateCart.bind(this);
        this.calculatePrice=this.calculatePrice.bind(this);
    }

    calculatePrice(price, quantity) {
        return Math.round((price * quantity)*100)/100;
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

    async Order(){
        let params = {
            cart:this.props.cart
        }

       await axios.post("/api/orders",params).then(
            (res)=>{
                console.log(res.data);
                this.setState({placedOrder: true})
            }
        )
    }

    render() {
        if(this.state.placedOrder) {
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
                                            <tr key={item.product.id}>
                                                <th scope="row">
                                                    <div className="media">
                                                        {
                                                        (item.product.book_cover_photo===null)
                                                        ? <img className="mr-3" src={logo} alt="logo" style={{ width: '30%',minHeight:'200px' }} />
                                                        : <img className="mr-3" src={"images/" + item.product.book_cover_photo + ".jpg"} alt="logo" style={{ width: '30%' }} />
                                                        }
                                                       
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
                                        <button className="btn btn-primary"
                                        onClick={()=>this.Order()}
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
    }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, EmptyCart })(Cart)