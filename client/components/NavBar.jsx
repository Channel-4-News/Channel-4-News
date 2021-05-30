import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const NavBar = (props) => {
  const user = props.user.status;
  return (
    <div id="navbar-wrapper">
      <AppBar position="static" id="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            Channel-4-News
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
              <Button color="inherit" href="/#/signup">
                Sign Up
              </Button>
            ) : (
              ''
            )}

            {/* ----------USER IS A CHILD----------- */}

            {user === 'Child' ? (
              <Button color="inherit" href="/#/wishlist">
                Wish List
              </Button>
            ) : (
              ''
            )}
            {user === 'Child' ? <Button color="inherit">Chores</Button> : ''}
            {user === 'Child' ? <Button color="inherit">Chat</Button> : ''}
            {user === 'Child' ? <Button color="inherit">Settings</Button> : ''}
            {user === 'Child' ? <Button color="inherit">Sign Out</Button> : ''}

            {/*----------- USER IS A PARENT --------------*/}

            {user === 'Parent' ? (
              <Button color="inherit">Notifications</Button>
            ) : (
              ''
            )}
            {user === 'Parent' ? <Button color="inherit">Chores</Button> : ''}
            {user === 'Parent' ? <Button color="inherit">Chat</Button> : ''}
            {user === 'Parent' ? <Button color="inherit">Settings</Button> : ''}
            {user === 'Parent' ? <Button color="inherit">Sign Out</Button> : ''}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
