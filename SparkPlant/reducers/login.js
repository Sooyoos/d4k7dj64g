import * as types from '../actions/types';
const initialState = {
    userToken : null,
    factory : null,
    username : null,
    password : null,
    tokenString : null,
};

export const loginReducer = {
    login : (state = initialState, action) => {
        switch (action.type) {
            case types.LOGIN_SUCCESS: {
                return Object.assign({}, state, {userToken : action.token, tokenString: action.tokenString});
            }
            case types.LOGIN_FAILURE: {
                state.userToken = null;
                return Object.assign({}, state, {userToken : null, tokenString: null});
            }
            case types.SET_LOGIN_FACTORY: {
                return Object.assign({}, state, {factory : action.factory});
            }
            case types.SET_LOGIN_USERNAME: {
                return Object.assign({}, state, {username : action.username});
            }
            case types.SET_LOGIN_PASSWORD: {
                return Object.assign({}, state, {password : action.password});
            }
            default :
                return state;
        }
    },
};