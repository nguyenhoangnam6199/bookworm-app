import React, { Component } from 'react'
import logo from "../../assets/bookworm_icon.svg";

export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-light text-center text-lg-start">
                {/* Grid container */}
                <div className="container p-4">
                    {/*Grid row*/}
                    <div className="row">
                        {/*Grid column*/}
                        <div className="col-lg-3">
                            <img src={logo} className="logo-footer" />
                        </div>
                        {/*Grid column*/}
                        {/*Grid column*/}
                        <div className="col-lg-6">
                            <h5 className="text-uppercase">BOOK WORM</h5>
                            <p>
                                Address: 97 MAN THIEN HIEP PHU
                            </p>
                            <p>Phone: 0973-431-764</p>
                        </div>
                        {/*Grid column*/}
                    </div>
                    {/*Grid row*/}
                </div>
                {/* Grid container */}
            </footer>
        )
    }
}
