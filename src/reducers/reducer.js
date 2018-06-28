import { combineReducers } from 'redux';
import bookmarkListReducer from './bookmarkListReducer';
import loginReducer from './loginReducer';
import appReducer from './appReducer';

/**
 * List All reducers to supply combined to store
 */
export default combineReducers({
    bookmarkListReducer,
    loginReducer,
    appReducer
});