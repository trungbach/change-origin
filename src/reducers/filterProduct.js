import * as Types from '../constants/ActionTypes';

const initialState = {
    saleOff: false,
    onlineOnly: false,
    limitedEdition: false,
    newArrival: false,
    bestSeller: false,
    style: 'all',
    type: 'all',
    price: 990000,
    by: 'all',
    color: '',
    removeFilter: false,
    colorName: ''
}

var myReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case Types.FILTER_PRODUCTS:
            newState = {...state, ...action.filterType};
            return newState;
        case Types.RESET_FILTER:
            newState = {...action.filterTable};
            return newState;    
        case Types.FILTER_BYCOLOR:
            newState.colorName = action.colorName;
            // newState = {...state, ...action.colorName};
            console.log(newState);
            return newState;    
        default: return {...state};    
    }
}

export default myReducer;