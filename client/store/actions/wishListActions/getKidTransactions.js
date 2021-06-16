// const GET_KID_TRANSACTIONS = 'GET_KID_TRANSACTIONS';

// const getKidTransactions = (kidID) => {
//   return async (dispatch) => {
//     try {
//       const transactions = await axios.get(`/api/transaction/${kidID}`).data;
//       dispatch(_getKidTransactions(transactions));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// const _getKidTransactions = (transactions) => {
//   return { type: GET_KID_TRANSACTIONS, transactions };
// };

// export { getKidTransactions, GET_KID_TRANSACTIONS };
