import { SET_ALLOWANCE } from '../actions/allowance/setAllowance';
import { UPDATE_ALLOWANCE } from '../actions/allowance/updateAllowance';

const allowanceReducer = (state = {}, action) => {
  console.log(action);
  if (action.type === SET_ALLOWANCE) {
    return (state = {
      balance: action.balance,
      daysToAllowance: action.daysToAllowance,
    });
  }
  if (action.type === UPDATE_ALLOWANCE) {
    return (state = {
      balance: action.balance,
      daysToAllowance: action.daysToAllowance,
    });
  }
  return state;
};

export default allowanceReducer;
