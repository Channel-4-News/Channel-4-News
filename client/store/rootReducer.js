import { combineReducers } from 'redux';
import familyReducer from './reducers/familyReducer';
import curUserReducer from './reducers/userReducer';
import wishListReducer from './reducers/wishListReducer';

const rootReducer = combineReducers({
  currUser: curUserReducer,
  family: familyReducer,
  wishList: wishListReducer,
});

export default rootReducer;
