import React, { Component } from 'react';

//Redux Imports
import { connect } from 'react-redux';

//MaterialUI Imports
import Avatar from '@material-ui/core/Avatar';

//Style Import
import '../../../public/style/childProfile.css';

//Component Imports
import SpendingGraph from '../SpendingGraph';

class ChildProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currUser } = this.props;
    const {
      firstName,
      lastName,
      email,
      username,
      imgUrl,
      transactions,
      balance,
      allowance,
    } = currUser;

    return allowance ? (
      <div className="profile-container">
        <h3>Hello {firstName}!</h3>
        <div className="graphics">
          <div>
            <Avatar id="avatar" alt="current user pic" src={imgUrl} />
            <h6>First Name:</h6>
            <p>{firstName}</p>
            <h6>Last Name:</h6>
            <p>{lastName}</p>
            <h6>Email:</h6>
            <p>{email}</p>
            <h6>Username:</h6>
            <p>{username}</p>
          </div>
          <div>
            <div>Money made this month:</div>
            <div>Next Allowance Payment:${allowance.amount}</div>
            <div>Balance: ${balance}</div>
          </div>
          <div>
            Spending History
            <SpendingGraph transactions={transactions} />
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
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(ChildProfile);
