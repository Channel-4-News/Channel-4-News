import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

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

  let card = 'ic_1IzufNGMLeOpoTZxPd1bYRNy';
  useEffect(() => {
    const getTransactions = async () => {
      const transactions = (await axios.get(`/api/stripe/transactions/${card}`))
        .data;
      setTransactions(transactions.data);
    };
    getTransactions();
  }, []);

  console.log(new Date(1624153872 * 1000));
  console.log(transactions);
  return (
    <div id="listTransactions">
      <div id="transactionHeader">TRANSACTIONS</div>
      {transactions.map((transaction, idx) => {
        const date = new Date(1624153872 * 1000);
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

const mapStateToProps = () => {};

export default connect()(Transactions);
