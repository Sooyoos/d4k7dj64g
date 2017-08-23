import { combineReducers } from 'redux';
import { navigationReducer } from './navigation';
import { loginReducer } from './login';
import { tagsReducer } from './tags';
import { newsReducer } from './news';
import { utilsReducer } from './utils';
import { checklistsReducer } from './checklists';

export default combineReducers(Object.assign(
    navigationReducer,
    loginReducer,
    tagsReducer,
    newsReducer,
    utilsReducer,
    checklistsReducer,
));
