import React from 'react';
import { connect } from 'react-redux';

const ParentAllowanceInterval = (props) => {
  return props.daysToAllowance ? (
    <div id="nextAllowance">
      Next allowance in {props.daysToAllowance}{' '}
      {props.daysToAllowance > 1 ? 'days' : 'day'}
      &nbsp;&nbsp;
      <span style={{ color: 'tomato' }}>|</span> &nbsp; ${props.allowance}
    </div>
  ) : (
    ''
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currUser,
    daysToAllowance: state.kids.find((kid) => kid.id === ownProps.kid.id)
      .daysToAllowance,
    allowance: state.kids.find((kid) => kid.id === ownProps.kid.id).allowance,
  };
};

export default connect(mapStateToProps)(ParentAllowanceInterval);
