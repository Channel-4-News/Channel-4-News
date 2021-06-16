import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';

export class ParentLandingPage extends Component {
  constructor() {
    super();
    this.getKids = this.getKids.bind(this);
  }
  componentDidMount() {}
  componentDidUpdate() {}
  getKids() {
    const kids = this.props.user.family.users.filter(
      (member) => member.status === 'Child'
    );
    return kids;
  }
  render() {
    return this.props.user.family ? (
      <div>
        <div>Hello {this.props.user.firstName}</div>
        <ChildCard kids={this.getKids()} />
      </div>
    ) : (
      ''
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};
export default connect(mapStateToProps)(ParentLandingPage);
