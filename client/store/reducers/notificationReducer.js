import { LOAD_NOTIFICATIONS } from '../actions/notificationActions/loadNotification';
import { SEND_NOTIFICATION } from '../actions/notificationActions/sendNotification';

export const notificationReducer = (state = [], action) => {
  if (action.type === LOAD_NOTIFICATIONS) {
    state = action.notifications;
  }
  if (action.type === SEND_NOTIFICATION) {
    console.log('before', state);
    state = [...state, action.newNotification];
    console.log('after', state);
  }
  return state;
};
