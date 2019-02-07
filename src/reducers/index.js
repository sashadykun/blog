import { combineReducers } from 'redux';
import postReducer from './posts_reducer';
import usersReducer from './users_reducer';

export default combineReducers({
    posts: postReducer,
    users: usersReducer
});