import axios from 'axios';

const userFromToken = async (token) => {
  let response;
  try {
    response = (
      await axios.get('/api/auth/user', {
        headers: {
          authorization: token,
        },
      })
    ).data;
  } catch (err) {
    console.log(err.response);
  }
  return response;
};

export default userFromToken;
