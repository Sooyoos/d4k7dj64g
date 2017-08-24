import * as types from './types';

function fetchUserChecklists(login)
{
    return dispatch => {
        dispatch(userChecklistsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/checklist_instances", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(userChecklistsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => {console.log(error); dispatch(userChecklistsFailure()); });
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
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/checklists", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(checklistsTemplatesSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => {console.log(error); dispatch(checklistsTemplatesFailure()); });
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
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";
        let status = "done";
        let value = task.value;

        fetch(baseUrl + task["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : status, value : value})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(completeTaskSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => {console.log(error); dispatch(completeTaskFailure()); });
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

function fetchCompleteList(login, list)
{
    return dispatch => {
        dispatch(completeListRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";
        let status = "done";

        fetch(baseUrl + list["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : status})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(completeListSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => {console.log(error); dispatch(completeListFailure()); });
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

export function tryCompleteList(login, list)
{
    return (dispatch, getState) => {
        return dispatch(fetchCompleteList(login, list));
    }
}

function fetchAssignChecklists(login, task)
{
    return dispatch => {
        dispatch(assignChecklistsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/checklists_instance_tasks" + task["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status : "done", value : task.value})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(assignChecklistsSuccess());
            })
            .catch((error) => {console.log(error); dispatch(assignChecklistsFailure()); });
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

export function tryAssignChecklists(login, checklist, unit)
{
    return (dispatch, getState) => {
        return dispatch(fetchAssignChecklists(login, checklist, unit));
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