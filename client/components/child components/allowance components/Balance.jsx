import React from 'react';
import { connect } from 'react-redux';

const Balance = (props) => {
  return (
    <div>
      <div style={{ fontSize: 'larger' }}>
        BALANCE &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;$
        {props.user.balance}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.currUser };
};

export default connect(mapStateToProps)(Balance);
