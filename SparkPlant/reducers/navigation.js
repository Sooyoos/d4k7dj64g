import {
    NavigationActions,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import DrawerMenu from '../components/Menu/Menu';
import LoginScreen from '../containers/LoginScreen';
import DashboardScreen from '../containers/DashboardScreen';
import TagsScreen from '../containers/TagsScreen';
import NewsScreen from '../containers/NewsScreen';
import WaitingNews from '../containers/News/WaitingNews';
import NewsDetail from '../containers/News/NewsDetail';
import WaitingNewsDetail from '../containers/News/WaitingNewsDetail';
import CreateNewsStep1 from '../containers/News/CreateNewsStep1';
import CreateNewsStep2 from '../containers/News/CreateNewsStep2';
import CreateNewsPreview from '../containers/News/CreateNewsPreview';
import TagsFull from '../containers/Tags/TagsFull';
import CommentTag from '../containers/Tags/CommentTag';
import FilterTag from '../containers/Tags/FilterTag';
import TagActions from '../containers/Tags/TagActions';
import TagDetails from '../containers/Tags/TagDetails';
import TagHistory from '../containers/Tags/TagHistory';
import TakePictureTag from '../containers/Tags/TakePictureTag';
import TakeVideoTag from '../containers/Tags/TakeVideoTag';
import TransferTag from '../containers/Tags/TransferTag';
import CreateTagStep1 from '../containers/Tags/CreateTag/CreateTagStep1';
import CreateTagStep2 from '../containers/Tags/CreateTag/CreateTagStep2';
import CreateTagStep3 from '../containers/Tags/CreateTag/CreateTagStep3';
import CreateTagPreview from '../containers/Tags/CreateTag/CreateTagPreview';
import * as types from '../actions/types';

export const TagNavigator = StackNavigator(
    {
        Tags: {
            screen: TagsScreen,
            navigationOptions : {
                header : null,
            }
        },
        TagsFull: {
            screen: TagsFull,
            navigationOptions : {
                header : null,
            }
        },
        TagDetail: {
            screen: TagDetails,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
            }
        },
        TagHistory: {
            screen: TagHistory,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
            }
        },
        TagActions: {
            screen: TagActions,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
            }
        },
        CreateTagStep1: {
            screen: CreateTagStep1,
            navigationOptions : {
                header : null,
            }
        },
        CreateTagStep2: {
            screen: CreateTagStep2,
            navigationOptions : {
                header : null,
            }
        },
        CreateTagStep3: {
            screen: CreateTagStep3,
            navigationOptions : {
                header : null,
            }
        },
        CreateTagPreview: {
            screen: CreateTagPreview,
            navigationOptions : {
                header : null,
            }
        },
        CommentTag: {
            screen: CommentTag,
            navigationOptions : {
                header : null,
            }
        },
        TransferTag: {
            screen: TransferTag,
            navigationOptions : {
                header : null,
            }
        },
        TakePictureTag: {
            screen: TakePictureTag,
            navigationOptions : {
                header : null,
            }
        },
        TagVideoTag: {
            screen: TakeVideoTag,
            navigationOptions : {
                header : null,
            }
        },
        FilterTag: {
            screen: FilterTag,
            navigationOptions : {
                header : null,
            }
        }
    }
);

export const NewsNavigator = StackNavigator(
    {
        News: {
            screen: NewsScreen,
            navigationOptions : {
                header : null,
            }
        },
        WaitingNews: {
            screen: WaitingNews,
            navigationOptions : {
                header : null,
            }
        },
        NewsDetail: {
            screen: NewsDetail,
            navigationOptions : {
                header : null,
            }
        },
        WaitingNewsDetail: {
            screen: WaitingNewsDetail,
            navigationOptions : {
                header : null,
            }
        },
        CreateNewsStep1: {
            screen: CreateNewsStep1,
            navigationOptions : {
                header : null,
            }
        },
        CreateNewsStep2: {
            screen: CreateNewsStep2,
            navigationOptions : {
                header : null,
            }
        },
        CreateNewsPreview: {
            screen: CreateNewsPreview,
            navigationOptions : {
                header : null,
            }
        },
    }
);

export const MainNavigator = DrawerNavigator(
    {
        Dashboard: { screen: DashboardScreen},
        Tags: { screen: TagNavigator},
        News : { screen : NewsNavigator},
    },
    {
        contentComponent: DrawerMenu,
    }
);

export const AppNavigator = StackNavigator({
        LoginTab: {
            screen: LoginScreen,
            navigationOptions : {
                header : null,
            }
        },
        HomeTab: {
            screen: MainNavigator,
            navigationOptions : {
                header : null,
            }
        },
        Tags: {
        screen: TagNavigator,
        navigationOptions : {
            header : null,
        }
    }
});

const initialNavState = {
    index: 0,
    routes: [
        {
            key: 'LoginTab',
            routeName: 'LoginTab',
            routes: [
                { key: 'LoginTab', routeName: 'LoginTab' },
                { key: 'HomeTab', routeName: 'HomeTab' },
            ],
            index: 0,
        },
    ],
};

function navigateAction({ routeName, id }) {
    return NavigationActions.navigate({ routeName, params: { id } });
}

export const navigationReducer = {
    nav: (state = initialNavState, action) => {
        switch (action.type) {
            case 'Navigation/NAVIGATE':
                return AppNavigator.router.getStateForAction(navigateAction(action), state);
            case types.NAVIGATE_BACK:
                return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
            case types.NAVIGATE_HOME: {
                const resetState = {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Root' }),
                    ],
                };
                return AppNavigator.router.getStateForAction(NavigationActions.reset(resetState), state);
            }
            default:
                return state;
        }
    },
};