import React from "react";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import {
    BrowserRouter as Router,
    Routes,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import About from "./About";
import Shop from "./Shop";
import Cart from "./Cart";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import {store, persistor} from "../store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Header />
                    <br />
                    <Route exact path="/" >
                        <HomePage />
                    </Route>
                    <Route path="/about" >
                        <About />
                    </Route>
                    <Route path="/shop" >
                        <Shop />
                    </Route>
                    <Route path="/cart" >
                        <Cart />
                    </Route>
                    <Route path="/book/:id" component={ProductDetail}>
                    </Route>
                    <br />
                    <Footer />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
