import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import JoinOrCreateFamily from './forms/JoinOrCreateFamily';
import LogIn from './forms/LogIn';
import Register from './forms/Register';
import NavBar from './NavBar';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/createfamily" component={JoinOrCreateFamily} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
