import * as types from './types';
import * as navigation from './navigation/tags';
import {goToTagHistory} from "./navigation/tags";

function fetchUserTags(login)
{
    return dispatch => {
        dispatch(userTagsRequested());

        fetch(types.baseUrl + login.userToken["@id"] + "/tags?order[tag.createdAt]=desc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(getUserTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(getUserTagsFailure()); });
    }
}

export function getUserTagsSuccess(tags)
{
    return {
        type: types.GET_USER_TAGS_SUCCESS,
        tags: tags,
    }
}

export function getUserTagsFailure()
{
    return {
        type: types.GET_USER_TAGS_FAILURE,
    }
}

function userTagsRequested()
{
    return {
        type : types.USER_TAGS_REQUESTED,
    }
}

export function tryUserTags(login){
    return (dispatch, getState) => {
        return dispatch(fetchUserTags(login));
    }
}

function fetchAllTags(login)
{
    return dispatch => {
        dispatch(allTagsRequested());

        fetch(types.baseUrl + "/tags?order[createdAt]=desc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(getAllTagsSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(getAllTagsFailure()); });
    }
}

export function getAllTagsSuccess(tags)
{
    return {
        type: types.GET_ALL_TAGS_SUCCESS,
        tags: tags,
    }
}

export function getAllTagsFailure()
{
    return {
        type: types.GET_ALL_TAGS_FAILURE,
    }
}

function allTagsRequested()
{
    return {
        type : types.ALL_TAGS_REQUESTED,
    }
}

export function tryAllTags(login){
    return (dispatch, getState) => {
        return dispatch(fetchAllTags(login));
    }
}

function fetchTagPlaces(login)
{
    return dispatch => {
        dispatch(tagPlacesRequested());

        fetch(types.baseUrl + "/places", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(getTagPlacesSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(getTagPlacesFailure(responseJson["hydra:member"])); });
    }
}

function tagPlacesRequested()
{
    return {
        type : types.TAG_PLACES_REQUESTED,
    }
}

export function getTagPlacesSuccess(places)
{
    return {
        type: types.GET_TAG_PLACES_SUCCESS,
        places: places,
    }
}

export function getTagPlacesFailure()
{
    return {
        type: types.GET_TAG_PLACES_FAILURE,
    }
}

export function tryTagPlaces(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagPlaces(login));
    }
}

function fetchTagAxis(login)
{
    return dispatch => {
        dispatch(tagAxisRequested());

        fetch(types.baseUrl + "/transversal_axes", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(getTagAxisSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(getTagAxisFailure(responseJson["hydra:member"])); });
    }
}

function tagAxisRequested()
{
    return {
        type : types.TAG_AXIS_REQUESTED,
    }
}

export function getTagAxisSuccess(axis)
{
    return {
        type: types.GET_TAG_AXIS_SUCCESS,
        axis: axis,
    }
}

export function getTagAxisFailure()
{
    return {
        type: types.GET_TAG_AXIS_FAILURE,
    }
}

export function tryTagAxis(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagAxis(login));
    }
}

export function setCurrentCreationPlace(place)
{
    return {
        type: types.SET_CURRENT_CREATION_PLACE,
        place : place,
    }
}

export function setCurrentCreationPlaceDetails(placeDetails)
{
    return {
        type: types.SET_CURRENT_CREATION_PLACE_DETAILS,
        placeDetails : placeDetails,
    }
}

export function setCurrentCreationPlaceDetailsAudio(placeDetailsAudio)
{
    return {
        type: types.SET_CURRENT_CREATION_PLACE_DETAILS_AUDIO,
        placeDetailsAudio : placeDetailsAudio,
    }
}

export function setCurrentCreationPrimaryAxis(primaryAxis)
{
    return {
        type: types.SET_CURRENT_CREATION_PRIMARY_AXIS,
        primaryAxis : primaryAxis,
    }
}

export function setCurrentCreationSecondaryAxis(secondaryAxis)
{
    return {
        type: types.SET_CURRENT_CREATION_SECONDARY_AXIS,
        secondaryAxis : secondaryAxis,
    }
}

export function setCurrentCreationTitle(title)
{
    return {
        type: types.SET_CURRENT_CREATION_TITLE,
        title : title,
    }
}

export function setCurrentCreationDescription(description)
{
    return {
        type: types.SET_CURRENT_CREATION_DESCRIPTION,
        description : description,
    }
}

