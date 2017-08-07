import * as types from '../actions/types';
const initialState = {
    news : null,
    waitingNews : null,
    currentNews : null,
    creation_current : {
        title : null,
        content : null,
        visibility : null,
        unit : null,
        media : [

        ],
        published : false,
    }
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

export const newsReducer = {
    news : (state = initialState, action) => {
        switch (action.type) {
            case types.SET_CURRENT_NEWS: {
                return Object.assign({}, state, {currentNews : action.news});
            }
            case types.USER_NEWS_SUCCESS: {
                return Object.assign({}, state, {news : action.news});
            }
            case types.USER_NEWS_FAILURE: {
                return Object.assign({}, state, {news : null});
            }
            case types.WAITING_NEWS_SUCCESS: {
                return Object.assign({}, state, {waitingNews : action.news});
            }
            case types.WAITING_NEWS_FAILURE: {
                return Object.assign({}, state, {waitingNews : null});
            }
            case types.PUBLISH_NEWS_SUCCESS: {
                return state;
            }
            case types.PUBLISH_NEWS_FAILURE: {
                return state;
            }
            case types.TRANSFER_NEWS_SUCCESS: {
                return state;
            }
            case types.TRANSFER_NEWS_FAILURE: {
                return state;
            }
            case types.DELETE_NEWS_SUCCESS: {
                return state;
            }
            case types.DELETE_NEWS_FAILURE: {
                return state;
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
                    return Object.assign({}, state, {creation_current : creationCurrent});
                }
            }
            case types.NEWS_UPLOAD_MEDIA_FAILURE : {
                return state;
            }
            default :
                return state;
        }
    },
};