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
        media : null,
    }
};

export const newsReducer = {
    news : (state = initialState, action) => {
        switch (action.type) {
            case types.SET_CURRENT_NEWS: {
                return Object.assign({}, state, {currentNews : action.news});
            }
            case types.USER_NEWS_SUCCESS: {
                return Object.assign({}, state, {news : action.news});
            }
            case types.USER_NEWS_FAILURE: {
                return Object.assign({}, state, {news : null});
            }
            case types.WAITING_NEWS_SUCCESS: {
                return Object.assign({}, state, {waitingNews : action.news});
            }
            case types.WAITING_NEWS_FAILURE: {
                return Object.assign({}, state, {waitingNews : null});
            }
            case types.PUBLISH_NEWS_SUCCESS: {
                return state;
            }
            case types.PUBLISH_NEWS_FAILURE: {
                return state;
            }
            case types.TRANSFER_NEWS_SUCCESS: {
                return state;
            }
            case types.TRANSFER_NEWS_FAILURE: {
                return state;
            }
            case types.DELETE_NEWS_SUCCESS: {
                return state;
            }
            case types.DELETE_NEWS_FAILURE: {
                return state;
            }
            case types.PREPARE_NEWS: {
                let creationCurrent = Object.assign({}, state.creation_current, action.news);
                return Object.assign({}, state, {creation_current : creationCurrent});
            }
            case types.CREATE_NEWS_SUCCESS: {
                return Object.assign({}, state, {creation_current : null});
            }
            case types.CREATE_NEWS_FAILURE: {
                return state;
            }
            default :
                return state;
        }
    },
};