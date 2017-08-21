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
    loading : false,
    search : null,
    searchResults : null,
    filters : {
        status : [

        ],
        axis : [

        ],
        units : [

        ]
    },
    filterResults : null,
    filterFullResults : null,
};

function getCurrentCreationMediaIndex(state, filename)
{
    let medias = state.creation_current.media;

    console.log(medias);

    for(var i = 0; i < medias.length; i++)
    {
        if(medias[i].name === filename)
        {
            return i;
        }
    }

    return -1;
}

function filterFullTags(list, filters)
{
    let shortList = [];

    for(var i = 0; i < list.length; i++)
    {
        let flag = false;

        for(var j = 0; j < filters.status.length; j++)
        {
            if(list[i].status === filters.status[j])
            {
                flag = true;
            }
        }

        for(var j = 0; j < filters.units.length; j++)
        {
            if(list[i].unit["@id"] === filters.units[j])
            {
                flag = true;
            }
        }

        for(var j = 0; j < filters.axis.length; j++)
        {
            if(list[i].primaryAxis["@id"] === filters.axis[j])
            {
                flag = true;
            }
        }

        if(flag === true)
        {
            shortList.push(list[i]);
        }
    }

    return shortList;
}

function filterTags(list, filters)
{
    let shortList = [];

    for(var i = 0; i < list.length; i++)
    {
        let flag = false;

        for(var j = 0; j < filters.status.length; j++)
        {
            if(list[i].tag.status === filters.status[j])
            {
                flag = true;
            }
        }

        for(var j = 0; j < filters.units.length; j++)
        {
            if(list[i].unit["@id"] === filters.units[j])
            {
                flag = true;
            }
        }

        for(var j = 0; j < filters.axis.length; j++)
        {
            if(list[i].primaryAxis["@id"] === filters.axis[j])
            {
                flag = true;
            }
        }

        if(flag === true)
        {
            shortList.push(list[i]);
        }
    }

    return shortList;
}