export function setCurrentCreationDescriptionAudio(descriptionAudio)
{
    return {
        type: types.SET_CURRENT_CREATION_DESCRIPTION_AUDIO,
        descriptionAudio : descriptionAudio,
    }
}

function fetchTagSupervisor(login, tag)
{
    return dispatch => {
        dispatch(tagSupervisorRequested());

        console.log(tag.place);
        let unitId = tag.place.unit;
        let axisId = tag.primaryAxis["@id"];

        let searchUrl = "/users?rolesByUnit.unit.id=" + unitId + "&rolesByUnit.role.title=" + "Correspondant" + "&rolesByUnit.transversalAxis.id=" + axisId + "&available=true";
        console.log(searchUrl);
        fetch(types.baseUrl + searchUrl, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson["hydra:totalItems"] > 0)
                {
                    console.log(responseJson);
                    console.log("Le responsable du tag est le correspondant dans l'unit");
                    dispatch(getTagSupervisorSuccess(responseJson["hydra:member"][0]));
                }
                else
                {
                    fetch(types.baseUrl + unitId, { // get the full unit in order to get its parent
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + login.tokenString,
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                        console.log("J'ai récupéré l'unité parente");
                        console.log(responseJson);
                            if(responseJson.parent !== null) // if the unit is not the top one
                            {
                                console.log("Je recherche le correspondant dans l'unité parente");
                                let place = Object.assign({}, tag.place, { unit : responseJson.parent["@id"]});
                                dispatch(fetchTagSupervisor(login, Object.assign({}, tag, {place : place})));
                            }
                            else
                            {
                                console.log("le responsable c'est le DG");
                                let searchUrl = "/users?rolesByUnit.unit.id=" + unitId + "&rolesByUnit.role.title=" + "Responsable" + "&available=true";
                                console.log(searchUrl);
                                fetch(types.baseUrl + searchUrl, { // get the full unit in order to get its parent
                                    method: 'GET',
                                    headers: {
                                        'Authorization' : 'Bearer ' + login.tokenString,
                                    },
                                })
                                    .then((response) => response.json())
                                    .then((responseJson) => {
                                    console.log(responseJson);
                                        dispatch(getTagSupervisorSuccess(responseJson["hydra:member"][0]));
                                    })
                                    .catch((error) => { console.log(error); dispatch(getTagSupervisorFailure()); });
                            }
                        })
                        .catch((error) => {console.log(error); dispatch(getTagSupervisorFailure()); });
                }
            })
            .catch((error) => {console.log(error); dispatch(getTagSupervisorFailure()); });
    }
}

export function tryTagSupervisor(login, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagSupervisor(login, tag));
    }
}

function tagSupervisorRequested()
{
    return {
        type : types.TAG_SUPERVISOR_REQUESTED,
    }
}

function getTagSupervisorSuccess(supervisor)
{
    return {
        type : types.GET_TAG_SUPERVISOR_SUCCESS,
        supervisor : supervisor
    }
}

function getTagSupervisorFailure()
{
    return {
        type : types.GET_TAG_SUPERVISOR_FAILURE,
    }
}

function fetchTagFollowers(login, user, tag)
{
    return dispatch => {
        dispatch(tagFollowersRequested());
        let unitId = tag.place.unit;

        fetch(types.baseUrl + unitId, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let users = [];
                let flag = false;
                for(var i = 0; i < responseJson.roles.length; i++)
                {
                    users.push(responseJson.roles[i].user);
                    if(responseJson.roles[i].user["@id"] === user["@id"])
                        flag = true;
                }
                if(!flag)
                    users.push(user);
                dispatch(getTagFollowersSuccess(users));
            })
            .catch((error) => { console.log(error); dispatch(getTagFollowersFailure()); });
    }
}

export function tryTagFollowers(login, user, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagFollowers(login, user, tag));
    }
}

function tagFollowersRequested()
{
    return {
        type : types.TAG_FOLLOWERS_REQUESTED,
    }
}

function getTagFollowersSuccess(followers)
{
    return {
        type : types.GET_TAG_FOLLOWERS_SUCCESS,
        followers : followers
    }
}

function getTagFollowersFailure()
{
    return {
        type : types.GET_TAG_FOLLOWERS_FAILURE,
    }
}

