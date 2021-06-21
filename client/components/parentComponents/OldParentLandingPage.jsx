import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';

export class ParentLandingPage extends Component {
  constructor() {
    super();
  }
  render() {
    return this.props.user.family ? (
      <div id="parentLandingPageBackground">
        <div>Hello {this.props.user.firstName}</div>
        <ChildCard kids={this.props.kids} userID={this.props.user.id} />
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
    kids: state.kids,
  };
};
export default connect(mapStateToProps)(ParentLandingPage);
