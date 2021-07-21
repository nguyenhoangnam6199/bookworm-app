import React, { Component } from 'react';
import logo from "../../assets/bookcover/book8.jpg";

export default class Cart extends Component {
    addFunction(){
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) +1;
        var kt = document.getElementById ( "test" ).innerText.slice(0);
       // kt= parseFloat(kt);
        console.log(kt);
        var load = parseFloat(rs)*parseFloat(kt)
        console.log(load);
        document.getElementById('number').value=parseInt(rs);
        document.getElementById('PriceTotal').innerHTML=load.toFixed(2);
        document.getElementById('cartTol').innerHTML=load.toFixed(2);
    }

    minusFunction(){
        var x = document.getElementById('number').value;
        var rs = 0;
        rs = parseInt(x) -1;
        if(rs<0){
            rs=0;
        }
        var kt = document.getElementById ( "test" ).innerText.slice(0);
       // kt= parseFloat(kt);
        console.log(kt);
        var load = parseFloat(rs)*parseFloat(kt)
        console.log(load);
        document.getElementById('number').value=parseInt(rs);
        document.getElementById('PriceTotal').innerHTML=load.toFixed(2);
        document.getElementById('cartTol').innerHTML=load.toFixed(2);
    }
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
                                        <td>
                                            $<span id="test">17.57</span>
                                           {/* <input type="text" id="Price" value="$17.57" readOnly/> */}
                                        </td>
                                        <td>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-outline-secondary" type="button" 
                                                onClick={()=>this.minusFunction()}>
                                                    -
                                                </button>
                                            </div>
                                            <input type="text" id="number" className="form-control" value="1" style={{ textAlign: 'center' }} readOnly />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button" onClick={()=>this.addFunction()}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                            $<span id="PriceTotal">17.57</span>
                                        </td>
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
                                    <h5 className="card-title">$<span id="cartTol">17.57</span></h5>
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
