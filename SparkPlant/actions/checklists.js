import * as types from './types';

function fetchUserChecklists(login)
{
    return dispatch => {
        dispatch(userChecklistsRequested());

        fetch(types.baseUrl + "/checklist_instances", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(userChecklistsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(userChecklistsFailure()); });
    }
}

function userChecklistsRequested()
{
    return {
        type : types.USER_CHECKLISTS_REQUESTED,
    }
}

function userChecklistsSuccess(checklists)
{
    return {
        type : types.USER_CHECKLISTS_SUCCESS,
        checklists : checklists,
    }
}

function userChecklistsFailure()
{
    return {
        type : types.USER_CHECKLISTS_FAILURE,
    }
}

export function tryUserChecklists(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchUserChecklists(login));
    }
}

function fetchChecklistsTemplates(login)
{
    return dispatch => {
        dispatch(checklistsTemplatesRequested());

        fetch(types.baseUrl + "/checklists", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(checklistsTemplatesSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(checklistsTemplatesFailure()); });
    }
}

function checklistsTemplatesRequested()
{
    return {
        type : types.CHECKLISTS_TEMPLATES_REQUESTED,
    }
}

function checklistsTemplatesSuccess(templates)
{
    return {
        type : types.CHECKLISTS_TEMPLATES_SUCCESS,
        templates : templates,
    }
}

function checklistsTemplatesFailure()
{
    return {
        type : types.CHECKLISTS_TEMPLATES_FAILURE,
    }
}

export function tryChecklistsTemplates(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchChecklistsTemplates(login));
    }
}

function fetchCompleteTask(login, task)
{
    return dispatch => {
        dispatch(completeTaskRequested());
        let status = "done";
        let value = task.value;

        fetch(types.baseUrl + task["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : status, value : value})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(completeTaskSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(completeTaskFailure()); });
    }
}

function completeTaskRequested()
{
    return {
        type : types.COMPLETE_TASK_REQUESTED,
    }
}

function completeTaskSuccess(task)
{
    return {
        type : types.COMPLETE_TASK_SUCCESS,
        task : task,
    }
}

function completeTaskFailure()
{
    return {
        type : types.COMPLETE_TASK_FAILURE,
    }
}

export function tryCompleteTask(login, task)
{
    return (dispatch, getState) => {
        return dispatch(fetchCompleteTask(login, task));
    }
}

function fetchResetTask(login, task)
{
    return dispatch => {
        dispatch(resetTaskRequested());
        let status = "todo";
        let value = null;

        fetch(types.baseUrl + task["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : status, value : value})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(resetTaskSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(resetTaskFailure()); });
    }
}

function resetTaskRequested()
{
    return {
        type : types.RESET_TASK_REQUESTED,
    }
}

function resetTaskSuccess(task)
{
    return {
        type : types.RESET_TASK_SUCCESS,
        task : task,
    }
}

function resetTaskFailure()
{
    return {
        type : types.RESET_TASK_FAILURE,
    }
}

export function tryResetTask(login, task)
{
    return (dispatch, getState) => {
        return dispatch(fetchResetTask(login, task));
    }
}

function fetchCompleteList(login, list, status)
{
    return dispatch => {
        dispatch(completeListRequested());

        fetch(types.baseUrl + list["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : status})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(completeListSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(completeListFailure()); });
    }
}

function completeListRequested()
{
    return {
        type : types.COMPLETE_LIST_REQUESTED,
    }
}

function completeListSuccess(list)
{
    return {
        type : types.COMPLETE_LIST_SUCCESS,
        list : list,
    }
}

function completeListFailure()
{
    return {
        type : types.COMPLETE_LIST_FAILURE,
    }
}

export function tryCompleteList(login, list, status)
{
    return (dispatch, getState) => {
        return dispatch(fetchCompleteList(login, list, status));
    }
}

function fetchAssignChecklists(login, instance)
{
    return dispatch => {
        dispatch(assignChecklistsRequested());

        fetch(types.baseUrl + "/checklist_instances", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(instance)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(assignChecklistsSuccess());
            })
            .catch((error) => { dispatch(assignChecklistsFailure()); });
    }
}

function assignChecklistsRequested()
{
    return {
        type : types.ASSIGN_CHECKLISTS_REQUESTED,
    }
}

function assignChecklistsSuccess()
{
    return {
        type : types.ASSIGN_CHECKLISTS_SUCCESS,
    }
}

function assignChecklistsFailure()
{
    return {
        type : types.ASSIGN_CHECKLISTS_FAILURE,
    }
}

export function tryAssignChecklists(login, instance)
{
    return (dispatch, getState) => {
        return dispatch(fetchAssignChecklists(login, instance));
    }
}

export function setCurrentChecklist(checklist)
{
    return {
        type : types.SET_CURRENT_CHECKLIST,
        checklist : checklist,
    }
}

export function setCurrentTemplate(template)
{
    return {
        type : types.SET_CURRENT_TEMPLATE,
        template : template,
    }
}