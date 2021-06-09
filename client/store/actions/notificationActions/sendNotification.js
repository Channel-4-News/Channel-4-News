import axios from 'axios';
const websocket = new WebSocket(
  window.document.location.origin.replace('http', 'ws')
);

//Action Type
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

//Action Creator
export const sendNotification = (newNotification) => ({
  type: SEND_NOTIFICATION,
  newNotification,
});

//Thunk
export const sendNotificationThunk = (message) => {
  return async (dispatch) => {
    const { data: newNotification } = await axios.post(
      '/api/notification/create',
      message,
      {
        headers: {
          authorization: window.localStorage.getItem('userToken'),
        },
      }
    );
    websocket.send(JSON.stringify(newNotification));
    dispatch(sendNotification(newNotification));
  };
};

export default websocket;
