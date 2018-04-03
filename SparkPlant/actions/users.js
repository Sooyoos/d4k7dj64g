import * as types from './types';
import { storeLogin } from './login';
import { tryUserNews } from "./news";

function isResponsable(user)
{
    let roles = user.rolesByUnit;

    for(var i = 0; i < roles.length; i++)
    {
        if(roles[i].role.title === "Responsable")
        {
            return true;
        }
    }

    return false;
}

function fetchUserById(login, user)
{
    return dispatch => {
        dispatch(userByIdRequested());

        fetch(types.baseUrl + user["@id"], {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(userByIdSuccess(responseJson));
            })
            .catch((error) => { console.error(error); dispatch(userByIdFailure()); });
    }
}

function userByIdRequested()
{
    return {
        type : types.USER_REQUESTED,
    }
}

function userByIdSuccess(user)
{
    return {
        type : types.GET_USER_SUCCESS,
        user : user,
    }
}

function userByIdFailure()
{
    return {
        type : types.GET_USER_FAILURE,
    }
}

export function tryUserById(login, user)
{
    return (dispatch, getState) => {
        return dispatch(fetchUserById(login, user));
    }
}

function fetchUser(token, tokenString, data)
{
    return dispatch => {
        dispatch(userRequested());

        fetch(types.baseUrl + token["@id"], {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let info = Object.assign({}, data, {responsable : isResponsable(responseJson)});
                storeLogin(info);
                dispatch(tryUserNews({ tokenString : tokenString }, responseJson));
                dispatch(userSuccess(responseJson));
            })
            .catch((error) => { console.error(error); dispatch(userFailure()); });
    }
}

function userRequested()
{
    return {
        type : types.USER_REQUESTED,
    }
}

function userSuccess(user)
{
    return {
        type : types.GET_USER_SUCCESS,
        user : user,
    }
}

function userFailure()
{
    return {
        type : types.GET_USER_FAILURE,
    }
}

export function tryUser(token, tokenString, data)
{
    return (dispatch, getState) => {
        return dispatch(fetchUser(token, tokenString, data));
    }
}

function fetchUserActions(user, login)
{
    return dispatch => {
        dispatch(userRequested());

        fetch(types.baseUrl + user["@id"] + "/actions", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(userActionsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.error(error); dispatch(userActionsFailure()); });
    }
}

function userActionsRequested()
{
    return {
        type : types.USER_ACTIONS_REQUESTED,
    }
}

function userActionsSuccess(actions)
{
    return {
        type : types.USER_ACTIONS_SUCCESS,
        actions : actions,
    }
}

function userActionsFailure()
{
    return {
        type : types.USER_ACTIONS_FAILURE,
    }
}

export function tryUserActions(user, login)
{
    return (dispatch, getState) => {
        return dispatch(fetchUserActions(user, login));
    }
}

function fetchSetAvailability(login, user, availability)
{
    return dispatch => {
        dispatch(setAvailabilityRequested());

        fetch(types.baseUrl + user["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                available : availability,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setAvailabilitySuccess(responseJson));
            })
            .catch((error) => { dispatch(setAvailabilityFailure()); });
    }
}

function setAvailabilityRequested()
{
    return {
        type : types.SET_AVAILABILITY_REQUESTED,
    }
}

function setAvailabilitySuccess(user)
{
    return {
        type : types.SET_AVAILABILITY_SUCCESS,
        user : user,
    }
}

function setAvailabilityFailure()
{
    return {
        type : types.SET_AVAILABILITY_FAILURE,
    }
}

export function trySetAvailability(login, user, availability)
{
    return (dispatch, getState) => {
        return dispatch(fetchSetAvailability(login, user, availability));
    }
}