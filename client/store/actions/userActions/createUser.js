import axios from 'axios';

const CREATE_USER = 'CREATE_USER';

const createUser = (user) => {
  return async (dispatch) => {
    try {
     // const stripe = await axios.post('/api/stripe', { email: user.email });
     // user.stripeAccount = stripe.data.id;
      const newUser = (await axios.post('/api/users', user)).data;
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
