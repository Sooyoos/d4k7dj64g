import { resetTags } from "../navigations"

function checkNbActions(navState)
{
    if(navState.nbRoutes >= 5)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function navigateTags()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'Tags',
    };
}

export function goToTagsPage(navState)
{
    return dispatch => {
        if(checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTags());
    }
}

function navigateTagsFull()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagsFull',
    };
}

export function goToTagsFull(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagsFull());
    }

}

export function goToCreateTagStep1()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateTagStep1',
    };
}

export function goToCreateTagStep2()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateTagStep2',
    };
}

export function goToCreateTagStep3()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateTagStep3',
    };
}

export function goToCreateTagPreview()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateTagPreview',
    };
}

function navigateTagDetails()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagDetail',
    };
}

export function goToTagDetails(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagDetails());
    }
}

function navigateTagHistory()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagHistory',
    };
}

export function goToTagHistory(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagHistory());
    }
}

function navigateTagActions()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagActions',
    };
}

export function goToTagAction(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagActions());
    }
}

function navigateTagComment()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CommentTag',
    };
}

export function goToTagComment(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagComment());
    }
}

function navigateTagTransfer()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TransferTag',
    };
}

export function goToTagTransfer(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagTransfer());
    }
}

function navigateTagSearch()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'SearchTags',
    };
}

export function goToSearchTags(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagSearch());
    }
}

function navigateTagFilter()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'FilterTag',
    };
}

export function goToFilterTags(navState)
{
    return dispatch => {
        if (checkNbActions(navState) === true)
            dispatch(resetTags());
        dispatch(navigateTagFilter());
    }
}

export function goToRecordAudio()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'RecordAudio',
    };
}