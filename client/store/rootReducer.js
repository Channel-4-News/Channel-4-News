import { combineReducers } from 'redux';
import choresReducer from './reducers/choresReducer';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';
import wishListReducer from './reducers/wishListReducer';
import transactionReducer from './reducers/transactionReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  chores: choresReducer,
  wishList: wishListReducer,
  transaction: transactionReducer,
});

export default rootReducer;
