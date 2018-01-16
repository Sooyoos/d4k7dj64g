import * as types from './types';

function fetchUnits(login)
{
    return dispatch => {
        dispatch(unitsRequested());

        fetch(types.baseUrl + "/units", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(unitsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(unitsFailure()); });
    }
}

function unitsRequested()
{
    return {
        type : types.UNITS_REQUESTED,
    }
}

function unitsSuccess(units)
{
    return {
        type : types.GET_UNITS_SUCCESS,
        units : units,
    }
}

function unitsFailure()
{
    return {
        type : types.GET_UNITS_FAILURE,
    }
}

export function tryUnits(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchUnits(login));
    }
}