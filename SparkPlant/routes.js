import React from 'react';
import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import DrawerMenu from './components/Menu/Menu';
import LoginScreen from './containers/LoginScreen';
import DashboardScreen from './containers/DashboardScreen';
import TagsScreen from './containers/TagsScreen';

export const MainNav = DrawerNavigator(
    {
        Dashboard: { screen: DashboardScreen},
        Tags: { screen: TagsScreen},
    },
    {
        contentComponent: DrawerMenu,
    }
);

export const LoginNav = StackNavigator({
    LoginTab: {
        screen: LoginScreen,
    },
    HomeTab: {
        screen: MainNav,
    }},
    {
        headerMode : 'none',
    },);


export const StacksOverTabs = {
    Root: {
        screen: LoginNav,
    },
};