function addUsersToTag(login, tag, id)
{
    console.log("UTILISATEURS DU TAG");
    console.log(tag.users);
    return dispatch => {
        dispatch(createTagRequested());

        for(var i = 0; i < tag.users.length; i++)
        {
            if(tag.users[i]["@id"])
            {
                fetch(types.baseUrl + '/user_tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + login.tokenString,
                    },
                    body: JSON.stringify({
                        user : tag.users[i]["@id"],
                        tag : id,
                    }),
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        console.log("User added to tag");
                        console.log(responseJson);
                    })
                    .catch((error) => { dispatch(createTagFailure()); });
            }
            else
            {
                fetch(types.baseUrl + '/user_tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' + login.tokenString,
                    },
                    body: JSON.stringify({
                        user : tag.users[i],
                        tag : id,
                    }),
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        console.log("User added to tag");
                        console.log(responseJson);
                    })
                    .catch((error) => { dispatch(createTagFailure()); });
            }

        }
        dispatch(createTagSuccess());
    }
}

function checkSupervisorInUsers(tag)
{
    let flag = true;

    for(var i = 0; i < tag.users.length; i++)
    {
        if(tag.supervisor === tag.users[i])
            flag = false;
    }

    return flag;
}

function fetchCreateTag(login, tag)
{
    console.log("USERS DU TAG");
    console.log(tag.users);
    return dispatch => {
        dispatch(createTagRequested());

        let supToAdd = checkSupervisorInUsers(tag);

        let users = [];
        let medias = [];

        for(var i = 0; i < tag.users.length; i++)
        {
            users.push(tag.users[i]["@id"]);
        }

        if(supToAdd)
            users.push(tag.supervisor);

        for(var i = 0; i < tag.media.length; i++)
        {
            medias.push(tag.media[i].id);
        }

        tag.users = users;

        console.log("CREATION DU TAG");
        console.log(medias);

        let body = {
            title : tag.title,
            description : tag.description,
            descriptionAudio: tag.descriptionAudio,
            status : tag.status,
            place: tag.place["@id"],
            placeDetails: tag.placeDetails,
            placeDetailsAudio: tag.placeDetailsAudio,
            primaryAxis: tag.primaryAxis["@id"],
            media : medias,
            supervisor: tag.supervisor["@id"],
            users : [

            ],
        };

        fetch(types.baseUrl + '/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + login.tokenString,
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(addUsersToTag(login, tag, responseJson["@id"]));
                dispatch(tryUserTags(login));
            })
            .catch((error) => { console.warn(error); dispatch(createTagFailure()); });
    }
}

export function tryCreateTag(login, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchCreateTag(login, tag));
    }
}

function createTagRequested()
{
    return {
        type : types.TAG_CREATE_REQUESTED,
    }
}

function createTagSuccess()
{
    return {
        type : types.CREATE_TAG_SUCCESS,
    }
}

function createTagFailure()
{
    return {
        type : types.CREATE_TAG_FAILURE,
    }
}

function setCurrentTag(tag)
{
    return {
        type : types.SET_CURRENT_TAG,
        tag : tag,
    }
}

export function trySetCurrentTag(tag)
{
    return (dispatch, getState) =>
    {
        dispatch(navigation.goToTagDetails(tag));
        dispatch(setCurrentTag(tag));
    }
}

function fetchTagHistory(login, tag)
{
    return dispatch => {
        dispatch(tagHistoryRequested());

        fetch(types.baseUrl + tag["@id"] + "/logs?order[createdAt]=desc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(tagHistorySuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { dispatch(tagHistoryFailure()); });
    }
}



export function tryTagHistory(login, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagHistory(login, tag));
    }
}

function tagHistoryRequested()
{
    return {
        type : types.TAG_HISTORY_REQUESTED,
    }
}

function tagHistoryFailure()
{
    return {
        type : types.TAG_HISTORY_FAILURE,
    }
}

function tagHistorySuccess(history)
{
    return {
        type : types.TAG_HISTORY_SUCCESS,
        history : history,
    }
}

function fetchResolveTag(login, tag)
{
    return dispatch => {
        dispatch(tagResolveRequested());

        let status = "closed_resolved";

        fetch(types.baseUrl + tag["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status: status}),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(tagResolveSuccess(responseJson));
                dispatch(goToTagHistory(tag));
            })
            .catch((error) => { console.log(error); dispatch(tagResolveFailure()); });
    }
}

