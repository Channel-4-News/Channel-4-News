import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildCard from './ChildCard';
import { getKids } from '../../store/actions/parentActions/getKids';
import { getChores } from '../../store/actions/choreActions/fetchChoresByFamily';
import ParentGraph from './ParentGraph';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LandingPlaidLink from './LandingPlaidLink';
import EmailInviteModal from './EmailInviteModal';
import EmailInviteForm from './EmailInviteForm';


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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  setWinner(winner) {
    this.setState({ ...this.state, winner: winner });
  }

  render() {
    const { kids, user, chores } = this.props;

    return this.props.user.family ? (
      <div
        id={
          kids.length
            ? 'parentLandingPageBackground'
            : 'newParentLandingPageBackground'
        }
      >
        <div id="helloParent">Hello, {user.firstName}!</div>
        <div id="PLoverviewCard">
          <div id="PLwelcomeCard1">
            <div id="familySnapshot">FAMILY SNAPSHOT</div>
            {kids.length > 1 ? (
              <div id="notACompetition">
                {` It's not a competition, but if it were, ${this.state.winner} would be winning.`}
              </div>
            ) : !kids.length ? (
              <div id="notACompetition">
                It&apos;s not a competition, but if it were, this graph would
                make sure you know who&apos;s winning.{' '}
              </div>
            ) : (
              <div id="notACompetition">
                Track how many chores your kid has completed.
              </div>
            )}
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
            </div>
            <LandingPlaidLink />
            <EmailInviteModal />
            {/* <Button variant="contained" id="PLinviteFamily">
              Invite Family Members
            </Button> */}
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
                parentID={this.props.user.id}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <EmailInviteForm />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
    kids: state.kids.sort((a, b) => {
      if (b.id > a.id) {
        return -1;
      }
      if (b.id < a.id) {
        return 1;
      }
      return 0;
    }),
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
