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
import Notification from '../components/notifications/Notification';
import SortNotifications from './notifications/SortNotifications';
import store from '../store/store';
import { sendNotification } from '../store/actions/notificationActions/sendNotification';
import websocket from '../store/actions/notificationActions/sendNotification';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {
  choreSuccess,
  choreIncomplete,
} from './notifications/notificationUtils';

//Thunk Import
import { loadNotificationsThunk } from '../store/actions/notificationActions/loadNotification';
import EditChildInfo from './forms/EditChildInfo';
import Dummy from './dummyPage/dummy';
import Home from './Home';
import LinkPlaid from './PlaidLink';
import VirtualCard from './forms/VirtualCard';
import CreateCard from './forms/CreateCard';

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
    websocket.addEventListener('message', (ev) => {
      const action = JSON.parse(ev.data);
      if (action.id) {
        action.isChoreCompleted
          ? choreSuccess(action.text, action.amount)
          : choreIncomplete(action.text);
        store.dispatch(sendNotification(action));
      }
    });
  }

  componentDidUpdate() {
    if (this.props.currUser.status !== this.state.user.status) {
      this.setState({ ...this.state, user: this.props.currUser });
      if (this.props.currUser.status === 'Parent') {
        this.props.loadNotifications();
      }
      if (websocket.readyState === 1) {
        websocket.send(
          JSON.stringify({
            token: window.localStorage.getItem('userToken'),
          })
        );
      }
      websocket.addEventListener('open', () => {
        websocket.send(
          JSON.stringify({
            token: window.localStorage.getItem('userToken'),
          })
        );
      });
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
        <ReactNotification />
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
                path="/notifications"
                component={SortNotifications}
              />
              <Route
                exact
                path="/home"
                component={() =>
                  this.state.user.status === 'Child' ? <ChildLandingPage /> : ''
                }
              />
              <Route exact path="/editchildinfo" component={EditChildInfo} />
              <Route
                exact
                path="/wishlist"
                component={() => <WishList user={this.state.user} />}
              />
              <Route exact path="/dummy" component={Dummy} />
              <Route exact path="/link" component={LinkPlaid} />
              <Route exact path="/card" component={VirtualCard} />
              <Route exact path="/createcard" component={CreateCard} />
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
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(attemptLogin()),
    loadNotifications: () => dispatch(loadNotificationsThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
