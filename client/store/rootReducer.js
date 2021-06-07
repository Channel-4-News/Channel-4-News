import { combineReducers } from 'redux';
import choresReducer from './reducers/choresReducer';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';
import wishListReducer from './reducers/wishListReducer';
import transactionReducer from './reducers/transactionReducer';
import { notificationReducer } from './reducers/notificationReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  chores: choresReducer,
  wishList: wishListReducer,
  transaction: transactionReducer,
  notifications: notificationReducer,
});

export default rootReducer;
