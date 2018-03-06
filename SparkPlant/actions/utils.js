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


function fetchPlaces(login)
{
    return dispatch => {
        dispatch(placesRequested());

        fetch(types.baseUrl + "/places", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(placesSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(placesFailure()); });
    }
}

function placesRequested()
{
    return {
        type : types.PLACES_REQUESTED,
    }
}

function placesSuccess(places)
{
    return {
        type : types.GET_PLACES_SUCCESS,
        places : places,
    }
}

function placesFailure()
{
    return {
        type : types.GET_PLACES_FAILURE,
    }
}

export function tryPlaces(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchPlaces(login));
    }
}

export function setCurrentImage(image)
{
    return {
        type : types.SET_CURRENT_IMAGE,
        image : image,
    }
}