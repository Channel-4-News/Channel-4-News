import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { logout } from '../store/actions/userActions/logoutUser';
import { connect } from 'react-redux';

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

            {/* USER IS A CHILD */}
            {user === 'Child' ? (
              <Button color="inherit" href="/#/home">
                Home
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? (
              <Button color="inherit" href="/#/wishlist">
                Wish List
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? (
              <Button color="inherit" href="/#/chores">
                Chores
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? (
              <Button href="/#/chatroom" color="inherit">
                Chat
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? (
              <Button
                color="primary"
                href="/#/childprofile"
                variant="contained"
              >
                Profile
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? <Settings id="settings" /> : ''}

            {/*----------- USER IS A PARENT --------------*/}

            {user === 'Parent' ? (
              <Button href="/#/notifications" color="inherit">
                Notifications({props.notifications.length})
              </Button>
            ) : (
              ''
            )}
            {user === 'Parent' ? (
              <Button color="inherit" href="/#/chores">
                Chores
              </Button>
            ) : (
              ''
            )}
            {user === 'Parent' ? (
              <Button href="/#/chatroom" color="inherit">
                Chat
              </Button>
            ) : (
              ''
            )}
            {user === 'Parent' ? <Settings id="settings" /> : ''}
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
