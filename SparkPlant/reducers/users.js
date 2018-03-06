import * as types from '../actions/types';

const initialState = {
    users : null,
    loggedUser : null,
    loading : false,
};

export const usersReducer = {
    users : (state = initialState, action) => {
        switch (action.type) {
            case types.USER_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_USER_SUCCESS: {
                return Object.assign({}, state, {loggedUser : action.user, loading : false});
            }
            case types.GET_USER_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.SET_AVAILABILITY_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.SET_AVAILABILITY_SUCCESS: {
                return Object.assign({}, state, {loggedUser : action.user, loading : false});
            }
            case types.SET_AVAILABILITY_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.RESET_USERS: {
                return Object.assign({}, state, initialState);
            }
            default :
                return state;
        }
    },
};