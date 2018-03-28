import * as types from './types';
import { goToChecklistExecute, goToChecklistPage } from "./navigation/checklists";

function fetchUserChecklists(login)
{
    return dispatch => {
        dispatch(userChecklistsRequested());

        fetch(types.baseUrl + login.userToken["@id"] + "/checklists?order[checklist.name]=asc", {
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

        fetch(types.baseUrl + "/checklists?order[name]=asc", {
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

export function setCurrentHistory(item)
{
    return {
        type : types.SET_CURRENT_HISTORY,
        item : item,
    }
}

function fetchChecklistHistory(login, checklist)
{
    return dispatch => {
        dispatch(fetchChecklistHistoryRequested());

        fetch(types.baseUrl + "/checklist_instances?checklist.id=" + checklist["@id"] + "&itemsPerPage=3&order[createdAt]=desc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(fetchChecklistHistorySuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.error(error); dispatch(fetchChecklistHistoryFailure()); });
    }
}

function fetchChecklistHistoryRequested()
{
    return {
        type : types.CHECKLIST_HISTORY_REQUESTED,
    }
}

function fetchChecklistHistorySuccess(history)
{
    return {
        type : types.CHECKLIST_HISTORY_SUCCESS,
        history : history,
    }
}

function fetchChecklistHistoryFailure()
{
    return {
        type : types.CHECKLIST_HISTORY_FAILURE,
    }
}

export function tryChecklistHistory(login, checklist)
{
    return (dispatch, getState) => {
        return dispatch(fetchChecklistHistory(login, checklist));
    }
}

function fetchDeleteUserChecklist(login, checklist)
{
    return dispatch => {
        dispatch(fetchDeleteUserChecklistRequested());

        fetch(types.baseUrl + checklist["@id"], {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
        })
            .then((responseJson) => {
                dispatch(fetchDeleteUserChecklistSuccess(checklist["@id"]));
            })
            .catch((error) => { console.error(error); dispatch(fetchDeleteUserChecklistFailure()); });
    }
}

function fetchDeleteUserChecklistRequested()
{
    return {
        type : types.DELETE_USER_CHECKLIST_REQUESTED,
    }
}

function fetchDeleteUserChecklistSuccess(id)
{
    return {
        type : types.DELETE_USER_CHECKLIST_SUCCESS,
        id : id,
    }
}

function fetchDeleteUserChecklistFailure()
{
    return {
        type : types.DELETE_USER_CHECKLIST_FAILURE,
    }
}

export function tryDeleteUserChecklist(login, checklist)
{
    return (dispatch, getState) => {
        return dispatch(fetchDeleteUserChecklist(login, checklist));
    }
}

function fetchCreateUserChecklist(login, checklist, user)
{
    return dispatch => {
        dispatch(fetchCreateUserChecklistRequested());

        fetch(types.baseUrl + "/user_checklists", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                user : user["@id"],
                checklist : checklist["@id"],
            })
        })
            .then((response) => {})
            .then((responseJson) => {
                dispatch(fetchCreateUserChecklistSuccess());
            })
            .catch((error) => { dispatch(fetchCreateUserChecklistFailure()); });
    }
}

function fetchCreateUserChecklistRequested()
{
    return {
        type : types.CREATE_USER_CHECKLIST_REQUESTED,
    }
}

function fetchCreateUserChecklistSuccess()
{
    return {
        type : types.CREATE_USER_CHECKLIST_SUCCESS,
    }
}

function fetchCreateUserChecklistFailure()
{
    return {
        type : types.CREATE_USER_CHECKLIST_FAILURE,
    }
}

export function tryCreateUserChecklist(login, checklist, user)
{
    return (dispatch, getState) => {
        return dispatch(fetchCreateUserChecklist(login, checklist, user));
    }
}


function fetchCreateChecklistInstance(login, checklist, user, navState)
{
    return dispatch => {
        dispatch(fetchCreateChecklistInstanceRequested());

        fetch(types.baseUrl + "/checklist_instances", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                user : user["@id"],
                checklist : checklist["@id"],
                successRate : 0,
                saved : "false",
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(fetchCreateChecklistInstanceSuccess(responseJson));
                dispatch(goToChecklistExecute(navState));
            })
            .catch((error) => { console.error(error); dispatch(fetchCreateChecklistInstanceFailure()); });
    }
}

function fetchCreateChecklistInstanceRequested()
{
    return {
        type : types.CREATE_CHECKLIST_INSTANCE_REQUESTED,
    }
}

function fetchCreateChecklistInstanceSuccess(instance)
{
    return {
        type : types.CREATE_CHECKLIST_INSTANCE_SUCCESS,
        instance : instance,
    }
}

function fetchCreateChecklistInstanceFailure()
{
    return {
        type : types.CREATE_CHECKLIST_INSTANCE_FAILURE,
    }
}

export function tryCreateChecklistInstance(login, checklist, user, navState)
{
    return (dispatch, getState) => {
        return dispatch(fetchCreateChecklistInstance(login, checklist, user, navState));
    }
}

function fetchUpdateChecklistInstance(login, navState, checklist)
{
    return dispatch => {
        dispatch(fetchUpdateChecklistInstanceRequested());

        fetch(types.baseUrl + checklist["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(checklist)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(fetchUpdateChecklistInstanceSuccess(responseJson));
                dispatch(goToChecklistPage(navState));
            })
            .catch((error) => { console.error(error); dispatch(fetchUpdateChecklistInstanceFailure()); });
    }
}

function fetchUpdateChecklistInstanceRequested()
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_REQUESTED,
    }
}

function fetchUpdateChecklistInstanceSuccess(instance)
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_SUCCESS,
        instance : instance,
    }
}

