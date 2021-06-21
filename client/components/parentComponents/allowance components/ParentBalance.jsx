import React, { useState } from 'react';
import { connect } from 'react-redux';

const ParentBalance = (props) => {
  return (
    <div>
      <div style={{ fontSize: 'larger' }}>
        BALANCE &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;$
        {props.balance}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currUser,
    balance: state.kids.find((kid) => kid.id === ownProps.kid.id).balance,
  };
};

export default connect(mapStateToProps)(ParentBalance);
