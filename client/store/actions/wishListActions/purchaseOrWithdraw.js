import axios from 'axios';

const PURCHASE_OR_WITHDRAW = 'PURCHASE_OR_WITHDRAW';

const purchaseOrWithdraw = (userId, transaction) => {
  return async (dispatch) => {
    try {
      const newTransaction = (
        await axios.post(`/api/transaction/${userId}`, transaction)
      ).data;
      dispatch(_purchaseOrWithdraw(newTransaction));
    } catch (err) {
      console.log(err);
    }
  };
};

const _purchaseOrWithdraw = (transaction) => {
  return { type: PURCHASE_OR_WITHDRAW, transaction };
};

export { PURCHASE_OR_WITHDRAW, purchaseOrWithdraw };
