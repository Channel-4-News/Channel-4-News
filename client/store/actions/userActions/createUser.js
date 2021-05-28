import axios from 'axios';

const CREATE_USER = 'CREATE_USER';

const createUser = (user) => {
  return async (dispatch) => {
    try {
      const newUser = (await axios.post('/api/users', user)).data;
      console.log(newUser);
      dispatch(_createUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

const _createUser = (user) => {
  return { type: CREATE_USER, user };
};

export { CREATE_USER, createUser };
