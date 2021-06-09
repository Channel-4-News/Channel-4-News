import React, { Component, useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

//Redux Imports
import { connect } from 'react-redux';

//Material UI Imports
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';

//React Icons
import { IoMdSettings } from 'react-icons/Io';

//Store Imports
import { logout } from '../store/actions/userActions/logoutUser';

const useStyles = makeStyles((theme) => ({
  menuLinks: {
    textDecoration: 'none',
    color: 'black',
  },
  signOut: {
    color: 'red',
  },
}));

const Settings = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        // variant="contained"
      >
        <IoMdSettings id="settings" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.currUser.status === 'Parent' ? (
          console.log('Parent Page')
        ) : (
          <MenuItem onClick={handleClose}>
            <Link className={classes.menuLinks} to="editchildinfo">
              Edit Profile!
            </Link>
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>
          {' '}
          <Button
            color="inherit"
            onClick={() => {
              props.signOut();
            }}
            href="/"
            className={classes.signOut}
          >
            Sign Out
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return { signOut: () => dispatch(logout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
