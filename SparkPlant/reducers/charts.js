import * as types from '../actions/types';
const initialState = {
    solvedTags : null,
    unsolvedTags : null,
    loading : false,
};

export const chartsReducer = {
    charts : (state = initialState, action) => {
        switch (action.type) {
            case types.SOLVED_TAGS_REQUESTED: {
                return Object.assign({}, state, {
                    solvedTags : [],
                    unsolvedTags: [],
                    loading: true,
                });
            }
            case types.SOLVED_TAGS_SUCCESS: {
                return Object.assign({}, state, {
                    solvedTags : action.tags,
                    loading: false,
                });
            }
            case types.SOLVED_TAGS_ERROR: {
                return Object.assign({}, state, {
                    solvedTags : [],
                    loading: false,
                });
            }
            case types.UNSOLVED_TAGS_REQUESTED: {
                return Object.assign({}, state, {
                    unsolvedTags: [],
                    loading: true,
                });
            }
            case types.UNSOLVED_TAGS_SUCCESS: {
                return Object.assign({}, state, {
                    unsolvedTags: action.tags,
                    loading: false,
                });
            }
            case types.UNSOLVED_TAGS_ERROR: {
                return Object.assign({}, state, {
                    unsolvedTags: [],
                    loading: false,
                });
            }
            case types.RESET_CHARTS: {
                return Object.assign({}, state, initialState);
            }
            default :
                return state;
        }
    },
};