import axios from 'axios';
import store from '../../store';
// window.socket = new WebSocket(window.location.origin.replace('http', 'ws'));
// window.socket.addEventListener('message', (ev) => {
//   const obj = JSON.parse(ev.data);
//   if(obj.type){
//     // console.log(this.props.dispatchNotification(obj));
//     this.props.dispatchNotification(obj);
//   }
// });

const websocket = new WebSocket(
  window.document.location.origin.replace('http', 'ws')
);
websocket.addEventListener('message', (ev) => {
  try {
    console.log(JSON.parse(ev.data));
    const action = JSON.parse(ev.data);
    if (action.id) {
      store.dispatch(sendNotification(action));
    }
  } catch (err) {
    console.error(err);
  }
});

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
    console.log('message', message);
    const { data: newNotification } = await axios.post(
      '/api/notification/create',
      message,
      {
        headers: {
          authorization: window.localStorage.getItem('userToken'),
        },
      }
    );
    console.log('notification', newNotification);
    websocket.send(JSON.stringify(newNotification));
    dispatch(sendNotification(newNotification));
  };
};
