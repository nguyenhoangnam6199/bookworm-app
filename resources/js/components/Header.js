import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Switch,
    Route,
    NavLink,
    Link
} from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/bookworm_icon.svg";
import { connect } from 'react-redux';

export class Header extends Component {
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
                                <NavLink exact id="1" to={"/"} className="nav-link" activeStyle={{
                                    fontWeight: "bold",
                                    color: "black"
                                }} >
                                    Home
                                </NavLink>
                                <NavLink id="2" to={"/shop"} className="nav-link" activeStyle={{
                                    fontWeight: "bold",
                                    color: "black"
                                }}>
                                    Shop
                                </NavLink>
                                <NavLink id="3" to={"/about"} className="nav-link" activeStyle={{
                                    fontWeight: "bold",
                                    color: "black"
                                }}>
                                    About
                                </NavLink>
                                <NavLink id="4" to={"/cart"} className="nav-link" activeStyle={{
                                    fontWeight: "bold",
                                    color: "black"
                                }}>
                                    Cart ({this.props.numberCart})
                                </NavLink>
                            </Nav>
                        </Nav>

                    </Container>
                </Navbar>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        numberCart: state._cartReducers.numberCart
    }
}

export default connect(mapStateToProps, null)(Header)