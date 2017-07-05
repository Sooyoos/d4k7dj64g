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
import TagsFull from './app/screens/Tags/TagsFull';
import FilterTag from './app/screens/Tags/FilterTag';
import CreateTagStep1 from './app/screens/Tags/CreateTag/CreateTagStep1';
import CreateTagStep2 from './app/screens/Tags/CreateTag/CreateTagStep2';
import CreateTagStep3 from './app/screens/Tags/CreateTag/CreateTagStep3';
import CreateTagPreview from './app/screens/Tags/CreateTag/CreateTagPreview';

const TagNavigation = StackNavigator(
    {
        Tags: {
            screen: Tags,
            navigationOptions : {
                header : null,
            }
        },
        FilterTag: {
            screen: FilterTag,
            navigationOptions: {
                header : null,
            }
        },
        AllTags: {
            screen: TagsFull,
            navigationOptions: {
                header : null,
            }
        },
        CreateTagStep1 : {
            screen: CreateTagStep1,
            navigationOptions: {
                header : null,
            }
        },
        CreateTagStep2 : {
            screen: CreateTagStep2,
            navigationOptions: {
                header : null,
            }
        },
        CreateTagStep3 : {
            screen: CreateTagStep3,
            navigationOptions: {
                header : null,
            }
        },
        CreateTagPreview : {
            screen: CreateTagPreview,
            navigationOptions: {
                header : null,
            }
        }
    }
);

const Navigation = DrawerNavigator({
        Dashboard: { screen: Dashboard },
        Tags: { screen: TagNavigation},
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

