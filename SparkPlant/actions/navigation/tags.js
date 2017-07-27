export function goToTagsPage()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'Tags',
    };
}

export function goToTagsFull()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagsFull',
    };
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

export function goToTagDetails(tag)
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagDetail',
        tag : tag,
    };
}

export function goToTagHistory(tag)
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagHistory',
        tag : tag,
    };
}

export function goToTagAction(tag)
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TagActions',
        tag : tag,
    };
}

export function goToTagComment(tag)
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'CommentTag',
        tag : tag,
    };
}

export function goToTagTransfer(tag)
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'TransferTag',
        tag : tag,
    };
}