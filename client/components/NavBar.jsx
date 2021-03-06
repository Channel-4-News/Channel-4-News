import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { logout } from '../store/actions/userActions/logoutUser';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';

//Component Imports
import Settings from './Settings';

//CSS Imports
import '../../public/style/navbar.css';

const NavBar = (props) => {
  const user = props.user.status;

  return (
    <div id="navbar-wrapper">
      <AppBar position="static" id="navbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            href={user === 'Child' || user === 'Parent' ? '/#/home' : '/'}
          >
            <span id="navLogo">
              FUND
              <span id={user === 'Parent' ? 'logoITparent' : 'logoIT'}>IT</span>
            </span>
          </IconButton>
          <div id="navbar-links-wrapper">
            {/*--------- USER IS NOT SIGNED IN ----------*/}

            {user === undefined ? (
              <Button color="inherit" href="/#/login">
                Log In
              </Button>
            ) : (
              ''
            )}
            {user === undefined ? (
              <Button
                href="/#/signup"
                variant="contained"
                color="primary"
                style={{ color: 'white' }}
              >
                Sign Up
              </Button>
            ) : (
              ''
            )}

            {user === 'Child' ? (
              <>
                <Button color="inherit" href="/#/wishlist">
                  Wish List
                </Button>
                <Button color="inherit" href="/#/chores">
                  Chores
                </Button>
                <Button href="/#/chatroom" color="inherit">
                  Chat
                </Button>
                <Button href="/#/home" color="primary" variant="contained">
                  Home
                </Button>
                <Settings id="settings" />{' '}
              </>
            ) : user === 'Parent' ? (
              <>
                <Button href="/#/notifications" color="inherit">
                  <Badge
                    badgeContent={props.notifications.length}
                    color="secondary"
                  >
                    Notifications
                  </Badge>
                </Button>
                <Button color="inherit" href="/#/chores">
                  Chores
                </Button>
                <Button href="/#/chatroom" color="inherit">
                  Chat
                </Button>
                <Button href="/#/home" color="secondary" variant="contained">
                  Home
                </Button>
                <Settings id="settings" />
              </>
            ) : user === 'Anonymous' ? (
              <>
                <Button href="/#/home" color="inherit">
                  Finish Registration
                </Button>
                <Settings id="settings" />
              </>
            ) : (
              ''
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(logout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
