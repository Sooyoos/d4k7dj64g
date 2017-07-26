import { combineReducers } from 'redux';
import { navigationReducer } from './navigation';
import { loginReducer } from './login';
import { tagsReducer } from './tags';

export default combineReducers(Object.assign(
    navigationReducer,
    loginReducer,
    tagsReducer,
));
