import React from 'react';
import { connect } from 'react-redux';

const Balance = (props) => {
  return (
    <div>
      <div style={{ fontSize: 'larger' }}>
        BALANCE &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;$
        {props.allowance.balance}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.currUser, allowance: state.allowance };
};

export default connect(mapStateToProps)(Balance);
