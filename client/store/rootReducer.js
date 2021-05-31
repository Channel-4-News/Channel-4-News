import { combineReducers } from 'redux';
import choresReducer from './reducers/choresReducer';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';
import wishListReducer from './reducers/wishListReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  chores: choresReducer,
  wishList: wishListReducer,
});

export default rootReducer;
