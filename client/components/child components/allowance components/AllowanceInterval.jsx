import React from 'react';
import { connect } from 'react-redux';

const AllowanceInterval = (props) => {
  return (
    <div id="nextAllowance">
      Next allowance in {props.user.daysToAllowance}{' '}
      {props.user.daysToAllowance > 1 ? 'days' : 'day'}
      &nbsp;&nbsp;
      <span style={{ color: 'tomato' }}>|</span> &nbsp; ${props.user.allowance}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.currUser };
};

export default connect(mapStateToProps)(AllowanceInterval);
