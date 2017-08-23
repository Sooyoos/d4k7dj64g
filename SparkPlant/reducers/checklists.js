import * as types from '../actions/types';

const initialState = {
    checklists : null,
    templates : null,
    currentChecklist : null,
    currentTemplate : null,
    loading : false,
};

export const checklistsReducer = {
    checklists : (state = initialState, action) => {
        switch (action.type) {
            case types.USER_CHECKLISTS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.USER_CHECKLISTS_SUCCESS: {
                return Object.assign({}, state, {checklists : action.checklists, loading : false});
            }
            case types.USER_CHECKLISTS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.CHECKLISTS_TEMPLATES_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.CHECKLISTS_TEMPLATES_SUCCESS: {
                return Object.assign({}, state, {templates : action.templates, loading : false});
            }
            case types.CHECKLISTS_TEMPLATES_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.COMPLETE_TASK_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.COMPLETE_TASK_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.COMPLETE_TASK_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.ASSIGN_CHECKLISTS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.ASSIGN_CHECKLISTS_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.ASSIGN_CHECKLISTS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.SET_CURRENT_CHECKLIST: {
                return Object.assign({}, state, {currentChecklist : action.checklist});
            }
            case types.SET_CURRENT_TEMPLATE: {
                return Object.assign({}, state, {currentTemplate : action.template});
            }
            default :
                return state;
        }
    },
};