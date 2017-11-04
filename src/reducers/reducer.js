import { combineReducers } from 'redux';
import bookmarkListReducer from './bookmarkListReducer';

/**
 * List All reducers to supply combined to store
 */
export default combineReducers({
    bookmarkListReducer
});