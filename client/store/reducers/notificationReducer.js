import { LOAD_NOTIFICATIONS } from '../actions/notificationActions/loadNotification';
import { SEND_NOTIFICATION } from '../actions/notificationActions/sendNotification';
import { DELETE_NOTIFICATION } from '../actions/notificationActions/deleteNotification';

export const notificationReducer = (state = [], action) => {
  if (action.type === LOAD_NOTIFICATIONS) {
    state = action.notifications;
  }
  if (action.type === SEND_NOTIFICATION) {
    state = [...state, action.newNotification];
  }
  if (action.type === DELETE_NOTIFICATION) {
    state = state.filter(
      (notification) => notification.id !== action.deletedId
    );
  }
  return state;
};
