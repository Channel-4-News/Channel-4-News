import { combineReducers } from 'redux';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
});

export default rootReducer;
