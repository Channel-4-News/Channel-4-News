import { combineReducers } from 'redux';
import curUserReducer from './reducers/userReducer';

const rootReducer = combineReducers({ currUser: curUserReducer });

export default rootReducer;
