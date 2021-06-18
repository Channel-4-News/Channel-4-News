import { combineReducers } from 'redux';
import choresReducer from './reducers/choresReducer';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';
import wishListReducer from './reducers/wishListReducer';
import { notificationReducer } from './reducers/notificationReducer';
import allowanceReducer from './reducers/allowanceReducer';
import kidsReducer from './reducers/kidsReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  chores: choresReducer,
  wishList: wishListReducer,
  notifications: notificationReducer,
  allowance: allowanceReducer,
  kids: kidsReducer,
});

export default rootReducer;
