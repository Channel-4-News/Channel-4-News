import axios from 'axios';

//Action Type
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';

//Action Creator
export const loadNotifications = (notifications) => ({
  type: LOAD_NOTIFICATIONS,
  notifications,
});

//Thunk
export const loadNotificationsThunk = () => {
  return async (dispatch) => {
    const { data: notifications } = await axios.get('/api/notification', {
      headers: {
        authorization: window.localStorage.getItem('userToken'),
      },
    });
    dispatch(loadNotifications(notifications));
  };
};
