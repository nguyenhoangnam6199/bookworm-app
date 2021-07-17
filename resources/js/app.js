import React from "react";
import ReactDOM from 'react-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../assets/bookworm_icon.svg"

import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";


function App() {
    return (
        <BrowserRouter>
            <header className="App-header">
                <Navbar>
                    <Container>
                        <Navbar.Brand>
                            <Link to={"/"} className="nav-link">
                                <img src={logo} />
                            </Link>
                        </Navbar.Brand>

                        <Nav className="justify-content-end">
                            <Nav>
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                                <Link to={"/shop"} className="nav-link">
                                    Shop
                                </Link>
                                <Link to={"/about"} className="nav-link">
                                    About
                                </Link>
                                <Link to={"/cart"} className="nav-link">
                                    Cart (0)
                                </Link>
                            </Nav>
                        </Nav>

                    </Container>
                </Navbar>
            </header>
            <hr />

            <Cart />
            {/* <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
            </Switch> */}

            <hr />
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
        </BrowserRouter>);
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
