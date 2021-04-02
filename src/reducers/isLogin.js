import * as Types from '../constants/ActionTypes';

const initialState = {
    isLogin: false,
    name: '',
    avatar: ''
}

var myReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {

        case Types.LOGIN_USER:
            newState = {
                isLogin: true,
                name: action.name,
                avatar: action.avatar
            };
            return newState;
        case Types.LOGOUT_USER:
            newState = {
                isLogin: false,
                name: '',
                avatar: ''
            };
            return newState;
        default: return newState;    
    }
}

export default myReducer;