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
        case Types.GET_FILTER:
            return newState;
        case Types.FILTER_PRODUCTS:
            return newState = {...newState, ...action.filterType };
        case Types.RESET_FILTER:
            newState = {
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
            return newState;    
        case Types.FILTER_BYCOLOR:
            newState = {...state, colorName: action.colorName};
            return newState;    
        default: return {...state};    
    }
}

export default myReducer;