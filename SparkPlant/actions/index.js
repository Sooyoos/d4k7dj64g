import * as NavigationActions from './navigations';
import * as LoginActions from './login';
import * as TagsActions from './tags';
import * as NewsActions from './news';
import * as TagsNavigation from './navigation/tags';
import * as NewsNavigation from './navigation/news';

export const ActionCreators = Object.assign({},
    NavigationActions,
    LoginActions,
    TagsActions,
    NewsActions,
    TagsNavigation,
    NewsNavigation,
);

export default ActionCreators;