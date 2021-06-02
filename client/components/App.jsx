import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { attemptLogin } from '../store/actions/userActions/getCurUser';
import Chores from './chores/ChoresView';
import ChildProfile from './childComponents/ChildProfile';
import JoinOrCreateFamily from './forms/JoinOrCreateFamily';
import LogIn from './forms/LogIn';
import Register from './forms/Register';
import NavBar from './NavBar';
import WishList from './wishListComponents/WishList';

//Here for testing purposes
import EditChildProfile from './childComponents/EditChildProfile';
import ChooseFile from './childComponents/ChooseFile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    await this.props.attemptLogin();
    await this.setState({ ...this.state, user: this.props.currUser });
  }

  componentDidUpdate() {
    if (this.props.currUser.status !== this.state.user.status) {
      this.setState({ ...this.state, user: this.props.currUser });
    }
  }

  render() {
    return (
      <Router>
        <NavBar user={this.state.user} />
        <div id="mainAppContent">
          <Switch>
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/createfamily" component={JoinOrCreateFamily} />
            <Route exact path="/chores" component={Chores} />
            <Route exact path="/childprofile" component={ChildProfile} />
            <Route
              exact
              path="/editchildprofile"
              component={EditChildProfile}
            />
            <Route exact path="/choosefile" component={ChooseFile} />
            <Route
              exact
              path="/wishlist"
              component={() => <WishList user={this.state.user} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(attemptLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
