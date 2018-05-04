import {
    NavigationActions,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import DrawerMenu from '../components/Menu/Menu';
import LoginScreen from '../containers/LoginScreen';
import DashboardScreen from '../containers/DashboardScreen';
import InfoScreen from '../containers/InfoScreen';
import TagsScreen from '../containers/TagsScreen';
import NewsScreen from '../containers/NewsScreen';
import ChecklistScreen from '../containers/ChecklistScreen';
import ChecklistLibrary from '../containers/Checklist/ChecklistLibrary';
import ChecklistDetails from '../containers/Checklist/ChecklistDetails';
import ChecklistCreateStep1 from '../containers/Checklist/ChecklistCreateStep1';
import ChecklistExecute from '../containers/Checklist/ChecklistExecute';
import ChecklistHistory from '../containers/Checklist/ChecklistHistory';
import ChecklistHistoryDetails from '../containers/Checklist/ChecklistHistoryDetails';
import WaitingNews from '../containers/News/WaitingNews';
import NewsDetail from '../containers/News/NewsDetail';
import WaitingNewsDetail from '../containers/News/WaitingNewsDetail';
import CreateNewsStep1 from '../containers/News/CreateNewsStep1';
import CreateNewsStep2 from '../containers/News/CreateNewsStep2';
import CreateNewsPreview from '../containers/News/CreateNewsPreview';
import SearchNews from '../containers/News/SearchNews';
import SearchWaitingNews from '../containers/News/SearchWaitingNews';
import TagsFull from '../containers/Tags/TagsFull';
import CommentTag from '../containers/Tags/CommentTag';
import FilterTag from '../containers/Tags/FilterTag';
import SearchTags from '../containers/Tags/SearchTags';
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
import RecordAudio from '../containers/Tags/CreateTag/RecordAudio';
import ChartsScreen from '../containers/ChartsScreen';
import ScoringScreen from '../containers/ScoringScreen';
import FullscreenImage from "../containers/Tags/FullscreenImage";
import * as types from '../actions/types';

export const ChartsNavigator = StackNavigator(
    {
        Charts: {
            screen: ChartsScreen,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,
            }
        },
    }
);

export const TagNavigator = StackNavigator(
    {
        Tags: {
            screen: TagsScreen,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TagsFull: {
            screen: TagsFull,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TagDetail: {
            screen: TagDetails,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TagHistory: {
            screen: TagHistory,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TagActions: {
            screen: TagActions,
            path: 'tag/:tag',
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateTagStep1: {
            screen: CreateTagStep1,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateTagStep2: {
            screen: CreateTagStep2,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateTagStep3: {
            screen: CreateTagStep3,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateTagPreview: {
            screen: CreateTagPreview,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CommentTag: {
            screen: CommentTag,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TransferTag: {
            screen: TransferTag,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TakePictureTag: {
            screen: TakePictureTag,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        TagVideoTag: {
            screen: TakeVideoTag,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        FilterTag: {
            screen: FilterTag,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        SearchTags: {
            screen: SearchTags,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        RecordAudio: {
            screen: RecordAudio,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        FullscreenImage: {
            screen: FullscreenImage,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
    }
);

export const NewsNavigator = StackNavigator(
    {
        News: {
            screen: NewsScreen,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        WaitingNews: {
            screen: WaitingNews,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        NewsDetail: {
            screen: NewsDetail,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        WaitingNewsDetail: {
            screen: WaitingNewsDetail,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateNewsStep1: {
            screen: CreateNewsStep1,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateNewsStep2: {
            screen: CreateNewsStep2,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateNewsPreview: {
            screen: CreateNewsPreview,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        SearchNews: {
            screen: SearchNews,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        SearchWaitingNews: {
            screen: SearchWaitingNews,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
    }
);

export const ChecklistNavigator = StackNavigator(
    {
        Checklist: {
            screen: ChecklistScreen,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        ChecklistLibrary: {
            screen: ChecklistLibrary,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        ChecklistDetails: {
            screen: ChecklistDetails,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        CreateChecklistStep1: {
            screen: ChecklistCreateStep1,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        ChecklistExecute: {
            screen: ChecklistExecute,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        ChecklistHistory: {
            screen: ChecklistHistory,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        ChecklistHistoryDetails: {
            screen: ChecklistHistoryDetails,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        }
    }
);

export const MainNavigator = StackNavigator({
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions : {
            header : null,
            gesturesEnabled: false,
        }
    },
    Tags: {
        screen: TagNavigator
    },
    News : {
        screen : NewsNavigator
    },
    Checklists : {
        screen : ChecklistNavigator
    },
    Charts : {
        screen : ChartsNavigator
    },
    Info: {
        screen: InfoScreen,
        navigationOptions : {
            header : null,
            gesturesEnabled: false,
        }
    },
    Scoring: {
        screen: ScoringScreen,
        navigationOptions : {
            header : null,
            gesturesEnabled: false,
        }
    }
});

export const AppNavigator = StackNavigator({
        LoginTab: {
            screen: LoginScreen,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        HomeTab: {
            screen: MainNavigator,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        Menu: {
            screen: DrawerMenu,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            }
        },
        Tags: {
            screen: TagNavigator,
            navigationOptions : {
                header : null,
                gesturesEnabled: false,
            },
        },
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
                { key: 'Menu', routeName: 'Menu' },
            ],
            index: 0,
        },
    ],
    lastRoute : null,
    nbRoutes : 0,
    from : null,
};

function navigateAction({ routeName, id }) {
    return NavigationActions.navigate({ routeName, params: { id } });
}

export const navigationReducer = {
    nav: (state = initialNavState, action) => {
        switch (action.type) {
            case 'Navigation/NAVIGATE': {
                var newNb = state.nbRoutes + 1;
                var route = action.routeName;
                var newState = Object.assign({}, state, {lastRoute : route, nbRoutes : newNb});
                return AppNavigator.router.getStateForAction(navigateAction(action), newState);
            }
            case types.NAVIGATE_MENU : {
                return Object.assign({}, state, { from : action.routeName });
            }
            case types.NAVIGATE_RESET_TAGS : {
               return Object.assign({}, state, getStateForResetTags(state));
            }
            case types.NAVIGATE_RESET_NEWS : {
                return Object.assign({}, state, getStateForResetNews(state));
            }
            case types.NAVIGATE_RESET_CHECKLISTS : {
                return Object.assign({}, state, getStateForResetChecklists(state));
            }
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