import { LOGOUT_USER } from '../actions/userActions/logoutUser';
import { GET_CURRENT_USER } from '../actions/userActions/getCurUser';

const curUserReducer = (state = {}, action) => {
  if (action.type === GET_CURRENT_USER) {
    return (state = action.user);
  }
  if (action.type == LOGOUT_USER) {
    return (state = {});
  }
  return state;
};

export default curUserReducer;
