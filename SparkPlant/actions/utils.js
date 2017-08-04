import * as types from './types';

function fetchUnits(login)
{
    return dispatch => {
        dispatch(unitsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/units", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
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

function fetchUploadMedia(login, file)
{
    return dispatch => {
        dispatch(uploadMediaRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com/upload";
        let body = new FormData();

        body.append("file", file);

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'multipart/form-data',
            },
            body : body,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(uploadMediaSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.log(error); dispatch(uploadMediaFailure()); });
    }
}

function uploadMediaRequested()
{
    return {
        type : types.UPLOAD_MEDIA_REQUESTED,
    }
}

function uploadMediaSuccess(media)
{
    return {
        type : types.UPLOAD_MEDIA_SUCCESS,
        media : media,
    }
}

function uploadMediaFailure()
{
    return {
        type : types.UPLOAD_MEDIA_FAILURE,
    }
}

export function tryUploadMedia(login, file)
{
    return (dispatch, getState) => {
        return dispatch(fetchUploadMedia(login, file));
    }
}