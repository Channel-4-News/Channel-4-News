import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendNotification } from '../../store/actions/notificationActions/sendNotification';
import NotificationCard from './NotificationCard';
import { Paper } from '@material-ui/core';

const Notification = ({ notifications }) => {
  // COMMENTED FOR TESTING
  // if (currUser.status !== 'Parent') {
  //   return <div>You do not have permission to view this screen</div>;
  // }
  if (!notifications.length) {
    return null;
  }

  return (
    <Paper>
      {notifications.map((currNote, idx) => {
        return <NotificationCard key={idx} currNote={currNote} />;
      })}
    </Paper>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     notifications: state.notifications,
//     currUser: state.currUser,
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    sendNotification: (message) => {
      dispatch(sendNotification(message));
    },
  };
};

export default connect(null, mapDispatch)(Notification);
