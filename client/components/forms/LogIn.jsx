import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  attemptLogin,
  authUser,
} from '../../store/actions/userActions/getCurUser';
import { logout } from '../../store/actions/userActions/logoutUser';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LogIn = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
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
        <h4>LOGIN</h4>
        <TextField
          className={classes.root}
          label="Email or username"
          variant="outlined"
          color="secondary"
          onChange={(e) => {
            setLoginValues({ ...loginValues, username: e.target.value });
          }}
        />
        <TextField
          className={classes.root}
          type="password"
          label="Password"
          variant="outlined"
          color="secondary"
          onChange={(e) => {
            setLoginValues({ ...loginValues, password: e.target.value });
          }}
        />
        <Button
          className={classes.root}
          onClick={submitUser}
          color="secondary"
          variant="contained"
          style={{
            width: '40%',
            alignSelf: 'center',
            marginTop: '40px',
          }}
        >
          Login
        </Button>
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
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
