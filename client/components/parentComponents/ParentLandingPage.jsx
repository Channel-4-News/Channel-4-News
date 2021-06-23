import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';
import { getKids } from '../../store/actions/parentActions/getKids';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';
import ParentGraph from './ParentGraph';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export class ParentLandingPage extends Component {
  constructor(props) {
    super(props);
    this.getKids = this.getKids.bind(this);
    this.state = {
      user: {},
      winner: '',
    };
    this.setWinner = this.setWinner.bind(this);
  }

  getKids() {
    this.props.getKids(this.props.user.id);
  }

  componentDidMount() {
    this.props.getChores(this.props.user.familyId);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  setWinner(winner) {
    this.setState({ ...this.state, winner: winner });
  }

  render() {
    const { kids, user, chores } = this.props;

    return this.props.user.family ? (
      <div id="parentLandingPageBackground">
        <div id="helloParent">Hello, {user.firstName}!</div>
        <div id="PLoverviewCard">
          <div id="PLwelcomeCard1">
            <div id="familySnapshot">FAMILY SNAPSHOT</div>
            <div id="notACompetition">
              {` It's not a competition, but if it were, ${this.state.winner} would be winning.`}
            </div>
            <div id="parentGraph">
              <ParentGraph
                user={user}
                kids={kids}
                small={true}
                setWinner={this.setWinner}
              />
            </div>
          </div>
          <div id="PLwelcomeCard2">
            <div id="parentAvatar">
              <Avatar
                style={{ width: '170px', height: '170px' }}
                id="avatar"
                alt="current user pic"
                src={user.imgUrl}
              />
              {/* <LinkPlaid history={props.history} /> */}
            </div>
            <Button variant="contained" id="PLupdateBA">
              Update Bank Account
            </Button>
            <Button variant="contained" id="PLinviteFamily">
              Invite Family Members
            </Button>
          </div>
        </div>
        <div>
          {kids.map((kid) => {
            return (
              <ChildCard
                key={kid.id}
                kid={kid}
                getKids={this.props.getKids}
                chores={chores.filter((chore) => chore.userId === kid.id)}
              />
            );
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
    chores: state.chores,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getKids: (id) => dispatch(getKids(id)),
    getChores: (id) => dispatch(getChores(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentLandingPage);
