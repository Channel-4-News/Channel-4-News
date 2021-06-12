import React from 'react';
import SpendingGraph from './SpendingGraph';
import Avatar from '@material-ui/core/Avatar';
import VirtualCard from '../forms/VirtualCard';

class ChildLandingPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props);
    return this.props.user.allowance ? (
      <div>
        <div>Hello {this.props.user.firstName}</div>
        <Avatar
          id="avatar"
          alt="current user pic"
          src={this.props.user.imgUrl}
        />
        <SpendingGraph transactions={this.props.user.transactions} />
        <VirtualCard />
        <div>Categories:</div>
        <div>Money made this month ${this.props.user.balance}</div>
        <div>
          Next allowance in {this.props.user.allowance.interval} day(s) $
          {this.props.user.allowance.amount}
        </div>
        <div>
          <div>Money spent this month:</div>
          <button>Chores</button>
          <button>Wishlist</button>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default ChildLandingPage;
