import React from 'react';
import { connect } from 'react-redux';

import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';
import { logout } from '../../store/actions/userActions/logoutUser';

const LogIn = (props) => {
  const submitUser = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    await authUser({ username: username.value, password: password.value });
    props.attemptLogin();
  };

  return (
    <>
      <form id="signup" onSubmit={submitUser}>
        <label>Email or Username</label>
        <input name="username" />
        <label>Password</label>
        <input name="password" />
        <button>Submit</button>
      </form>
      <button
        onClick={() => {
          props.logout();
        }}
      >
        LogOutTest
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(attemptLogin()),
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
