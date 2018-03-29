import { resetNews } from "../navigations"

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

function navigateNews()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'News',
    };
}

export function goToNewsPage(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateNews());
    }
}

function navigateWaitingNews()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'WaitingNews',
    };
}

export function goToWaitingNews(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateWaitingNews());
    }
}

function navigateNewsDetail()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'NewsDetail',
    };
}

export function goToNewsDetail(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateNewsDetail());
    }
}

function navigateWaitingNewsDetail()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'WaitingNewsDetail',
    };
}

export function goToWaitingNewsDetail(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateWaitingNewsDetail());
    }
}

export function goToCreateNewsStep1()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateNewsStep1',
    };
}

export function goToCreateNewsStep2()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateNewsStep2',
    };
}

export function goToCreateNewsPreview()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateNewsPreview',
    };
}

function navigateSearchNews()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'SearchNews',
    };
}

export function goToSearchNews(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateSearchNews());
    }
}

function navigateSearchWaitingNews()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'SearchWaitingNews',
    };
}

export function goToSearchWaitingNews(navState)
{
    return dispatch => {
        /*if(checkNbActions(navState) === true)
            dispatch(resetNews());*/
        dispatch(navigateSearchWaitingNews());
    }
}