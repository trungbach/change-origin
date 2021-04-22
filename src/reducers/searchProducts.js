import * as Types from '../constants/ActionTypes';

const initialState  = '';

const myReducer = (state = initialState, action) => {
    let newState = state;
    switch(action.type) {
        case Types.GET_SEARCH_KEY:
            return newState;
        case Types.SEARCH_PRODUCTS: 
            newState = action.search;
            return newState;
        default: return newState;     
    }
}

export default myReducer;