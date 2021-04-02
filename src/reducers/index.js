import {combineReducers} from "redux";
import products from './products';
import filterProduct from './filterProduct';
import searchProducts from './searchProducts';
import cartReducer from './cartReducer';
import isLogin from './isLogin';
import addressUser from './addressUser';
import favoriteReducer from './favoriteReducer';

const myReducer = combineReducers({
    products,
    filterProduct,
    searchProducts,
    cartReducer,
    isLogin,
    addressUser,
    favoriteReducer
})

export default myReducer;