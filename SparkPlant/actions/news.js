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

        fetch(baseUrl + "/news?published=true", {
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

function fetchWaitingNews(login)
{
    return dispatch => {
        dispatch(waitingNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/news?published=false", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(waitingNewsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(waitingNewsFailure()); });
    }
}

function waitingNewsRequested()
{
    return {
        type : types.WAITING_NEWS_REQUESTED,
    }
}

function waitingNewsSuccess(news)
{
    return {
        type : types.WAITING_NEWS_SUCCESS,
        news : news,
    }
}

function waitingNewsFailure()
{
    return {
        type : types.WAITING_NEWS_FAILURE,
    }
}

export function tryWaitingNews(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchWaitingNews(login));
    }
}

function fetchPublishNews(login, news)
{
    return dispatch => {
        dispatch(publishNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + news["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
            body : JSON.stringify(
                {
                    published : true,
                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(publishNewsSuccess(responseJson));
            })
            .catch((error) => { dispatch(publishNewsFailure()); });
    }
}

function publishNewsRequested()
{
    return {
        type : types.PUBLISH_NEWS_REQUESTED,
    }
}

function publishNewsSuccess(news)
{
    return {
        type : types.PUBLISH_NEWS_SUCCESS,
        news : news,
    }
}

function publishNewsFailure()
{
    return {
        type : types.PUBLISH_NEWS_FAILURE,
    }
}

export function tryPublishNews(login, news)
{
    return (dispatch, getState) => {
        return dispatch(fetchPublishNews(login, news));
    }
}

function fetchTransferNews(login, news)
{
    return dispatch => {
        dispatch(transferNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + news["@id"] + "/transfer", {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(
                {

                }
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(transferNewsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.log(error); dispatch(transferNewsFailure()); });
    }
}

function transferNewsRequested()
{
    return {
        type : types.TRANSFER_NEWS_REQUESTED,
    }
}

function transferNewsSuccess(news)
{
    return {
        type : types.TRANSFER_NEWS_SUCCESS,
        news : news,
    }
}

function transferNewsFailure()
{
    return {
        type : types.TRANSFER_NEWS_FAILURE,
    }
}

export function tryTransferNews(login, news)
{
    return (dispatch, getState) => {
        return dispatch(fetchTransferNews(login, news));
    }
}

function fetchDeleteNews(login, news)
{
    return dispatch => {
        dispatch(deleteNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + news["@id"], {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((responseJson) => {
                dispatch(deleteNewsSuccess(responseJson));
            })
            .catch((error) => { dispatch(deleteNewsFailure()); });
    }
}

function deleteNewsRequested()
{
    return {
        type : types.DELETE_NEWS_REQUESTED,
    }
}

function deleteNewsSuccess(news)
{
    return {
        type : types.DELETE_NEWS_SUCCESS,
        news : news,
    }
}

function deleteNewsFailure()
{
    return {
        type : types.DELETE_NEWS_FAILURE,
    }
}

export function tryDeleteNews(login, news)
{
    return (dispatch, getState) => {
        return dispatch(fetchDeleteNews(login, news));
    }
}

export function prepareNews(news)
{
    return {
        type : types.PREPARE_NEWS,
        news : news,
    }
}

function fetchCreateNews(login, news)
{
    return dispatch => {
        dispatch(createNewsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + "/news", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
            body : JSON.stringify(news)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(createNewsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(createNewsFailure()); });
    }
}

function createNewsRequested()
{
    return {
        type : types.CREATE_NEWS_REQUESTED,
    }
}

function createNewsSuccess(news)
{
    return {
        type : types.CREATE_NEWS_SUCCESS,
        news : news,
    }
}

function createNewsFailure()
{
    return {
        type : types.CREATE_NEWS_FAILURE,
    }
}

export function tryCreateNews(login, news)
{
    return (dispatch, getState) => {
        return dispatch(fetchCreateNews(login, news));
    }
}