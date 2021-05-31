import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { attemptLogin } from '../store/actions/userActions/getCurUser';

import ChildProfile from './childComponents/ChildProfile';

import JoinOrCreateFamily from './forms/JoinOrCreateFamily';
import LogIn from './forms/LogIn';
import Register from './forms/Register';
import NavBar from './NavBar';

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

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/createfamily" component={JoinOrCreateFamily} />
          <Route exact path="/childprofile" component={ChildProfile} />
        </Switch>
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
