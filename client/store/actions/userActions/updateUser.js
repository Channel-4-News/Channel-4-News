import axios from 'axios';

const UPDATE_USER = 'UPDATE_USER';

const updateUser = (id, updateInfo) => {
  return async (dispatch) => {
    const user = (await axios.put(`/api/users/${id}`, updateInfo)).data;
    dispatch(_updateUser(user));
  };
};

const _updateUser = (user) => {
  return { type: UPDATE_USER, user };
};

export { UPDATE_USER, updateUser };
