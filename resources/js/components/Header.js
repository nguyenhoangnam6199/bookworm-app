import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "../../assets/bookworm_icon.svg";
export default class Header extends Component {
    render() {
        return (
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
                                <Link to={"/"} className="nav-link">
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
        )
    }
}
