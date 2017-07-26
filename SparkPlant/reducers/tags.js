import * as types from '../actions/types';
const initialState = {
    users : null,
    userTags : null,
    allTags : null,
    places : null,
    axis : null,
    creation_current : {
        id : null,
        title : null,
        description : null,
        descriptionAudio : null,
        status : "ongoing",
        placeDetails : null,
        placeDetailsAudio : null,
        place : null,
        primaryAxis : null,
        media : [

        ],
        supervisor : null,
        users : [

        ],
        comments : [

        ],
    },
    currentTag : null,
};

export const tagsReducer = {
    tags : (state = initialState, action) => {
        switch (action.type) {
            case types.GET_USER_TAGS_SUCCESS: {
                return Object.assign({}, state, {userTags : action.tags});
            }
            case types.GET_USER_TAGS_FAILURE: {
                return Object.assign({}, state, {userTags : null});
            }
            case types.GET_ALL_TAGS_SUCCESS: {
                return Object.assign({}, state, {allTags : action.tags});
            }
            case types.GET_ALL_TAGS_FAILURE: {
                return Object.assign({}, state, {allTags : null});
            }
            case types.GET_TAG_PLACES_SUCCESS: {
                return Object.assign({}, state, {places : action.places});
            }
            case types.GET_TAG_PLACES_FAILURE: {
                return Object.assign({}, state, {places : null});
            }
            case types.GET_TAG_AXIS_SUCCESS: {
                return Object.assign({}, state, {axis : action.axis});
            }
            case types.GET_TAG_AXIS_FAILURE: {
                return Object.assign({}, state, {axis : null});
            }
            case types.SET_CURRENT_CREATION_PLACE: {
                let creation_current = Object.assign({}, state.creation_current, {place : action.place});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_PLACE_DETAILS: {
                let creation_current = Object.assign({}, state.creation_current, {placeDetails : action.placeDetails});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_PLACE_DETAILS_AUDIO: {
                let creation_current = Object.assign({}, state.creation_current, {placeDetailsAudio : action.placeDetailsAudio});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_PRIMARY_AXIS: {
                let creation_current = Object.assign({}, state.creation_current, {primaryAxis : action.primaryAxis});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_SECONDARY_AXIS: {
                let creation_current = Object.assign({}, state.creation_current, {secondaryAxis : action.secondaryAxis});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_TITLE: {
                let creation_current = Object.assign({}, state.creation_current, {title : action.title});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_DESCRIPTION: {
                let creation_current = Object.assign({}, state.creation_current, {description : action.description});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_CREATION_DESCRIPTION_AUDIO: {
                let creation_current = Object.assign({}, state.creation_current, {descriptionAudio : action.descriptionAudio});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.GET_TAG_SUPERVISOR_SUCCESS: {
                let creation_current = Object.assign({}, state.creation_current, {supervisor : action.supervisor});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.GET_TAG_SUPERVISOR_FAILURE: {
                let creation_current = Object.assign({}, state.creation_current, {supervisor : null});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.GET_TAG_FOLLOWERS_SUCCESS: {
                let creation_current = Object.assign({}, state.creation_current, {users : action.followers});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.GET_TAG_FOLLOWERS_FAILURE: {
                let creation_current = Object.assign({}, state.creation_current, {users : null});
                return Object.assign({}, state, {creation_current : creation_current});
            }
            case types.SET_CURRENT_TAG: {
                return Object.assign({}, state, {currentTag : action.tag});
            }
            case types.TAG_HISTORY_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {history : action.history});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_HISTORY_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {history : null});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_RESOLVE_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {status : "closed_resolved"});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_RESOLVE_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {status : "ongoing"});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_CLOSE_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {status : "closed_unresolved"});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_CLOSE_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {status : "ongoing"});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_COMMENT_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {comments : [action.comment["@id"]]});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_COMMENT_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {comments : []});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_TRANSFER_USERS_SUCCESS: {
                return Object.assign({}, state, {users : action.users});
            }
            case types.TAG_TRANSFER_USERS_FAILURE: {
                return Object.assign({}, state, {users : null});
            }
            case types.TAG_TRANSFER_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {supervisor : action.supervisor});
                return Object.assign({}, state, {currentTag : currentTag});
            }
            case types.TAG_TRANSFER_FAILURE: {
                return state;
            }
            default :
                return state;
        }
    },
};