import * as types from './types';

function fetchUser(token, tokenString)
{
    return dispatch => {
        dispatch(userRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + token["@id"], {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(userSuccess(responseJson));
            })
            .catch((error) => { dispatch(userFailure()); });
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

export function tryUser(token, tokenString)
{
    return (dispatch, getState) => {
        return dispatch(fetchUser(token, tokenString));
    }
}