import React from 'react';
import SpendingGraph from './SpendingGraph';
import { Avatar } from '@material-ui/core';
import VirtualCard from '../forms/VirtualCard';

class ChildLandingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.user);
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
              <h4>SPENDING SNAPSHOT</h4>
              <SpendingGraph transactions={this.props.user.transactions} />
            </div>
            <div id="forBorder"></div>
            <div id="childLandingVirtualCard">
              <div>
                BALANCE &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;$
                {this.props.user.balance}
              </div>
              <VirtualCard />
              <div id="nextAllowance">
                Next allowance in {this.props.user.allowance.interval} day(s) $
                {this.props.user.allowance.amount}
              </div>
            </div>
          </div>
          {/* <div>Money made this month ${this.props.user.balance}</div>
          <div>
            Next allowance in {this.props.user.allowance.interval} day(s) $
            {this.props.user.allowance.amount}
          </div>
          <div>
            <div>Money spent this month:</div>
            <button>Chores</button>
            <button>Wishlist</button>
          </div> */}
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default ChildLandingPage;
