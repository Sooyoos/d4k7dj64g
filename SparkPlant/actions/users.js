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

function fetchSetAvailability(login, user, availability)
{
    console.log(availability);
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
                console.log(responseJson);
                dispatch(setAvailabilitySuccess(responseJson));
            })
            .catch((error) => { console.log(error); dispatch(setAvailabilityFailure()); });
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