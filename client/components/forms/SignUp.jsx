import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../store/actions/userActions/createUser';
import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';

const SignUp = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);

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
    <div id="signup-wrapper">
      <form id="signup" onSubmit={submitNewUser}>
        <label>Username</label>
        <input name="username" />
        <label>Email Address</label>
        <input name="email" />
        <div id="firstLastSignup">
          <div>
            <label>First Name</label>
            <input name="firstName" />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" />
          </div>
        </div>
        <label>Password</label>
        <input name="password" type={passwordShown ? 'text' : 'password'} />
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type={passwordShown ? 'text' : 'password'}
        />
        <button>Next</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    attemptLogin: () => dispatch(attemptLogin()),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
