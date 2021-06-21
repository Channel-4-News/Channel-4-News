import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';
import { getKids } from '../../store/actions/parentActions/getKids';

export class ParentLandingPage extends Component {
  constructor(props) {
    super(props);
    this.getKids = this.getKids.bind(this);
  }

  getKids() {
    this.props.getKids(this.props.user.id);
  }

  render() {
    const { kids } = this.props;
    return this.props.user.family ? (
      <div id="parentLandingPageBackground">
        <div>Hello {this.props.user.firstName}</div>
        <div>
          {kids.map((kid) => {
            return <ChildCard key={kid.id} kid={kid} getKids={this.getKids} />;
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

const mapDispatchToProps = (dispatch) => {
  return {
    getKids: (id) => dispatch(getKids(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentLandingPage);