export function tryTagResolve(login, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchResolveTag(login, tag));
    }
}

function tagResolveRequested()
{
    return {
        type : types.TAG_RESOLVE_REQUESTED,
    }
}

function tagResolveSuccess(tag)
{
    return {
        type : types.TAG_RESOLVE_SUCCESS,
        tag : tag,
    }
}

function tagResolveFailure()
{
    return {
        type : types.TAG_RESOLVE_FAILURE,
    }
}

function fetchCloseTag(login, tag)
{
    return dispatch => {
        dispatch(tagCloseRequested());

        let status = "closed_unresolved";

        fetch(types.baseUrl + tag["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({status: status}),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(tagCloseSuccess(responseJson));
                dispatch(goToTagHistory(tag));
            })
            .catch((error) => { console.log(error); dispatch(tagCloseFailure()); });
    }
}

export function tryTagClose(login, tag)
{
    return (dispatch, getState) => {
        return dispatch(fetchCloseTag(login, tag));
    }
}

function tagCloseRequested()
{
    return {
        type : types.TAG_CLOSE_REQUESTED,
    }
}

function tagCloseSuccess(tag)
{
    return {
        type : types.TAG_CLOSE_SUCCESS,
        tag : tag,
    }
}

function tagCloseFailure()
{
    return {
        type : types.TAG_CLOSE_FAILURE,
    }
}

function fetchCommentTag(login, tag, comment)
{
    return dispatch => {
        dispatch(tagCommentRequested());

        fetch(types.baseUrl + "/tag_comments", {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                content : comment,
                tag : tag["@id"]
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(tagCommentSuccess(responseJson));
            })
            .catch((error) => { console.log(error); dispatch(tagCommentFailure()); });
    }
}

export function tryTagComment(login, tag, comment)
{
    return (dispatch, getState) => {
        return dispatch(fetchCommentTag(login, tag, comment));
    }
}

function tagCommentRequested()
{
    return {
        type : types.TAG_COMMENT_REQUESTED,
    }
}

function tagCommentSuccess(comment)
{
    return {
        type : types.TAG_COMMENT_SUCCESS,
        comment : comment,
    }
}

function tagCommentFailure()
{
    return {
        type : types.TAG_COMMENT_FAILURE,
    }
}

function fetchTransferUsersTag(login)
{
    return dispatch => {
        dispatch(tagTransferUsersRequested());

        fetch(types.baseUrl + "/users?order[firstName]=asc", {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(tagTransferUsersSuccess(responseJson["hydra:member"]));
            })
            .catch((error) => { console.log(error); dispatch(tagTransferUsersFailure()); });
    }
}

export function tryTagTransferUsers(login)
{
    return (dispatch, getState) => {
        return dispatch(fetchTransferUsersTag(login));
    }
}

function tagTransferUsersRequested()
{
    return {
        type : types.TAG_TRANSFER_USERS_REQUESTED,
    }
}

function tagTransferUsersSuccess(users)
{
    return {
        type : types.TAG_TRANSFER_USERS_SUCCESS,
        users : users,
    }
}

function tagTransferUsersFailure()
{
    return {
        type : types.TAG_TRANSFER_USERS_FAILURE,
    }
}

function fetchTransferTag(login, tag, supervisor)
{
    return dispatch => {
        dispatch(tagTransferRequested());
        console.log("TRANSFER TO");
        console.log(supervisor);
        tag.users = [];
        tag.users.push(supervisor);

        fetch(types.baseUrl + tag["@id"], {
            method: 'PUT',
            headers: {
                'Authorization' : 'Bearer ' + login.tokenString,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                supervisor : supervisor["@id"],
                status : "ongoing",
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(addUsersToTag(login, tag, tag["@id"]));
                dispatch(tagTransferSuccess(supervisor));
            })
            .catch((error) => { console.log(error); dispatch(tagTransferFailure()); });
    }
}

export function tryTagTransfer(login, tag, supervisor)
{
    return (dispatch, getState) => {
        return dispatch(fetchTransferTag(login, tag, supervisor));
    }
}

function tagTransferRequested()
{
    return {
        type : types.TAG_TRANSFER_REQUESTED,
    }
}

function tagTransferSuccess(supervisor)
{
    return {
        type : types.TAG_TRANSFER_SUCCESS,
        supervisor : supervisor,
    }
}

function tagTransferFailure()
{
    return {
        type : types.TAG_TRANSFER_FAILURE,
    }
}

function fetchTagsUploadMedia(login, file)
{
    return dispatch => {
        dispatch(tagsUploadMediaRequested());
        let body = new FormData();

        console.log(file);

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
                console.log(responseJson);
                dispatch(tagsUploadMediaSuccess(responseJson));
            })
            .catch((error) => { console.log(error); dispatch(tagsUploadMediaFailure()); });
    }
}

