import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import Notification from './Notification';
import { choresCompletedSort, cashRelated } from './notificationUtils';

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    backgroundColor: 'lightGrey',
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

const SortNotifications = ({
  allNotifications,
  choreNotifications,
  cashNotifications,
}) => {
  const [val, setVal] = useState('Select');
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
            handleClose();
            setVal('Chores Completed');
          }}
        >
          Chores Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setVal('Cash Withdrawals');
          }}
        >
          Cash Withdrawals
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setVal('All');
          }}
        >
          All
        </MenuItem>
      </Menu>
      <Notification
        notifications={
          val === 'Chores Completed'
            ? choreNotifications
            : val === 'Cash Withdrawals'
              ? cashNotifications
              : val === 'All' || val === 'Select'
                ? allNotifications
                : ''
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allNotifications: state.notifications.length
      ? state.notifications.sort((a, b) => b.id - a.id)
      : 'No New Notifications',
    choreNotifications: choresCompletedSort(state.notifications),
    cashNotifications: cashRelated(state.notifications),
  };
};

export default connect(mapStateToProps)(SortNotifications);
