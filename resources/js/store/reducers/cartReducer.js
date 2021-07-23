import {ADD_CART, DECREASE_QUANTITY, EMPTY_CART, INCREASE_QUANTITY} from '../actions';

const cart = {
    numberCart: 0,
    carts: []
}

const MAX_QUANTITY = 8;

export default function cartReducer(state = cart, action) {
    let p_quantity, p_product;

    switch (action.type) {
        case ADD_CART:
            p_product = action.payload.product;
            p_quantity = action.payload.quantity;
            console.log(p_product)

            let plus_number_cart = 0;

            if (state.numberCart === 0) {
                let cart = {
                    product: p_product,
                    quantity: p_quantity,
                }
                state.carts.push(cart);
                plus_number_cart = 1
            } else {
                let check = false;
                state.carts.map((item, key) => {
                    if (item.product.id === p_product.id) {
                        if ((state.carts[key].quantity + p_quantity) > MAX_QUANTITY) {
                            p_quantity = MAX_QUANTITY - state.carts[key].quantity
                        }
                        state.carts[key].quantity += p_quantity;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        product: p_product,
                        quantity: p_quantity
                    }
                    state.carts.push(_cart);
                    plus_number_cart = 1
                }
            }

            return {
                ...state,
                numberCart: state.numberCart + plus_number_cart
            }

        case INCREASE_QUANTITY:
            p_product = action.payload
            p_quantity = state.carts.find((item) => {
                return p_product.id == item.product.id
            }).quantity;
            if (p_quantity == MAX_QUANTITY) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                carts: state.carts.map((item) => {
                    if (item.product.id === p_product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item;
                    }
                })
            }

        case DECREASE_QUANTITY:
            p_product = action.payload
            p_quantity = state.carts.find((item) => {
                return p_product.id == item.product.id
            }).quantity;
            if (p_quantity == 1) {
                return {
                    ...state,
                    numberCart: state.numberCart - 1,
                    carts: state.carts.filter(item => {
                        return item.product.id != p_product.id
                    })
                }
            }

            return {
                ...state,
                carts: state.carts.map((item) => {
                    if (item.product.id === p_product.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item;
                    }
                })
            }
        case EMPTY_CART:
            return {
                ...initProduct
            }
        default:
            return state;
    }
}