import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';

export class ParentLandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { kids } = this.props;
    return this.props.user.family ? (
      <div id="parentLandingPageBackground">
        <div>Hello {this.props.user.firstName}</div>
        <div>
          {kids.map((kid) => {
            return <ChildCard key={kid.id} kid={kid} />;
          })}
        </div>
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
