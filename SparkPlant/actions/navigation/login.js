export function goToLogin()
{
    return {
        type: 'Navigation/NAVIGATE',
        routeName: 'LoginTab',
    };
}