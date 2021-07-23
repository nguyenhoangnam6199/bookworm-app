import {combineReducers} from 'redux';
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    _cartReducers: cartReducer
});

export default rootReducer;