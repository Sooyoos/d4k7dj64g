import * as types from '../actions/types';
const initialState = {
    units : null,
};

export const utilsReducer = {
    utils : (state = initialState, action) => {
        switch (action.type) {
            case types.GET_UNITS_SUCCESS: {
                return Object.assign({}, state, {units : action.units});
            }
            case types.GET_UNITS_FAILURE: {
                return state;
            }
            default :
                return state;
        }
    },
};