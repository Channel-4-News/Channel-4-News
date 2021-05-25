import axios from 'axios';

const GET_CURRENT_USER = 'GET_CURRENT_USER';

const authUser = async (creds) => {
  let response = (await axios.post('/api/auth', creds)).data;
  const { token } = response;
  window.localStorage.setItem('token', token);
};

const attemptLogin = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const user = (
        await axios.get('/api/auth', {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch(getCurrentUser(user));
    }
  };
};

const getCurrentUser = (user) => {
  return {
    type: GET_CURRENT_USER,
    user,
  };
};

export { GET_CURRENT_USER, getCurrentUser, authUser, attemptLogin };
