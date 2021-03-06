import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import Notification from './Notification';
import {
  choresCompletedSort,
  cashRelated,
  onlyInvoices,
} from './notificationUtils';

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    backgroundColor: 'rgb(238, 238, 238)',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notificationsSelect: {
    alignSelf: 'flex-start',
    marginLeft: '25%',
    marginBottom: '10px',
  },
}));

const SortNotifications = ({
  allNotifications,
  choreNotifications,
  cashNotifications,
  invoices,
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
      <div id="notificationTitle">NOTIFICATIONS</div>
      <Button
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        className={classes.notificationsSelect}
      >
        Sort
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
            setVal('Invoices');
          }}
        >
          Invoices
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
              : val === 'Invoices'
                ? invoices
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
      ? state.notifications.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      : 'No New Notifications',
    choreNotifications: choresCompletedSort(state.notifications),
    cashNotifications: cashRelated(state.notifications),
    invoices: onlyInvoices(state.notifications),
  };
};

export default connect(mapStateToProps)(SortNotifications);
