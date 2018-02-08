import * as types from './types';

function fetchSolvedTags(login, beginDate, endDate, place, unit)
{
    return dispatch => {
        dispatch(solvedTagsRequested());

        fetch(types.baseUrl + '/tags?updatedAt[after]=' + beginDate + '&updatedAt[before]=' + endDate + '&status=closed_resolved', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(solvedTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(solvedTagsFailure()); });
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

export function loadSolvedTags(login, beginDate, endDate, place = null, unit = null)
{
    return (dispatch, getState) => {
        return dispatch(fetchSolvedTags(login, beginDate, endDate, place, unit));
    }
}


function fetchUnsolvedTags(login, beginDate, endDate, place, unit)
{
    return dispatch => {
        dispatch(unsolvedTagsRequested());

        fetch(types.baseUrl + '/tags?updatedAt[after]=' + beginDate + '&updatedAt[before]=' + endDate + '&status=closed_unresolved', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(unsolvedTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(unsolvedTagsFailure()); });
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

export function loadUnsolvedTags(login, beginDate, endDate, place = null, unit = null)
{
    return (dispatch, getState) => {
        return dispatch(fetchUnsolvedTags(login, beginDate, endDate, place, unit));
    }
}