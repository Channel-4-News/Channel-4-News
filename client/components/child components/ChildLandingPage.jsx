import React from 'react';
import SpendingGraph from './SpendingGraph';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import VirtualCard from '../forms/VirtualCard';

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
              <div style={{ fontSize: 'larger' }}>
                BALANCE &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;$
                {this.props.user.balance}
              </div>
              <VirtualCard />
              <div id="nextAllowance">
                Next allowance in {this.props.user.daysToAllowance}{' '}
                {this.props.user.daysToAllowance > 1 ? 'days' : 'day'}
                &nbsp;&nbsp;
                <span style={{ color: 'tomato' }}>|</span> &nbsp; $
                {this.props.user.allowance}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};

export default connect(mapStateToProps)(ChildLandingPage);
