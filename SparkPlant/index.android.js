import React, { Component } from "react";
import { AppRegistry} from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Login from './app/screens/Login';
import Dashboard from './app/screens/Dashboard';
import Tags from './app/screens/Tags';
import News from './app/screens/News';
import Checklists from './app/screens/Checklists';
import Analytics from './app/screens/Analytics';
import DrawerMenu from './app/components/Menu/Menu';

const Navigation = DrawerNavigator({
        Dashboard: { screen: Dashboard },
        Tags: { screen: Tags},
        Checklist : { screen : Checklists},
        News : { screen : News},
        Analytics : { screen : Analytics},
    },
    {
        contentComponent: DrawerMenu,
    }
);

const App = StackNavigator({
    Login: {
            screen: Login,
            navigationOptions : {
                header : null,
            }
        },
    Navigation: {
                screen: Navigation,
                navigationOptions: {
                    header : null,
                }
        },
});

AppRegistry.registerComponent("SparkPlant", () => App);

