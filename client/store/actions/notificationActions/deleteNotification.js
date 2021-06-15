import axios from 'axios';

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export const deleteNotification = (deletedId) => ({
  type: DELETE_NOTIFICATION,
  deletedId,
});

export const deleteNotificationThunk = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/notification/${id}`);
    dispatch(deleteNotification(id));
  };
};
