import { LOGOUT_USER } from '../actions/userActions/logoutUser';
import { GET_CURRENT_USER } from '../actions/userActions/getCurUser';
import { JOIN_FAMILY } from '../actions/familyActions/joinFamily';

const curUserReducer = (state = {}, action) => {
  if (action.type === GET_CURRENT_USER) {
    return (state = action.user);
  }
  if (action.type === LOGOUT_USER) {
    return (state = {});
  }
  if (action.type === JOIN_FAMILY) {
    return (state = action.user);
  }
  return state;
};

export default curUserReducer;
