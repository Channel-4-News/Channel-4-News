import React, { useState } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../../store/actions/googleActions/googleLogin';

import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';
import { logout } from '../../store/actions/userActions/logoutUser';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleButton from 'react-google-button';

const LogIn = (props) => {
  const [loggedIn, setLoggedIn] = useState('');
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  const submitUser = async () => {
    const { username, password } = loginValues;

    await authUser({ username, password });
    const login = await props.attemptLogin();

    if (!login) setLoggedIn('Invalid username or password.');
    if (login) props.history.push('/home');
  };

  return (
    <div id="login-wrapper">
      <form id="login" onSubmit={submitUser}>
        <h4>LOG IN</h4>
        <TextField
          className={classes.root}
          label="Email or username"
          variant="outlined"
          color="primary"
          onChange={(e) => {
            setLoginValues({ ...loginValues, username: e.target.value });
          }}
        />
        <TextField
          className={classes.root}
          type="password"
          label="Password"
          variant="outlined"
          color="primary"
          onChange={(e) => {
            setLoginValues({ ...loginValues, password: e.target.value });
          }}
        />
        <Button
          className={classes.root}
          onClick={submitUser}
          color="primary"
          variant="contained"
          style={{
            width: '40%',
            alignSelf: 'center',
            marginTop: '20px',
          }}
        >
          Log In
        </Button>
        <GoogleButton
          style={{
            width: '80%',
            alignSelf: 'center',
            marginTop: '15px',
            marginBottom: '15px',
          }}
          type="dark"
          label="Log In With Google"
          onClick={(event) => {
            event.preventDefault();
            window.location.href = '/api/google';
          }}
        />
        <small>{loggedIn}</small>
        <small>
          Don&apos;t have an account?{' '}
          <span
            id="takeMeToSignUp"
            onClick={() => props.history.push('/signup')}
          >
            Sign up.
          </span>
        </small>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => dispatch(attemptLogin()),
    logout: () => dispatch(logout()),
    googleLogin: () => dispatch(googleLogin()),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
