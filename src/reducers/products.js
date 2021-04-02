import * as Types from '../constants/ActionTypes';


let initialState = [];
const myReducer = (state = initialState, action) => {
    let newState = [...state];
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            newState = action.products
            return [...newState];            
        default: 
            return [...newState];
    }
}

export default myReducer;