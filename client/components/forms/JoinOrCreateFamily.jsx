import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createFamily } from '../../store/actions/familyActions/createFamily';
import { authFamily } from '../../store/actions/familyActions/joinFamily';

import {
  passwordsMatch,
  secretValid,
  validUsername,
} from '../../utilities/utilityValidation';

import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from '../../store/actions/userActions/updateUser';

const JoinOrCreateFamily = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [familySecret, setFamilySecret] = useState('');
  const [join, setJoin] = useState('');
  const [joinOrCreate, setJoinOrCreate] = useState('create');
  const [familyCreds, setFamilyCreds] = useState({
    familyName: '',
    familySecret: '',
    confirmSecret: '',
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    parentOrChild: {
      width: '48%',
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const submitFamily = async (e) => {
    e.preventDefault();

    const { familyName, familySecret, confirmSecret } = familyCreds;

    const familyValues = {
      name: familyName,
      familySecret: familySecret,
    };

    if (confirmSecret) {
      await props.createFamily(familyValues);
      const didJoin = await props.joinFamily(familyValues, props.currUser.id);
      if (!didJoin) {
        setJoin('Invalid family name or family secret.');
      } else {
        props.history.push('/');
      }
    }
  };

  return (
    <div id="createJoinFamily">
      {joinOrCreate === 'create' ? (
        <form className="createJoin" onSubmit={submitFamily}>
          <h5>Create Family</h5>
          <h6>
            Already have a family? Click
            <span
              id="switchToJoinFamily"
              onClick={() => setJoinOrCreate('join')}
            >
              &nbsp;here&nbsp;
            </span>
            to enter family info.
          </h6>
          {/* <label>Family Name</label>
          <input
            name="familyName"
            onChange={(e) => {
              validUsername(e.target, 'Family name');
            }}
          /> */}
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="parentOrChild"
              color="secondary"
              className={classes.parentOrChild}
            >
              Relation To Family
            </InputLabel>
            <Select
              className={classes.parentOrChild}
              native
              label="Relation To Family"
              color="secondary"
              onChange={(e) =>
                props.updateUser(props.currUser.id, { status: e.target.value })
              }
            >
              <option aria-label="None" value="" />
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
            </Select>
            <FormHelperText>Are you a parent or child?</FormHelperText>
          </FormControl>
          <TextField
            className={classes.root}
            label="Family Name"
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              validUsername(e.target, 'Family name');
              setFamilyCreds({ ...familyCreds, familyName: e.target.value });
            }}
          />
          {/* <label>Family Secret</label>
          <input
            name="familySecret"
            type={passwordShown ? 'text' : 'password'}
            onChange={(e) => {
              secretValid(e.target);
              setFamilySecret(e.target.value);
            }}
          /> */}
          <TextField
            className={classes.root}
            type="password"
            label="Family Secret"
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              secretValid(e.target);
              setFamilySecret(e.target.value);
              setFamilyCreds({ ...familyCreds, familySecret: e.target.value });
            }}
          />
          {/* <label>Confirm Family Secret</label>
          <input
            className="passwordInput"
            name="confirmSecret"
            type={passwordShown ? 'text' : 'password'}
            onChange={(e) => {
              passwordsMatch(familySecret, e.target, 'Secrets');
            }}
          /> */}
          <TextField
            className={classes.root}
            type="password"
            label="Confirm Family Secret"
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              passwordsMatch(familySecret, e.target, 'Secrets');
              setFamilyCreds({ ...familyCreds, confirmSecret: e.target.value });
            }}
          />
          <Button onClick={submitFamily}>Sign Up</Button>
        </form>
      ) : (
        <form className="createJoin" onSubmit={submitFamily}>
          <h5>Join Family</h5>
          <label>Family Name</label>
          <input name="familyName" />
          <label>Family Secret</label>
          <input
            id="test"
            className="passwordInput"
            name="familySecret"
            type={passwordShown ? 'text' : 'password'}
          />
          <button>Sign Up</button>
          <small>{join}</small>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFamily: (family) => dispatch(createFamily(family)),
    joinFamily: (userId, family) => dispatch(authFamily(userId, family)),
    updateUser: (id, status) => dispatch(updateUser(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrCreateFamily);
