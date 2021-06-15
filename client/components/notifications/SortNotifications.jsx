import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import Notification from './Notification';
import { choresCompletedSort, cashRelated } from './notificationUtils';

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    backgroundColor: '#3e6bff',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notificationsSelect: {
    // alignSelf: 'flex-start',
    margin: '2rem',
  },
}));

const SortNotifications = ({ notifications }) => {
  const [val, setVal] = useState('Select');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [newNotifications, setNewNotifications] = useState([] || '');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.notificationContainer}>
      <Button
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        className={classes.notificationsSelect}
      >
        {val}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setNewNotifications(choresCompletedSort(notifications));
            handleClose();
            setVal('Chores Completed');
          }}
        >
          Chores Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewNotifications(cashRelated(notifications));
            handleClose();
            setVal('Cash Withdrawls');
          }}
        >
          Cash Withdrawls
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewNotifications(notifications);
            handleClose();
            setVal('All');
          }}
        >
          All
        </MenuItem>
      </Menu>
      {!notifications.length ? (
        <Notification
          notifications={
            !newNotifications.length ? 'No New Notifications' : newNotifications
          }
        />
      ) : (
        <Notification
          notifications={
            !newNotifications.length ? notifications : newNotifications
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(SortNotifications);
