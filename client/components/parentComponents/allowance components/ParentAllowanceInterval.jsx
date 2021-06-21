import React from 'react';
import { connect } from 'react-redux';

class ParentAllowanceInterval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysToAllowance: 0,
      allowance: 0,
    };
  }

  async componentDidMount() {
    await this.setState({
      allowance: this.props.allowance,
      daysToAllowance: this.props.daysToAllowance,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.daysToAllowance !== this.props.daysToAllowance) {
      console.log('state', this.state.daysToAllowance);
      console.log('props', this.props.daysToAllowance);
      this.setState({ daysToAllowance: this.props.daysToAllowance });
    }
    if (this.state.allowance !== this.props.allowance) {
      console.log('state', this.state.allowance);
      console.log('props', this.props.allowance);
      this.setState({ allowance: this.props.allowance });
    }
  }

  render() {
    const { daysToAllowance, allowance } = this.state;
    return daysToAllowance ? (
      <div id="nextAllowance">
        Next allowance in {daysToAllowance}{' '}
        {daysToAllowance > 1 ? 'days' : 'day'}
        &nbsp;&nbsp;
        <span style={{ color: 'tomato' }}>|</span> &nbsp; ${allowance}
      </div>
    ) : (
      ''
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