function tagsUploadMediaRequested()
{
    return {
        type : types.TAGS_UPLOAD_MEDIA_REQUESTED,
    }
}

function tagsUploadMediaSuccess(media)
{
    return {
        type : types.TAGS_UPLOAD_MEDIA_SUCCESS,
        media : media,
    }
}

function tagsUploadMediaFailure()
{
    return {
        type : types.TAGS_UPLOAD_MEDIA_FAILURE,
    }
}

export function tryTagsUploadMedia(login, file)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagsUploadMedia(login, file));
    }
}

export function searchTags(tags, search)
{
    return {
        type : types.TAGS_SEARCH,
        tags : tags,
        search : search,
    }
}

export function addTagsFilter(filterList, filter)
{
    return {
        type : types.ADD_TAGS_FILTER,
        filter : filter,
        filterList : filterList,
    }
}

export function removeTagsFilter(filterList, filter)
{
    return {
        type : types.REMOVE_TAGS_FILTER,
        filter : filter,
        filterList : filterList,
    }
}

export function filterTags()
{
    return {
        type : types.FILTER_TAGS,
    }
}

export function resetFilterTags()
{
    return {
        type : types.RESET_FILTER_TAGS,
    }
}

export function resetFilterFullTags()
{
    return {
        type : types.RESET_FILTER_FULL_TAGS,
    }
}

export function filterFullTags()
{
    return {
        type : types.FILTER_FULL_TAGS,
    }
}

export function setToRecord(value)
{
    return {
        type : types.SET_TO_RECORD,
        value : value,
    }
}

function fetchTagsUploadPlaceAudio(login, file)
{
    return dispatch => {
        dispatch(tagsUploadPlaceAudioRequested());
        let body = new FormData();

        console.log(file);

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
                dispatch(tagsUploadPlaceAudioSuccess(responseJson));
            })
            .catch((error) => { dispatch(tagsUploadPlaceAudioFailure()); });
    }
}

function tagsUploadPlaceAudioRequested()
{
    return {
        type : types.TAGS_UPLOAD_PLACE_AUDIO_REQUESTED,
    }
}

function tagsUploadPlaceAudioSuccess(media)
{
    return {
        type : types.TAGS_UPLOAD_PLACE_AUDIO_SUCCESS,
        media : media,
    }
}

function tagsUploadPlaceAudioFailure()
{
    return {
        type : types.TAGS_UPLOAD_PLACE_AUDIO_FAILURE,
    }
}

export function tryTagsUploadPlaceAudio(login, file)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagsUploadPlaceAudio(login, file));
    }
}

function fetchTagsUploadDescriptionAudio(login, file)
{
    return dispatch => {
        dispatch(tagsUploadDescriptionAudioRequested());
        let body = new FormData();

        console.log(file);

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
                dispatch(tagsUploadDescriptionAudioSuccess(responseJson));
            })
            .catch((error) => { console.log(error); dispatch(tagsUploadDescriptionAudioFailure()); });
    }
}

function tagsUploadDescriptionAudioRequested()
{
    return {
        type : types.TAGS_UPLOAD_DESCRIPTION_AUDIO_REQUESTED,
    }
}

function tagsUploadDescriptionAudioSuccess(media)
{
    return {
        type : types.TAGS_UPLOAD_DESCRIPTION_AUDIO_SUCCESS,
        media : media,
    }
}

function tagsUploadDescriptionAudioFailure()
{
    return {
        type : types.TAGS_UPLOAD_DESCRIPTION_AUDIO_FAILURE,
    }
}

export function tryTagsUploadDescriptionAudio(login, file)
{
    return (dispatch, getState) => {
        return dispatch(fetchTagsUploadDescriptionAudio(login, file));
    }
}

export function trySetTagFollowers(followers)
{
    return {
        type : types.SET_TAG_FOLLOWERS,
        followers : followers,
    }
}