function fetchUpdateChecklistInstanceFailure()
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_FAILURE,
    }
}

export function tryUpdateChecklistInstance(login, navState, checklist)
{
    return (dispatch, getState) => {
        return dispatch(fetchUpdateChecklistInstance(login, navState, checklist));
    }
}


function fetchUpdateChecklistInstanceTask(login, index, task)
{
    return dispatch => {
        dispatch(fetchUpdateChecklistInstanceTaskRequested());

        fetch(types.baseUrl + task["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(task)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(fetchUpdateChecklistInstanceTaskSuccess(index, responseJson));
            })
            .catch((error) => { dispatch(fetchUpdateChecklistInstanceTaskFailure()); });
    }
}

function fetchUpdateChecklistInstanceTaskRequested()
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_TASK_REQUESTED,
    }
}

function fetchUpdateChecklistInstanceTaskSuccess(index, task)
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_TASK_SUCCESS,
        index : index,
        task : task,
    }
}

function fetchUpdateChecklistInstanceTaskFailure()
{
    return {
        type : types.UPDATE_CHECKLIST_INSTANCE_TASK_FAILURE,
    }
}

export function tryUpdateChecklistInstanceTask(login, index,  task)
{
    return (dispatch, getState) => {
        return dispatch(fetchUpdateChecklistInstanceTask(login, index, task));
    }
}

function fetchFullChecklistHistory(login)
{
    return dispatch => {
        dispatch(fetchFullChecklistHistoryRequested());

        fetch(types.baseUrl + "/checklist_instances?order[createdAt]=desc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(fetchFullChecklistHistorySuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.error(error); dispatch(fetchFullChecklistHistoryFailure()); });
    }
}

function fetchFullChecklistHistoryRequested()
{
    return {
        type : types.FULL_CHECKLIST_HISTORY_REQUESTED,
    }
}

function fetchFullChecklistHistorySuccess(history)
{
    return {
        type : types.FULL_CHECKLIST_HISTORY_SUCCESS,
        history : history,
    }
}

function fetchFullChecklistHistoryFailure()
{
    return {
        type : types.FULL_CHECKLIST_HISTORY_FAILURE,
    }
}

export function tryFullChecklistHistory(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchFullChecklistHistory(login));
    }
}

function fetchDeleteChecklistInstance(login, navState, instance)
{
    return dispatch => {
        dispatch(fetchDeleteChecklistInstanceRequested());

        fetch(types.baseUrl + instance["@id"], {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                dispatch(fetchDeleteChecklistInstanceSuccess());
                dispatch(goToChecklistPage(navState));
            })
            .catch((error) => { console.error(error); dispatch(fetchDeleteChecklistInstanceFailure()); });
    }
}

function fetchDeleteChecklistInstanceRequested()
{
    return {
        type : types.DELETE_CHECKLIST_INSTANCE_REQUESTED,
    }
}

function fetchDeleteChecklistInstanceSuccess()
{
    return {
        type : types.DELETE_CHECKLIST_INSTANCE_SUCCESS,
    }
}

function fetchDeleteChecklistInstanceFailure()
{
    return {
        type : types.DELETE_CHECKLIST_INSTANCE_FAILURE,
    }
}

export function tryDeleteChecklistInstance(login, navState, instance)
{
    return (dispatch, getState) => {
        return dispatch(fetchDeleteChecklistInstance(login, navState, instance));
    }
}

export function filterChecklist(place)
{
    return {
        type : types.FILTER_CHECKLIST,
        place : place,
    }
}