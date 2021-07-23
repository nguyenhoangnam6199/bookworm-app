import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";

export default class EmptyCartNoti extends Component {
    render() {
        return (
            <div className="alert alert-warning" role="alert">
                <Link to="/shop">Continue shopping</Link>
            </div>
        )
    }
}
