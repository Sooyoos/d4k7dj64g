import * as types from '../actions/types';
const initialState = {
    units : null,
    places : null,
    currentImage : null,
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
            case types.GET_PLACES_SUCCESS: {
                return Object.assign({}, state, {places : action.places});
            }
            case types.GET_PLACES_FAILURE: {
                return state;
            }
            case types.UPLOAD_MEDIA_SUCCESS: {
                return state;
            }
            case types.UPLOAD_MEDIA_FAILURE: {
                return state;
            }
            case types.RESET_UTILS: {
                return Object.assign({}, state, initialState);
            }
            case types.SET_CURRENT_IMAGE: {
                return Object.assign({}, state, {currentImage : action.image});
            }
            default :
                return state;
        }
    },
};