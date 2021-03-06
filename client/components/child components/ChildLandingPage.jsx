import React from 'react';
import SpendingGraph from './SpendingGraph';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import VirtualCard from '../forms/VirtualCard';
import Balance from './allowance components/Balance';
import AllowanceInterval from './allowance components/AllowanceInterval';

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

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    let transactions = this.categorizeTransactions();
    this.props.user.imgUrl;
    // return this.props.user.allowance ? (
    return (
      <div id="childLandingPage">
        <p>Hello, {this.props.user.firstName}!</p>
        <div id="childLandingContainer">
          <div id="avatarWrapper">
            <Avatar
              style={{ width: '230px', height: '230px' }}
              id="avatar"
              alt="current user pic"
              src={this.props.user.imgUrl}
            />
          </div>
          <div id="childGraphics">
            <div style={{ width: '50%' }} id="spendingSnapshot">
              <div id="spendingSnapshotTitle">SPENDING SNAPSHOT</div>
              <SpendingGraph transactions={this.props.user.transactions} />
            </div>
            <div id="forBorder"></div>
            <div id="childLandingVirtualCard">
              <Balance />
              <VirtualCard />
              <AllowanceInterval />
            </div>
          </div>
          {!this.props.user?.transactions?.length ? (
            <div id="newCardMessage">
              New card? When you make a purchase, your spending snapshot will
              update and this terribly boring yet somewhat informative message
              will disappear. Use your spending snapshot to visualize how you
              are spending money, and to save and budget.
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};

export default connect(mapStateToProps)(ChildLandingPage);
