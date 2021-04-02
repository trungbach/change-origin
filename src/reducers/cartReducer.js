import * as Types from '../constants/ActionTypes';
import {callAPIToHandleCart} from '../api/callApi';
import { toast } from 'react-toastify';
import * as message from '../Message';
const initialState = [];

const myReducer = (state = initialState, action) => {
    let newState = [...state];
    switch(action.type) {
        case Types.FETCH_CARTS: 
            newState = [...action.carts];
            return newState;
        case Types.ADD_TO_CART: {
            let {product} = action;

            let cartItem = {
                name: product.name,
                slug: product.slug,
                price: product.price,
                mainImg: product.images[0].url,
                size: action.size,
                quantity: action.quantity
            }
            callAPIToHandleCart('post', cartItem, cartItem.id);
            newState.push(cartItem);
            toast.success(message.ADD_TO_CART_SUCCESS);
            return newState;
        }
        case Types.REMOVE_FROM_CART: {
            let {id, slug} = action;
            callAPIToHandleCart('delete', {}, id);
            if(newState.length > 0) 
                newState = newState.filter(item => item.slug !== slug);
            return newState;
        } 
        case Types.CHANGE_FROM_CART: {
            let {slug, size, quantity} = action;
            let cartItem = {
                size,
                quantity
            };
            let stateLength = newState.length;
            for(let i = 0; i < stateLength; i++) {
                if(newState[i].slug === slug && newState[i].size === size) {
                    let {id} = newState[i];
                    let newState1 = {...newState[i],...cartItem};
                    newState[i] = {...newState1};
                    callAPIToHandleCart('patch', {quantity}, id);
                    break;
                }
            }
            return newState;
        }
            
        default: return newState;
    }
}

export default myReducer;