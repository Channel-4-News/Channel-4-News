import React from 'react';
import { connect } from 'react-redux';

class ParentAllowanceInterval extends React.Component {
  constructor() {
    super();
    this.state = {
      daysToAllowance: '',
      allowance: '',
    };
  }

  render() {
    const { daysToAllowance, allowance } = this.props;
    return daysToAllowance ? (
      <div id="PLnextAllowance">
        Next allowance in {daysToAllowance}{' '}
        {daysToAllowance > 1 ? 'days' : 'day'}
        &nbsp;&nbsp;
        <span style={{ color: 'tomato' }}>|</span> &nbsp; ${allowance}
      </div>
    ) : (
      <div id="PLnextAllowance">
        Allowance today &nbsp;<span style={{ color: 'tomato' }}>|</span> &nbsp;
        ${allowance}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currUser,
    daysToAllowance: state.kids.find((kid) => kid.id === ownProps.kid.id)
      .daysToAllowance,
    allowance: state.kids.find((kid) => kid.id === ownProps.kid.id).allowance,
  };
};

export default connect(mapStateToProps)(ParentAllowanceInterval);
