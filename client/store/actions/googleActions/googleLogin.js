import axios from 'axios';

const googleLogin = () => {
  return async () => {
    try {
      await axios.get('/api/auth/google');
    } catch (err) {
      console.log(err);
    }
  };
};

export { googleLogin };
