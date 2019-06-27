import { combineReducers } from 'redux';
import productsReducer from './products-reducer';
import { fullScreen } from './cart-reducer';

const allReducers = {
    products: productsReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
