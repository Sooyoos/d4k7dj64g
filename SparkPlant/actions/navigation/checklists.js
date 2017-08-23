export function goToChecklistPage()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'Checklist',
    };
}

export function goToChecklistLibrary()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistLibrary',
    };
}

export function goToChecklistDetails()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistDetails',
    };
}

export function goToCreateChecklistStep1()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CreateChecklistStep1',
    };
}

export function goToChecklistExecute()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'ChecklistExecute',
    };
}