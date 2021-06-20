import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { forEach } from 'lodash';

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
  };

  //this should be removed after this component is placed on child card for parent landing page.
  //we should grab child card Id from user model instance virtualCard depending on which child's card we
  //are on
  let card = 'ic_1IzufNGMLeOpoTZxPd1bYRNy';

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = (await axios.get(`/api/stripe/transactions/${card}`))
        .data;
      await setTransactions(transactions.data);
    };
    getTransactions();
  }, []);

  return (
    <div id="listTransactions">
      <div id="transactionHeader">TRANSACTIONS</div>
      {transactions.map((transaction, idx) => {
        const date = new Date(transaction.created * 1000);
        return (
          <div
            key={transaction.id}
            className={
              idx % 2 === 0
                ? 'transactionContainer greyTransaction'
                : 'transactionContainer'
            }
          >
            <div>{`${
              days[date.getDay()]
            } ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} `}</div>
            <div>${Math.abs(transaction.amount / 100).toFixed(2)}</div>
            <div>{transaction.merchant_data.name}</div>
            <div>{transaction.merchant_data.category}</div>
            <div>
              {transaction.merchant_data.city}
              {', '} {transaction.merchant_data.state}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
