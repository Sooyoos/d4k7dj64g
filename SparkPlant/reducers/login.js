import * as types from '../actions/types';
const initialState = {
    userToken : null,
    factory : null,
    username : null,
    password : null,
    tokenString : null,
    loading : false,
    previousUsers : [

    ],
    error : null,
};

export const loginReducer = {
    login : (state = initialState, action) => {
        switch (action.type) {
            case types.LOGIN_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.LOGIN_SUCCESS: {
                return Object.assign({}, state, {userToken : action.token, tokenString: action.tokenString, loading :false});
            }
            case types.LOGIN_FAILURE: {
                state.userToken = null;
                return Object.assign({}, state, {userToken : null, tokenString: null, loading : false, error : "Identifiants incorrects"});
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
            case types.PREVIOUS_LOGIN_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.PREVIOUS_LOGIN_SUCCESS: {
                return Object.assign({}, state, {previousUsers: action.previousUsers, loading :false});
            }
            case types.PREVIOUS_LOGIN_FAILURE: {
                state.userToken = null;
                return Object.assign({}, state, {previousUsers : [], loading : false});
            }
            case types.LOGOUT: {
                state.userToken = null;
                return Object.assign({}, state, {tokenString : null, loading : false});
            }
            default :
                return state;
        }
    },
};