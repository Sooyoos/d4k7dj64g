import { resetChecklists } from "../navigations"

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

export function navigateChecklistHistory()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistHistory',
    };
}

function navigateChecklistPage()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'Checklist',
    };
}

export function goToChecklistPage(navState)
{
    return dispatch => {
        if(checkNbActions(navState) === true)
            dispatch(resetChecklists());
        dispatch(navigateChecklistPage());
    }
}

function navigateChecklistLibrary()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistLibrary',
    };
}

export function goToChecklistLibrary(navState)
{
    return dispatch => {
        if(checkNbActions(navState) === true)
            dispatch(resetChecklists());
        dispatch(navigateChecklistLibrary());
    }
}

function navigateChecklistDetails()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistDetails',
    };
}

export function goToChecklistDetails(navState)
{
    return dispatch => {
        if(checkNbActions(navState) === true)
            dispatch(resetChecklists());
        dispatch(navigateChecklistDetails());
    }
}

export function goToCreateChecklistStep1()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateChecklistStep1',
    };
}

function navigateChecklistExecute()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistExecute',
    };
}

export function goToChecklistExecute(navState)
{
    return dispatch => {
        if(checkNbActions(navState) === true)
            dispatch(resetChecklists());
        dispatch(navigateChecklistExecute());
    }
}