import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import Notification from './Notification';
import {
  choresCompletedSort,
  choresIncompletedSort,
  cashRelated,
} from './notificationUtils';

const SortNotifications = ({ notifications }) => {
  const [val, setVal] = useState('Select');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
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
            setNewNotifications(choresIncompletedSort(notifications));
            handleClose();
            setVal('Incomplete Chores');
          }}
        >
          Incomplete Chores
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
      <Notification
        notifications={
          !newNotifications.length ? notifications : newNotifications
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(SortNotifications);
