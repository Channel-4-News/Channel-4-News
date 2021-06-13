import axios from 'axios';

const PURCHASE_OR_WITHDRAW = 'PURCHASE_OR_WITHDRAW';

const purchaseOrWithdraw = (userId, transaction) => {
  return async (dispatch) => {
    try {
      const newTransaction = (
        await axios.post(`/api/transaction/${userId}`, transaction)
      ).data;
      let newBalance = await axios.post('/api/stripe/payouts', {
        userId,
        transaction,
      });
      newBalance = newBalance.data.balance.toFixed(2);
      dispatch(_purchaseOrWithdraw({ newTransaction, newBalance }));
    } catch (err) {
      console.log(err);
    }
  };
};

const _purchaseOrWithdraw = (transactionData) => {
  return { type: PURCHASE_OR_WITHDRAW, transactionData };
};

export { PURCHASE_OR_WITHDRAW, purchaseOrWithdraw };
