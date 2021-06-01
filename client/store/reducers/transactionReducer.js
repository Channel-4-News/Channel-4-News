import { PURCHASE_OR_WITHDRAW } from '../actions/wishListActions/purchaseOrWithdraw';

const transactionReducer = (state = [], action) => {
  if (action.type === PURCHASE_OR_WITHDRAW) {
    return [...state, action.transaction];
  }
  return state;
};

export default transactionReducer;
