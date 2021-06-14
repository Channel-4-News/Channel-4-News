import React from 'react';
import { connect } from 'react-redux';
import NotificationCard from './NotificationCard';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  notifications: {
    width: '50%',
    backgroundColor: 'cornSilk',
  },
  noneText: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Notification = ({ currUser, notifications }) => {
  if (currUser.status !== 'Parent') {
    return <div>You do not have permission to view this screen</div>;
  }
  if (!notifications.length) {
    return null;
  }
  const classes = useStyles();
  return (
    <Paper className={classes.notifications}>
      {Array.isArray(notifications) ? (
        notifications.map((currNote, idx) => {
          return <NotificationCard key={idx} currNote={currNote} />;
        })
      ) : typeof notifications === 'string' ? (
        <h3 className={classes.noneText}>{notifications}</h3>
      ) : (
        ''
      )}
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

export default connect(mapStateToProps)(Notification);
