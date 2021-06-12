import React, { useEffect, useState } from 'react';
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
} from '../../utilities/utilityValidation';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const SignUp = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    username: 'Username',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  });
  const [signUpValues, setSignUpValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    firstLast: { width: '48%' },
    divWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: theme.spacing(),
    },
  }));

  const classes = useStyles();

  //handles user sign up
  const submitNewUser = async (e) => {
    e.preventDefault();
    const { username, password } = signUpValues;

    //check here to see if passwords match
    if (
      !passwordConfirm.length ||
      errors.confirmPassword !== 'Confirm Password'
    )
      return;

    await props.createUser(signUpValues);
    await authUser({ username, password });

    //check login and sign up success
    const signedUp = await props.attemptLogin();
    if (signedUp) props.setPage(2);
  };

  //handles password matching, labels and errors for confirm password
  useEffect(() => {
    const areMatching = passwordsMatch(password, passwordConfirm);
    if (passwordConfirm.length && areMatching.message) {
      setErrors({ ...errors, confirmPassword: areMatching.message });
    } else {
      setErrors({ ...errors, confirmPassword: 'Confirm Password' });
    }
  }, [password, passwordConfirm]);

  //handles when user clicks off of input and checks validation
  const handleBlur = async (e, validation, field) => {
    const value = e.target.value;
    const error = await validation(e.target);
    if (error.error && value) setErrors({ ...errors, [field]: error.message });
  };

  //checks validation, sets label, sets signUpValues
  const handleChange = (e, validation, field, label) => {
    const error = validation(e.target);
    if (!error.error || e.target.value.length)
      setErrors({ ...errors, [field]: label });
    setSignUpValues({ ...signUpValues, [field]: e.target.value });
  };

  return (
    <div id="signup-wrapper">
      <form id="signup">
        <h4>ENTER DETAILS</h4>
        <TextField
          className={classes.root}
          id="username"
          label={errors.username}
          variant="outlined"
          color="primary"
          error={errors.username !== 'Username'}
          onBlur={async (e) => {
            handleBlur(e, validUsername, 'username');
          }}
          onChange={(e) => {
            handleChange(e, validUsername, 'username', 'Username');
          }}
        />
        <TextField
          type="email"
          className={classes.root}
          label={errors.email}
          variant="outlined"
          color="primary"
          error={errors.email !== 'Email Address'}
          onBlur={async (e) => {
            handleBlur(e, validEmail, 'email');
          }}
          onChange={(e) => {
            handleChange(e, validEmail, 'email', 'Email Address');
          }}
        />
        <div className={classes.divWrap}>
          <TextField
            className={classes.firstLast}
            label="First Name"
            variant="outlined"
            color="primary"
            onChange={(e) => {
              setSignUpValues({ ...signUpValues, firstName: e.target.value });
            }}
          />
          <TextField
            className={classes.firstLast}
            label="Last Name"
            variant="outlined"
            color="primary"
            onChange={(e) => {
              setSignUpValues({ ...signUpValues, lastName: e.target.value });
            }}
          />
        </div>
        <TextField
          type="password"
          className={classes.root}
          label={errors.password}
          variant="outlined"
          color="primary"
          error={errors.password !== 'Password'}
          onBlur={async (e) => {
            handleBlur(e, passwordValid, 'password');
          }}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e, passwordValid, 'password', 'Password');
          }}
        />
        <TextField
          type="password"
          className={classes.root}
          label={errors.confirmPassword}
          variant="outlined"
          color="primary"
          error={errors.confirmPassword !== 'Confirm Password'}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.root}
          style={{ width: '40%', alignSelf: 'center', marginTop: '40px' }}
          onClick={submitNewUser}
        >
          Next
        </Button>
        <small>
          Already have an account? Login{' '}
          <a id="goToLogin" href="/#/login">
            here
          </a>
          .
        </small>
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
