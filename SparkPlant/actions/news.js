import * as types from './types';

export function setCurrentNews(news)
{
    return {
        type : types.SET_CURRENT_NEWS,
        news : news,
    }
}

function fetchUserNews(login)
{
    return dispatch => {
        dispatch(userNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/news", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson);
                dispatch(userNewsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(userNewsFailure()); });
    }
}

function userNewsRequested()
{
    return {
        type : types.USER_NEWS_REQUESTED,
    }
}

function userNewsSuccess(news)
{
    return {
        type : types.USER_NEWS_SUCCESS,
        news : news,
    }
}

function userNewsFailure()
{
    return {
        type : types.USER_NEWS_FAILURE,
    }
}

export function tryUserNews(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchUserNews(login));
    }
}