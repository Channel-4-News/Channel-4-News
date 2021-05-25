import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SignUp from './forms/SignUp';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>Our App!</div>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
