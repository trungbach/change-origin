import * as Types from '../constants/ActionTypes';
import {callAPIToHandleFavorite} from '../api/callApi';
const initialState = [];

const myReducer = (state = initialState, action) => {
    let newState = [...state];
    switch(action.type) {
        case Types.FETCH_FAVORITE: 
            newState = [...action.favorite];
            return newState;
        case Types.ADD_TO_FAVORITE: {
            let {product} = action;
            let favoriteItem = {
                name: product.name,
                slug: product.slug, 
                mainImg:  product.mainImg || product.images[0].url ,
                price: product.price
            }
          
            callAPIToHandleFavorite('post', favoriteItem);
            newState.push(favoriteItem);
            return newState;
        }
        case Types.REMOVE_FROM_FAVORITE: {
            let {id, slug} = action;
            callAPIToHandleFavorite('delete', {}, id);
            if(newState.length > 0) 
                newState = newState.filter(item => item.slug !== slug);
             return newState;
        } 
        default: return newState;
    }
}

export default myReducer;