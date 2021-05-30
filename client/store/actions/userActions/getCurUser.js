import axios from 'axios';

const GET_CURRENT_USER = 'GET_CURRENT_USER';

const authUser = async (creds) => {
  let response = (await axios.post('/api/auth/user', creds)).data;
  const { token } = response;
  window.localStorage.setItem('userToken', token);
};

const attemptLogin = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('userToken');
      if (token) {
        const user = (
          await axios.get('/api/auth/user', {
            headers: {
              authorization: token,
            },
          })
        ).data;
        const userWithFamily = (await axios.get(`/api/users/${user.id}`)).data;
        dispatch(getCurrentUser(userWithFamily));
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

const getCurrentUser = (user) => {
  return {
    type: GET_CURRENT_USER,
    user,
  };
};

export { GET_CURRENT_USER, authUser, attemptLogin };
