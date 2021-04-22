import * as Types from '../constants/ActionTypes';

const initialState = {
    isLogin: false,
    name: '',
    avatar: ''
}

var myReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case Types.GET_ISLOGIN:  
            if(newState.name !== '') {
                let user = JSON.parse(localStorage.getItem('profile'));
                return { ...newState, ...user};
            }
            return newState;
        case Types.LOGIN_USER:
            newState = {
                isLogin: true,
                name: action.name,
                avatar: action.avatar
            };
            localStorage.setItem('profile', JSON.stringify({name: action.name, avatar: action.avatar}));
            return newState;
        case Types.LOGOUT_USER:
            newState = {
                isLogin: false,
                name: '',
                avatar: ''
            };
            localStorage.removeItem('profile');
            return newState;
        default: return newState;    
    }
}

export default myReducer;