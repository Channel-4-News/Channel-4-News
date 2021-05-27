import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../store/actions/userActions/createUser';
import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';

import {
  validUsername,
  passwordValid,
  passwordsMatch,
  validEmail,
} from '../../utility';

const SignUp = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState('');

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
        <input
          name="username"
          onChange={(e) => {
            validUsername(e.target);
          }}
        />
        <label>Email Address</label>
        <input
          name="email"
          type="email"
          onChange={(e) => {
            validEmail(e.target);
          }}
        />
        <div id="firstLastSignup">
          <div>
            <label>First Name</label>
            <input name="firstName" required />
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" required />
          </div>
        </div>
        <label>Password</label>
        <input
          className="passwordInput"
          name="password"
          type={passwordShown ? 'text' : 'password'}
          onChange={(e) => {
            passwordValid(e.target);
            setPassword(e.target.value);
          }}
        />
        <label>Confirm Password</label>
        <input
          className="passwordInput"
          name="confirmPassword"
          type={passwordShown ? 'text' : 'password'}
          onChange={(e) => {
            passwordsMatch(password, e.target);
          }}
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
