import * as Types from '../constants/ActionTypes';
import {callAPIProducts, callAPICarts, callAPIAddress, callAPIFavorite} from '../api/callApi';

export const fetchProductsRequest = () => {
    return (dispatch) => {
        return callAPIProducts().then(res => dispatch(fetchProducts(res.data)));
    }
}

export const fetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const filerProducts = (filterType) => {
    return {
        type: Types.FILTER_PRODUCTS,
        filterType
    }
}

export const resetFilter = (filterTable) => {
    return {
        type: Types.RESET_FILTER,
        filterTable
    }
}

export const searchProduct = (search) => {
    return {
        type: Types.SEARCH_PRODUCTS,
        search
    }
}

export const filterByColor  = (colorName) => {
    return {
        type: Types.FILTER_BYCOLOR,
        colorName
    }
}

export const fetchCartsRequest = () => {
    return (dispatch) => {
        return callAPICarts().then(res => dispatch(fetchCarts(res.data)));
    }
}

export const fetchCarts = (carts) => {
    return {
        type: Types.FETCH_CARTS,
        carts
    }
}


export const addToCart = (product, size, quantity) => {
    return {
        type: Types.ADD_TO_CART,
        product,
        size, 
        quantity
    }
}

export const removeFromCart = (id, slug) => {
    return {
        type: Types.REMOVE_FROM_CART,
        id,
        slug
    }
}

export const changeToCart = (slug, size, quantity, id) => {
    return {
        type: Types.CHANGE_FROM_CART,
        slug, 
        size,
        quantity,
        id
    }
}

export const loginUser = (name,avatar) => {
    return {
        type: Types.LOGIN_USER,
        name,
        avatar
    }
}

export const logoutUser = () => {
    return {
        type: Types.LOGOUT_USER
    }
}


export const fetchAddressUserRequest = () => {
    return (dispatch) => {
        return callAPIAddress().then(res => dispatch(fetchAddressUser(res.data)));
    }
}

export const fetchAddressUser = (address) => {
    return {
        type: Types.GET_ADDRESS_USER,
        address
    }
}

export const addAddressUser = (address) => {
    return {
        type: Types.ADD_ADDRESS_USER,
        address
    }
}

export const removeSingleAddressUser = (id) => {
    return {
        type: Types.REMOVE_SINGLE_ADDRESS_USER,
        id
    }
}

export const fetchFavoriteRequest = () => {
    return (dispatch) => {
        return callAPIFavorite().then(res => dispatch(fetchFavorite(res.data)));
    }
}

export const fetchFavorite = (favorite) => {
    return {
        type: Types.FETCH_FAVORITE,
        favorite
    }
}

export const addToFavorite = (product) => {
    return {
        type: Types.ADD_TO_FAVORITE,
        product
    }
}

export const removeFromFavorite = (slug) => {
    return {
        type: Types.REMOVE_FROM_FAVORITE,
        slug
    }
}