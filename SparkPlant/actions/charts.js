import * as types from './types';

function fetchSolvedTags(login, beginDate, endDate)
{
    return dispatch => {
        dispatch(solvedTagsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + '/tags?updatedAt[after]=' + beginDate + '&updatedAt[before]=' + endDate + '&status=closed_resolved', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(solvedTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.log(error); dispatch(solvedTagsFailure()); });
    }
}

function solvedTagsRequested()
{
    return {
        type : types.SOLVED_TAGS_REQUESTED,
    }
}

function solvedTagsSuccess(tags)
{
    return {
        type : types.SOLVED_TAGS_SUCCESS,
        tags : tags,
    }
}

function solvedTagsFailure()
{
    return {
        type : types.SOLVED_TAGS_ERROR,
    }
}

export function loadSolvedTags(login, beginDate, endDate)
{
    return (dispatch, getState) => {
        return dispatch(fetchSolvedTags(login, beginDate, endDate));
    }
}


function fetchUnsolvedTags(login, beginDate, endDate)
{
    return dispatch => {
        dispatch(unsolvedTagsRequested());
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";

        fetch(baseUrl + '/tags?updatedAt[after]=' + beginDate + '&updatedAt[before]=' + endDate + '&status=closed_unresolved', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(unsolvedTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.log(error); dispatch(unsolvedTagsFailure()); });
    }
}

function unsolvedTagsRequested()
{
    return {
        type : types.UNSOLVED_TAGS_REQUESTED,
    }
}

function unsolvedTagsSuccess(tags)
{
    return {
        type : types.UNSOLVED_TAGS_SUCCESS,
        tags : tags,
    }
}

function unsolvedTagsFailure()
{
    return {
        type : types.UNSOLVED_TAGS_ERROR,
    }
}

export function loadUnsolvedTags(login, beginDate, endDate)
{
    return (dispatch, getState) => {
        return dispatch(fetchUnsolvedTags(login, beginDate, endDate));
    }
}