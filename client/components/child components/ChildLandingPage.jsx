import React from 'react';
import SpendingGraph from './SpendingGraph';
import { Avatar } from '@material-ui/core';
import VirtualCard from '../forms/VirtualCard';
import { connect } from 'react-redux';
import Balance from './allowance components/Balance';
import AllowanceInterval from './allowance components/AllowanceInterval';

class ChildLandingPage extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
    allowance: state.allowance,
  };
};

export default connect(mapStateToProps)(ChildLandingPage);
