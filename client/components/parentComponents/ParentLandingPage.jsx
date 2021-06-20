import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';

export class ParentLandingPage extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    return this.props.user.family ? (
      <div>
        <div>Hello {this.props.user.firstName}</div>
        <ChildCard kids={this.props.kids} />
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
    kids: state.currUser.family?.users.filter(
      (member) => member.status === 'Child'
    ),
  };
};
export default connect(mapStateToProps)(ParentLandingPage);
