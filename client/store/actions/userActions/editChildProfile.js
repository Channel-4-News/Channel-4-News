import axios from 'axios';

//Action Type
export const UPDATE_CHILD_PROFILE = 'UPDATE_CHILD_PROFILE';

//Action Creator
export const updateChild = (updatedUser) => ({
  type: UPDATE_CHILD_PROFILE,
  updatedUser,
});

//Thunk
export const updateChildProfileThunk = (user) => {
  return async (dispatch) => {
    try {
      const token = await window.localStorage.getItem('token');
      const { id, firstName, lastName, username, email, imgUrl } = user;

      const { data: updateUser } = await axios.put(
        `/api/users/${id}`,
        {
          id,
          firstName,
          lastName,
          username,
          email,
          imgUrl,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      const getUser = (await axios.get(`/api/users/${id}`)).data;
      dispatch(updateChild(getUser));
    } catch (err) {
      console.log(err);
    }
  };
};
