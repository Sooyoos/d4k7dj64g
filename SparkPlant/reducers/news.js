import * as types from '../actions/types';
const initialState = {
    news : null,
    waitingNews : null,
    currentNews : null,
    creation_current : {
        title : null,
        content : null,
        visibility : "public",
        unit : null,
        media : [

        ],
        uploadedMedias : 0,
        published : false,
        publishedBySupervisor : false,
        search : null,
        searchWaiting : null,
        searchResults : null,
        searchResultsWaiting : null,
    },
    loading : false,
};

function getCurrentCreationMediaIndex(state, filename)
{
    let medias = state.creation_current.media;

    for(var i = 0; i < medias.length; i++)
    {
        if(medias[i].name === filename)
        {
            return i;
        }
    }

    return -1;
}

export const newsReducer = {
    news : (state = initialState, action) => {
        switch (action.type) {
            case types.SET_CURRENT_NEWS: {
                return Object.assign({}, state, {currentNews : action.news, loading : false});
            }
            case types.USER_NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.USER_NEWS_SUCCESS: {
                return Object.assign({}, state, {news : action.news, loading : false});
            }
            case types.USER_NEWS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.NEWS_SUCCESS: {
                return Object.assign({}, state, {currentNews : action.news, loading : false});
            }
            case types.NEWS_FAILURE: {
                return Object.assign({}, state, {currentNews : null, loading : false});
            }
            case types.WAITING_NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.WAITING_NEWS_SUCCESS: {
                return Object.assign({}, state, {waitingNews : action.news, loading : false});
            }
            case types.WAITING_NEWS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.PUBLISH_NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.PUBLISH_NEWS_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.PUBLISH_NEWS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.TRANSFER_NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.TRANSFER_NEWS_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.TRANSFER_NEWS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.DELETE_NEWS_REQUESTED: {
                return Object.assign({}, state, {loading : true});
            }
            case types.DELETE_NEWS_SUCCESS: {
                return Object.assign({}, state, {loading : false});
            }
            case types.DELETE_NEWS_FAILURE: {
                return Object.assign({}, state, {loading : false});
            }
            case types.PREPARE_NEWS: {
                let obj = Object.assign({}, action.news, {visibility : state.creation_current.visibility});
                let creationCurrent = Object.assign({}, state.creation_current, obj);
                return Object.assign({}, state, {creation_current : creationCurrent});
            }
            case types.CREATE_NEWS_SUCCESS: {
                return Object.assign({}, state, {creation_current : {
                    title : null,
                    content : null,
                    unit : null,
                    media : [

                    ],
                    published : false,
                    uploadedMedias : 0,
                }});
            }
            case types.CREATE_NEWS_FAILURE: {
                return state;
            }
            case types.SET_CREATION_VISIBILITY : {
                let creationCurrent = Object.assign({}, state.creation_current, {visibility : action.visibility});
                return Object.assign({}, state, {creation_current : creationCurrent});
            }
            case types.NEWS_UPLOAD_MEDIA_SUCCESS: {
                let index = getCurrentCreationMediaIndex(state, action.media.originalFilename);

                if(index !== -1)
                {
                    let medias = state.creation_current.media;
                    let uploadedMedias = parseInt(state.creation_current.uploadedMedias) + 1;
                    let original = medias[index].uri;
                    medias[index] = {
                        id : action.media["@id"],
                        uri : original
                    };
                    let creationCurrent = Object.assign({}, state.creation_current, {media : medias, uploadedMedias : uploadedMedias});
                    return Object.assign({}, state, {creation_current : creationCurrent, loading : false});
                }
                else
                {
                    let medias = state.creation_current.media;
                    let uploadedMedias = parseInt(state.creation_current.uploadedMedias) + 1;
                    medias.push(
                        {
                            id : action.media["@id"],
                            uri : action.media.path,
                            originalFile : action.media.originalFilename,
                        }
                    );
                    let creationCurrent = Object.assign({}, state.creation_current, {visibility : action.visibility, media : medias, uploadedMedia : uploadedMedias});
                    return Object.assign({}, state, {creation_current : creationCurrent, loading : false, uploadedMedias : uploadedMedias});
                }
            }
            case types.NEWS_UPLOAD_MEDIA_FAILURE : {
                return state;
            }
            case types.NEWS_SEARCH : {
                return Object.assign({}, state, {searchResults : action.news, search : action.search});
            }
            case types.NEWS_WAITING_SEARCH : {
                return Object.assign({}, state, {searchResultsWaiting : action.news, searchWaiting : action.search});
            }
            case types.RESET_NEWS : {
                return Object.assign({}, state, initialState);
            }
            default :
                return state;
        }
    },
};