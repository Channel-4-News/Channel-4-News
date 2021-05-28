import { combineReducers } from 'redux';
import choresReducer from './reducers/choresReducer';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  chores: choresReducer,
});

export default rootReducer;
