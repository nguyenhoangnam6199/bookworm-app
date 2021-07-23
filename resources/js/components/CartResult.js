import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class CartResult extends Component {
    render() {
        return (
            <section className="section-content bg padding-y pt-0">
            <div className="container">
                <div className="row" style={{ padding: "10rem 0px"}}>
                    <div className="col-12 text-center">
                        <h1 className="display-3">Thank You For Ordering</h1>
                        <hr />
                        <p className="lead">
                            <Link className="btn btn-primary" to="/shop" role="button">Continue shopping</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
