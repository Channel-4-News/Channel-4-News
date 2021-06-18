import { LOGOUT_USER } from '../actions/userActions/logoutUser';
import { GET_CURRENT_USER } from '../actions/userActions/getCurUser';
import { JOIN_FAMILY } from '../actions/familyActions/joinFamily';
import { UPDATE_CHILD_PROFILE } from '../actions/userActions/editChildProfile';
import { UPDATE_CARD } from '../actions/cardActions/updateCard';
import { UPDATE_ALLOWANCE } from '../actions/allowance/updateAllowance';
import { PURCHASE_OR_WITHDRAW } from '../actions/wishListActions/purchaseOrWithdraw';

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
  if (action.type === UPDATE_CHILD_PROFILE) {
    state = action.updatedUser;
    return state;
  }
  if (action.type === UPDATE_CARD) {
    return (state = {
      ...state,
      cardImage: action.image,
      cardColor: action.color,
      virtualCard: action.cardNumber,
    });
  }
  if (action.type === PURCHASE_OR_WITHDRAW) {
    return {
      ...state,
      transactions: [...state.transactions, action.transaction],
    };
  }
  return state;
};
export default curUserReducer;
