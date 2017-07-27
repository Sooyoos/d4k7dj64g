export function goToNewsPage()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'News',
    };
}

export function goToWaitingNews()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'WaitingNews',
    };
}

export function goToNewsDetail()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'NewsDetail',
    };
}

export function goToWaitingNewsDetail()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'WaitingNewsDetail',
    };
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