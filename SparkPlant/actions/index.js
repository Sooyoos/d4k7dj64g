import * as NavigationActions from './navigations';
import * as LoginActions from './login';
import * as TagsActions from './tags';
import * as NewsActions from './news';
import * as UtilsActions from './utils';
import * as ChecklistsActions from './checklists';
import * as UsersActions from './users';
import * as ChartsActions from './charts';
import * as TagsNavigation from './navigation/tags';
import * as NewsNavigation from './navigation/news';
import * as LoginNavigation from './navigation/login';
import * as ChecklistsNavigation from './navigation/checklists';

export const ActionCreators = Object.assign({},
    NavigationActions,
    LoginActions,
    TagsActions,
    NewsActions,
    TagsNavigation,
    NewsNavigation,
    UtilsActions,
    ChartsActions,
    ChecklistsNavigation,
    LoginNavigation,
    ChecklistsActions,
    UsersActions,
);

export default ActionCreators;