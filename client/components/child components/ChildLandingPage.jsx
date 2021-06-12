import React from 'react';
import SpendingGraph from './SpendingGraph';
import Avatar from '@material-ui/core/Avatar';
import SpendingCategories from './SpendingCategories';
import { HashRouter as Router, Link } from 'react-router-dom';

class ChildLandingPage extends React.Component {
  constructor() {
    super();
    this.categorizeTransactions = this.categorizeTransactions.bind(this);
  }
  categorizeTransactions() {
    let transactionsObject = {};
    this.props.user.transactions.map((transaction) => {
      if (!transactionsObject[transaction.category]) {
        transactionsObject[transaction.category] = parseInt(transaction.cost);
      } else {
        transactionsObject[transaction.category] += parseInt(transaction.cost);
      }
    });
    let total = 0;
    for (const [key, value] of Object.entries(transactionsObject)) {
      total += value;
    }
    let transactionsArray = [];
    for (const [key, value] of Object.entries(transactionsObject)) {
      let temp = {};
      temp[key] = [value, ((value / total) * 100).toFixed(2)];
      transactionsArray.push(temp);
    }
    return transactionsArray;
  }
  render() {
    let transactions = this.categorizeTransactions();
    return this.props.user.allowance ? (
      <div>
        <div>Hello {this.props.user.firstName}</div>
        <Avatar
          id="avatar"
          alt="current user pic"
          src={this.props.user.imgUrl}
        />
        <SpendingGraph transactions={this.props.user.transactions} />
        <div className="spendingCategories">
          {transactions.map((transaction) => {
            return (
              <div key={Object.values(transaction)}>
                <SpendingCategories transaction={transaction} />
              </div>
            );
          })}
        </div>
        <div>Current balance: ${this.props.user.balance}</div>
        {/* <div>
          Next allowance in {this.props.user.allowance.interval} day(s) $
          {this.props.user.allowance.amount}
        </div> */}
        <div>
          <div>
            Money spent this month: $
            {transactions
              .reduce((accum, val) => {
                return accum + Object.values(val)[0][0];
              }, 0)
              .toFixed(2)}
          </div>
          <Link to="/chores">
            <button> Chores</button>
          </Link>
          <button>Withdraw</button>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default ChildLandingPage;
