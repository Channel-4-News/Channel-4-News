import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>TEST</div>
      </Router>
    );
  }
}

export default connect()(App);
