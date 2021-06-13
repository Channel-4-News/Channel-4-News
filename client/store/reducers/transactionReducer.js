import { PURCHASE_OR_WITHDRAW } from '../actions/wishListActions/purchaseOrWithdraw';

const transactionReducer = (state = {}, action) => {
  if (action.type === PURCHASE_OR_WITHDRAW) {
    return {
      ...state,
      currUser: {
        ...state.currUser,
        transactions: [action.transactionData.newTransaction],
      },
    };
  }
  return state;
};

export default transactionReducer;
