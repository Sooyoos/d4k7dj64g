import * as NavigationActions from './navigations';
import * as LoginActions from './login';
import * as TagsActions from './tags';

export const ActionCreators = Object.assign({},
    NavigationActions,
    LoginActions,
    TagsActions
);

export default ActionCreators;