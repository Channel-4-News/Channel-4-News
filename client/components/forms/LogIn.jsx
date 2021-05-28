import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';
import { logout } from '../../store/actions/userActions/logoutUser';

const LogIn = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loggedIn, setLoggedIn] = useState('');

  const submitUser = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    await authUser({ username: username.value, password: password.value });
    const login = await props.attemptLogin();

    if (!login) setLoggedIn('Invalid username or password.');
  };

  return (
    <div id="login-wrapper">
      <form id="login" onSubmit={submitUser}>
        <label>Email or Username</label>
        <input name="username" />
        <label>Password</label>
        <input
          className="passwordInput"
          name="password"
          type={passwordShown ? 'text' : 'password'}
        />
        <button>Login</button>
        {/* delete logout button below when we have logout in navbar */}
        <small>{loggedIn}</small>
      </form>
      <button
        onClick={() => {
          props.logout();
        }}
      >
        LogOutTest
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(attemptLogin()),
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
