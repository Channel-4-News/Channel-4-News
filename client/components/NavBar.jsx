import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const NavBar = () => {
  return (
    <div id="navbar-wrapper">
      <AppBar position="static" id="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            Channel-4-News
          </IconButton>
          <div id="navbar-links-wrapper">
            <Button color="inherit">Log In</Button>
            <Button color="inherit">Sign Up</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
