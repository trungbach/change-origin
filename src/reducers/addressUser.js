import * as Types from '../constants/ActionTypes';
import {callAPIToHandleAddress} from '../api/callApi';

const initialState = [];

const myReducer = (state = initialState, action) => {
    let newState = [...state];
    switch(action.type) {
        case Types.GET_ADDRESS_USER:
            newState = [...action.address];
            return newState;
        case Types.ADD_ADDRESS_USER: 
            let {address} = action;
            let newAddress = {name: address.name, address: address.address, phonenumber: address.phone};
            callAPIToHandleAddress('post', newAddress);
            newState.push(newAddress);
            return newState;
        case Types.REMOVE_SINGLE_ADDRESS_USER: 
            let {id} = action;
            callAPIToHandleAddress('delete', {}, id);
            if(newState.length > 0)
                newState = newState.filter(address => address.id !== id);
            return newState;
        default: return newState;
    }
}

export default myReducer;