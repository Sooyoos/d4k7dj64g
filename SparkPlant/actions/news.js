import * as types from './types';
import * as utils from './utils';
import {tryUploadMedia} from "./utils";

export function setCurrentNews(news)
{
    return {
        type : types.SET_CURRENT_NEWS,
        news : news,
    }
}

function fetchNews(login, data)
{
    return dispatch => {
        dispatch(newsRequested());

        fetch(types.baseUrl + data["@id"], {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(newsSuccess(responseJson));
            })
            .catch((error) => { dispatch(newsFailure()); });
    }
}

function newsRequested()
{
    return {
        type : types.NEWS_REQUESTED,
    }
}

function newsSuccess(news)
{
    return {
        type : types.NEWS_SUCCESS,
        news : news,
    }
}

function newsFailure()
{
    return {
        type : types.NEWS_FAILURE,
    }
}

export function tryNews(login, data)
{
    return (dispatch, getState) => {
        return dispatch(fetchNews(login, data));
    }
}

function fetchUserNews(login, user)
{
    return dispatch => {
        dispatch(userNewsRequested());

        let unit_ids = [];

        for(var i = 0; i < user.rolesByUnit.length; i++)
        {
            if(!unit_ids.includes(user.rolesByUnit[i].unit["@id"]))
            {
                unit_ids.push(user.rolesByUnit[i].unit["@id"]);
            }
        }

        fetch(types.baseUrl + "/news", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let list = responseJson["hydra:member"];
                let news = [];
                let ids = [];

                for(var i = 0; i < list.length; i++)
                {
                    if(list[i].published === true && list[i].previousUnit === null)
                    {
                        if(!ids.includes(list[i]["@id"]))
                        {
                            news.push(list[i]);
                            ids.push(list[i]["@id"])
                        }
                    }
                    else if(list[i].publishedBySupervisor === true && list[i].previousUnit !== null)
                    {
                        if(!ids.includes(list[i]["@id"]))
                        {
                            news.push(list[i]);
                            ids.push(list[i]["@id"])
                        }
                    }
                    else if(list[i].publishedBySupervisor === false && list[i].previousUnit !== null && unit_ids.includes(list[i].previousUnit["@id"]))
                    {
                        if(!ids.includes(list[i]["@id"]))
                        {
                            news.push(list[i]);
                            ids.push(list[i]["@id"])
                        }
                    }
                }

                dispatch(userNewsSuccess(news));
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

export function tryUserNews(login, user)
{
    return (dispatch, getState) => {
        return dispatch(fetchUserNews(login, user));
    }
}

function fetchWaitingNews(login, user)
{
    return dispatch => {
        dispatch(waitingNewsRequested());

        let unit_ids = [];

        for(var i = 0; i < user.rolesByUnit.length; i++)
        {
            if(!unit_ids.includes(user.rolesByUnit[i].unit["@id"]))
            {
                unit_ids.push(user.rolesByUnit[i].unit["@id"]);
            }
        }

        fetch(types.baseUrl + "/news", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let list = responseJson["hydra:member"];
                let ids = [];
                let news = [];

                for(var i = 0; i < list.length; i++)
                {
                    if(list[i].published === false && list[i].previousUnit === null) // news has been created in this unit and awaits publication
                    {
                        if(!ids.includes(list[i]["@id"]))
                        {
                            news.push(list[i]);
                            ids.push(list[i]["@id"]);
                        }
                    }
                    else if(list[i].published === true && list[i].publishedBySupervisor === false && list[i].previousUnit !== null && !unit_ids.includes(list[i].previousUnit["@id"])) // news has been transfered from another unit and awaits publication
                    {
                        if(!ids.includes(list[i]["@id"]))
                        {
                            news.push(list[i]);
                            ids.push(list[i]["@id"]);
                        }
                    }
                }
                dispatch(waitingNewsSuccess(news.reverse()));
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

export function tryWaitingNews(login, user)
{
    return (dispatch, getState) => {
        return dispatch(fetchWaitingNews(login, user));
    }
}

function fetchPublishNews(login, news)
{
    return dispatch => {
        dispatch(publishNewsRequested());

        if(news.previousUnit === null)
        {
            fetch(types.baseUrl + news["@id"], {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + login.tokenString,
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(
                    {
                        published : true,
                    }
                )
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch(publishNewsSuccess(responseJson));
                })
                .catch((error) => { dispatch(publishNewsFailure()); });
        }
        else
        {
            fetch(types.baseUrl + news["@id"], {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + login.tokenString,
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(
                    {
                        publishedBySupervisor : true,
                    }
                )
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch(publishNewsSuccess(responseJson));
                })
                .catch((error) => { dispatch(publishNewsFailure()); });
        }
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

        fetch(types.baseUrl + news["@id"] + "/transfer", {
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
                dispatch(transferNewsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(transferNewsFailure()); });
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

        fetch(types.baseUrl + news["@id"], {
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

        let medias = news.media;
        let media = [];

        for(var i = 0; i < medias.length; i++)
        {
            media.push(medias[i].id);
        }

        news.media = media;

        fetch(types.baseUrl + "/news", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(news)
        })
            .then((response) => response.json())
            .then((responseJson) => {
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

export function setCreationVisibility(visibility)
{
    return {
        type : types.SET_CREATION_VISIBILITY,
        visibility : visibility,
    }
}

function fetchNewsUploadMedia(login, file)
{
    return dispatch => {
        dispatch(newsUploadMediaRequested());
        let body = new FormData();

        body.append("file", file);

        fetch(types.baseUrl + "/fileUpload", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'multipart/form-data',
            },
            body : body,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(newsUploadMediaSuccess(responseJson));
            })
            .catch((error) => { dispatch(newsUploadMediaFailure()); });
    }
}

function newsUploadMediaRequested()
{
    return {
        type : types.NEWS_UPLOAD_MEDIA_REQUESTED,
    }
}

function newsUploadMediaSuccess(media)
{
    return {
        type : types.NEWS_UPLOAD_MEDIA_SUCCESS,
        media : media,
    }
}

function newsUploadMediaFailure()
{
    return {
        type : types.NEWS_UPLOAD_MEDIA_FAILURE,
    }
}

export function tryNewsUploadMedia(login, file)
{
    return (dispatch, getState) => {
        return dispatch(fetchNewsUploadMedia(login, file));
    }
}

export function searchNews(news, search)
{
    return {
        type : types.NEWS_SEARCH,
        news : news,
        search : search,
    }
}

export function searchWaitingNews(news, search)
{
    return {
        type : types.NEWS_WAITING_SEARCH,
        news : news,
        search : search,
    }
}