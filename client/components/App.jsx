import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { attemptLogin } from '../store/actions/userActions/getCurUser';
import Chores from './chores/ChoresView';
import ChildProfile from './child components/ChildProfile';
import JoinOrCreateFamily from './forms/JoinOrCreateFamily';
import LogIn from './forms/LogIn';
import Register from './forms/Register';
import NavBar from './NavBar';
import WishList from './wishListComponents/WishList';
import ChildLandingPage from './child components/ChildLandingPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//For testing purposes
import EditChildInfo from './forms/EditChildInfo';
import Dummy from './dummyPage/dummy';
import Home from './Home';

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
    const parentTheme = createMuiTheme({
      palette: {
        primary: {
          light: '#e6f2f9',
          main: '#c9d4db',
          dark: '#b4bfc6',
          contrastText: '#fff',
        },
        secondary: {
          light: '#62efff',
          main: '#00bcd4',
          dark: '#008ba3',
          contrastText: '#000',
        },
      },
    });

    const kidTheme = createMuiTheme({
      palette: {
        primary: {
          light: '#7fc8ff',
          main: '#3e98ff',
          dark: '#006bcb',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff5993',
          main: '#ef0066',
          dark: '#b6003c',
          contrastText: '#000',
        },
      },
    });
    return (
      <ThemeProvider
        theme={this.state.user.status === 'Parent' ? parentTheme : kidTheme}
      >
        <Router>
          <NavBar user={this.state.user} />
          <div id="mainAppContent">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/login" component={LogIn} />
              <Route
                exact
                path="/createfamily"
                component={JoinOrCreateFamily}
              />
              <Route exact path="/chores" component={Chores} />
              <Route exact path="/childprofile" component={ChildProfile} />
              <Route
                exact
                path="/childlandingpage"
                component={() => <ChildLandingPage user={this.state.user} />}
              />
              <Route exact path="/editchildinfo" component={EditChildInfo} />
              <Route
                exact
                path="/wishlist"
                component={() => <WishList user={this.state.user} />}
              />
              <Route exact path="/dummy" component={Dummy} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
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
