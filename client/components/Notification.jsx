import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendNotification } from '../store/actions/notificationActions/sendNotification';

/**
 * COMPONENT
 */
const Notification = ({ notifications, currUser }) => {
  if (!notifications.length) {
    return null;
  }
  // COMMENTED FOR TESTING
  if (currUser.status !== 'Parent') {
    return <div>You do not have permission to view this screen</div>;
  }

  return (
    <div>
      {console.log(currUser)}
      {notifications.map((currNote, idx) => {
        return <li key={idx}>{currNote.text}</li>;
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    notifications: state.notifications,
    currUser: state.currUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    sendNotification: (message) => {
      dispatch(sendNotification(message));
    },
  };
};

export default connect(mapState, mapDispatch)(Notification);
