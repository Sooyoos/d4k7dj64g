import * as types from './types';
import { NavigationActions } from 'react-navigation'

export function navigateBack() {
    return {
        type: types.NAVIGATE_BACK,
    };
}

export function navigateHome() {
    return {
        type: types.NAVIGATE_HOME,
    };
}

export function resetAll()
{
    return (dispatch) => {
        dispatch(resetTags());
        dispatch(resetNews());
        dispatch(resetChecklists());
    }
}

export function resetTags() {
    return {
        type: types.NAVIGATE_RESET_TAGS,
    };
}

export function resetNews() {
    return {
        type: types.NAVIGATE_RESET_NEWS,
    };
}

export function resetChecklists() {
    return {
        type: types.NAVIGATE_RESET_CHECKLISTS,
    };
}

function menu(routeName)
{
    return {
        type : types.NAVIGATE_MENU,
        routeName : routeName,
    }
}

export function goToMenu(routeName)
{
    return (dispatch) => {
        dispatch(navigate('Menu'));
        dispatch(menu(routeName));
    }
}

export function navigate(routeName)
{
    return {
        type : 'Navigation/NAVIGATE',
        routeName : routeName,
    }
}

