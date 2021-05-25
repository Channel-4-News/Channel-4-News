import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../store/actions/userActions/createUser';
import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';

const SignUp = (props) => {
  const submitNewUser = async (e) => {
    e.preventDefault();

    const { username, email, firstName, lastName, password } = e.target;

    const userValues = {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };

    await props.createUser(userValues);
    await authUser({ username: username.value, password: password.value });
    props.attemptLogin();
  };

  return (
    <form id="signup" onSubmit={submitNewUser}>
      <label>Username</label>
      <input name="username" />
      <label>Email Address</label>
      <input name="email" />
      <label>First Name</label>
      <input name="firstName" />
      <label>Last Name</label>
      <input name="lastName" />
      <label>Password</label>
      <input name="password" />
      <label>Confirm Password</label>
      <input name="confirmPassword" />
      <button>Submit</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    attemptLogin: () => dispatch(attemptLogin()),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
