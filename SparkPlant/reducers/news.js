import * as types from '../actions/types';
const initialState = {
    news : null,
    waitingNews : null,
    currentNews : null,
    creation_current : {
        title : null,
        content : null,
        visibility : null,
        unit : null,
        media : [

        ],
    }
};

export const newsReducer = {
    news : (state = initialState, action) => {
        switch (action.type) {
            case types.SET_CURRENT_NEWS: {
                return Object.assign({}, state, {currentNews : action.news});
            }
            default :
                return state;
        }
    },
};