export const tagsReducer = {
    tags : (state = initialState, action) => {
        switch (action.type) {
            case types.USER_TAGS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_USER_TAGS_SUCCESS: {
                return Object.assign({}, state, {userTags : action.tags, loading : false});
            }
            case types.GET_USER_TAGS_FAILURE: {
                return Object.assign({}, state, {userTags : null, loading : false});
            }
            case types.ALL_TAGS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_ALL_TAGS_SUCCESS: {
                return Object.assign({}, state, {allTags : action.tags, loading : false});
            }
            case types.GET_ALL_TAGS_FAILURE: {
                return Object.assign({}, state, {allTags : null, loading : false});
            }
            case types.TAG_PLACES_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_TAG_PLACES_SUCCESS: {
                return Object.assign({}, state, {places : action.places, loading : false});
            }
            case types.GET_TAG_PLACES_FAILURE: {
                return Object.assign({}, state, {places : null, loading : false});
            }
            case types.TAG_AXIS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_TAG_AXIS_SUCCESS: {
                return Object.assign({}, state, {axis : action.axis, loading : false});
            }
            case types.GET_TAG_AXIS_FAILURE: {
                return Object.assign({}, state, {axis : null, loading : false});
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
            case types.TAG_SUPERVISOR_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_TAG_SUPERVISOR_SUCCESS: {
                let creation_current = Object.assign({}, state.creation_current, {supervisor : action.supervisor});
                return Object.assign({}, state, {creation_current : creation_current, loading : false});
            }
            case types.GET_TAG_SUPERVISOR_FAILURE: {
                let creation_current = Object.assign({}, state.creation_current, {supervisor : null});
                return Object.assign({}, state, {creation_current : creation_current, loading : false});
            }
            case types.TAG_FOLLOWERS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.GET_TAG_FOLLOWERS_SUCCESS: {
                let creation_current = Object.assign({}, state.creation_current, {users : action.followers});
                return Object.assign({}, state, {creation_current : creation_current, loading : false});
            }
            case types.GET_TAG_FOLLOWERS_FAILURE: {
                let creation_current = Object.assign({}, state.creation_current, {users : null});
                return Object.assign({}, state, {creation_current : creation_current, loading : false});
            }
            case types.SET_CURRENT_TAG: {
                return Object.assign({}, state, {currentTag : action.tag, loading : false});
            }
            case types.TAG_HISTORY_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_HISTORY_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {history : action.history});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_HISTORY_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {history : null});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_RESOLVE_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_RESOLVE_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {status : "closed_resolved"});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_RESOLVE_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {status : "ongoing"});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_CLOSE_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_CLOSE_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {status : "closed_unresolved"});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_CLOSE_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {status : "ongoing"});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_COMMENT_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_COMMENT_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {comments : [action.comment["@id"]]});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_COMMENT_FAILURE: {
                let currentTag = Object.assign({}, state.currentTag, {comments : []});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_TRANSFER_USERS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_TRANSFER_USERS_SUCCESS: {
                return Object.assign({}, state, {users : action.users, loading : false});
            }
            case types.TAG_TRANSFER_USERS_FAILURE: {
                return Object.assign({}, state, {users : null, loading : false});
            }
            case types.TAG_CREATE_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_CREATE_SUCCESS: {
                let creationCurrent = Object.assign({}, state.creation_current, initialState.creation_current);
                return Object.assign({}, state, {creation_current : creationCurrent, loading : false});
            }
            case types.TAG_CREATE_FAILURE: {
                let creationCurrent = Object.assign({}, state.creation_current, initialState.creation_current);
                return Object.assign({}, state, {creation_current : creationCurrent, loading : false});
            }
            case types.TAG_TRANSFER_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAG_TRANSFER_SUCCESS: {
                let currentTag = Object.assign({}, state.currentTag, {supervisor : action.supervisor});
                return Object.assign({}, state, {currentTag : currentTag, loading : false});
            }
            case types.TAG_TRANSFER_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.TAGS_UPLOAD_MEDIA_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TAGS_UPLOAD_MEDIA_SUCCESS: {
                let index = getCurrentCreationMediaIndex(state, action.media.originalFilename);
                console.log(index);
                if(index !== -1)
                {
                    let medias = state.creation_current.media;
                    let original = medias[index].uri;
                    medias[index] = {
                        id : action.media["@id"],
                        uri : original
                    };
                    let creationCurrent = Object.assign({}, state.creation_current, {visibility : action.visibility, media : medias});
                    return Object.assign({}, state, {creation_current : creationCurrent, loading : false});
                }
                else
                {
                    let medias = state.creation_current.media;
                    medias.push(
                        {
                            id : action.media["@id"],
                        }
                    );
                    let creationCurrent = Object.assign({}, state.creation_current, {visibility : action.visibility, media : medias});
                    return Object.assign({}, state, {creation_current : creationCurrent, loading : false});
                }
            }
            case types.TAGS_UPLOAD_MEDIA_FAILURE : {
                return Object.assign({}, state, {loading : false});
            }
            case types.TAGS_SEARCH : {
                return Object.assign({}, state, {searchResults : action.tags, search : action.search});
            }
            case types.ADD_TAGS_FILTER : {
                let filters = [];
                let filtersObj = null;
                switch(action.filterList)
                {
                    case "status" :
                        filters = state.filters.status;
                        filters.push(action.filter);
                        filtersObj = Object.assign({}, state.filters, {status : filters});
                        break;
                    case "axis" :
                        filters = state.filters.axis;
                        filters.push(action.filter);
                        filtersObj = Object.assign({}, state.filters, {axis : filters});
                        break;
                    case "units" :
                        filters = state.filters.units;
                        filters.push(action.filter);
                        filtersObj = Object.assign({}, state.filters, {units : filters});
                        break;
                }
                return Object.assign({}, state, {filters : filtersObj});
            }
            case types.REMOVE_TAGS_FILTER : {
                let filters = [];
                let filtersObj = null;
                switch(action.filterList)
                {
                    case "status" :
                        filters = state.filters.status;
                        filters.splice(filters.indexOf(action.filter), 1);
                        filtersObj = Object.assign({}, state.filters, {status : filters});
                        break;
                    case "axis" :
                        filters = state.filters.axis;
                        filters.splice(filters.indexOf(action.filter), 1);
                        filtersObj = Object.assign({}, state.filters, {axis : filters});
                        break;
                    case "units" :
                        filters = state.filters.units;
                        filters.splice(filters.indexOf(action.filter), 1);
                        filtersObj = Object.assign({}, state.filters, {units : filters});
                        break;
                }
                return Object.assign({}, state, {filters : filtersObj});
            }
            case types.FILTER_TAGS : {
                let filtered = filterTags(state.userTags, state.filters);
                return Object.assign({}, state, {filterResults : filtered});
            }
            case types.FILTER_FULL_TAGS : {
                let filtered = filterFullTags(state.allTags, state.filters);
                return Object.assign({}, state, {filterFullResults : filtered});
            }
            default :
                return state;
        }
    },
};