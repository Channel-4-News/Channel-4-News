import React from 'react';
import { connect } from 'react-redux';

const ParentBalance = (props) => {
  return (
    <div>
      <div style={{ fontSize: 'larger' }} className="parentBalance">
        <div style={{ color: 'rgb(184, 184, 184)', fontSize: 'medium' }}>
          BALANCE
        </div>
        <div>${props.balance}</div>
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
