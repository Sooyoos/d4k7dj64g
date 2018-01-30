import * as types from '../actions/types';

const initialState = {
    checklists : null,
    templates : null,
    currentChecklist : null,
    currentTemplate : null,
    checklistHistory : null,
    fullChecklistHistory : null,
    currentHistory : null,
    currentInstance : null,
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
            case types.RESET_TASK_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.RESET_TASK_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.RESET_TASK_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.COMPLETE_LIST_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.COMPLETE_LIST_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.COMPLETE_LIST_FAILURE: {
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
            case types.CHECKLIST_HISTORY_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.CHECKLIST_HISTORY_SUCCESS: {
                return Object.assign({}, state, {checklistHistory: action.history, loading : false});
            }
            case types.CHECKLIST_HISTORY_FAILURE: {
                return Object.assign({}, state, {checklistHistory: null, loading : false});
            }
            case types.FULL_CHECKLIST_HISTORY_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.FULL_CHECKLIST_HISTORY_SUCCESS: {
                return Object.assign({}, state, {fullChecklistHistory: action.history, loading : false});
            }
            case types.FULL_CHECKLIST_HISTORY_FAILURE: {
                return Object.assign({}, state, {fullChecklistHistory: null, loading : false});
            }
            case types.SET_CURRENT_CHECKLIST: {
                return Object.assign({}, state, {currentChecklist : action.checklist});
            }
            case types.SET_CURRENT_HISTORY: {
                return Object.assign({}, state, {currentHistory : action.item});
            }
            case types.SET_CURRENT_TEMPLATE: {
                return Object.assign({}, state, {currentTemplate : action.template});
            }
            case types.DELETE_USER_CHECKLIST_REQUESTED: {
                return Object.assign({}, state, { loading : true });
            }
            case types.DELETE_USER_CHECKLIST_SUCCESS: {
                return Object.assign({}, state, { loading : false });
            }
            case types.DELETE_USER_CHECKLIST_FAILURE: {
                return Object.assign({}, state, { loading : false });
            }
            case types.CREATE_USER_CHECKLIST_REQUESTED: {
                return Object.assign({}, state, { loading : true });
            }
            case types.CREATE_USER_CHECKLIST_SUCCESS: {
                return Object.assign({}, state, { loading : false });
            }
            case types.CREATE_USER_CHECKLIST_FAILURE: {
                return Object.assign({}, state, { loading : false });
            }
            case types.CREATE_CHECKLIST_INSTANCE_REQUESTED: {
                return Object.assign({}, state, { loading : true });
            }
            case types.CREATE_CHECKLIST_INSTANCE_SUCCESS: {
                return Object.assign({}, state, { loading : false, currentInstance: action.instance });
            }
            case types.CREATE_CHECKLIST_INSTANCE_FAILURE: {
                return Object.assign({}, state, { loading : false, currentInstance: null });
            }
            case types.UPDATE_CHECKLIST_INSTANCE_REQUESTED: {
                return Object.assign({}, state, { loading : true });
            }
            case types.UPDATE_CHECKLIST_INSTANCE_SUCCESS: {
                return Object.assign({}, state, { loading : false, currentInstance: null });
            }
            case types.UPDATE_CHECKLIST_INSTANCE_FAILURE: {
                return Object.assign({}, state, { loading : false});
            }
            case types.UPDATE_CHECKLIST_INSTANCE_TASK_REQUESTED: {
                return Object.assign({}, state, { loading : true });
            }
            case types.UPDATE_CHECKLIST_INSTANCE_TASK_SUCCESS: {
                let tasks = state.currentInstance.checklistInstanceTasks;
                tasks[action.index] = action.task;
                let currentInstance = Object.assign({}, state.currentInstance, { checklistInstanceTasks : tasks });
                return Object.assign({}, state, { loading : false, currentInstance : currentInstance });
            }
            case types.UPDATE_CHECKLIST_INSTANCE_TASK_FAILURE: {
                return Object.assign({}, state, { loading : false });
            }
            case types.RESET_CHECKLISTS: {
                return Object.assign({}, state, initialState);
            }
            default :
                return state;
        }
    },
};