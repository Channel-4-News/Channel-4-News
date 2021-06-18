import React, { useEffect, useState } from 'react';
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
  const [familySecret, setFamilySecret] = useState('');
  const [confirmSecret, setConfirmSecret] = useState('');
  const [join, setJoin] = useState('');
  const [joinOrCreate, setJoinOrCreate] = useState('create');
  const [errors, setErrors] = useState({
    familyName: 'Family Name',
    familySecret: 'Family Secret',
    confirmSecret: 'Confirm Secret',
    relation: 'Relation To Family',
  });
  const [familyCreds, setFamilyCreds] = useState({
    familyName: '',
    familySecret: '',
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

  //handles secret matching, labels and errors for confirm secret
  useEffect(() => {
    const areMatching = passwordsMatch(familySecret, confirmSecret);
    if (confirmSecret.length && areMatching.message) {
      setErrors({ ...errors, confirmSecret: areMatching.message });
    } else {
      setErrors({ ...errors, confirmSecret: 'Confirm Secret' });
    }
  }, [familySecret, confirmSecret]);

  //handles when user clicks off of input and checks validation
  const handleBlur = async (e, validation, field, type) => {
    const value = e.target.value;
    const error = await validation(e.target, type);
    if (error.error && value) setErrors({ ...errors, [field]: error.message });
  };

  //checks validation, sets label, sets signUpValues
  const handleChange = (e, validation, field, label) => {
    const error = validation(e.target);
    if (!error.error || e.target.value.length)
      setErrors({ ...errors, [field]: label });
    setFamilyCreds({ ...familyCreds, [field]: e.target.value });
  };

  const submitFamily = async (e, joining) => {
    e.preventDefault();

    const { familyName, familySecret } = familyCreds;

    const familyValues = {
      name: familyName,
      familySecret,
    };

    if (
      (!joining && !confirmSecret.length) ||
      errors.confirmSecret !== 'Confirm Secret'
    )
      return;

    if (confirmSecret) {
      const created = await props.createFamily(familyValues);
      if (!created) return;
      const didJoin = await props.joinFamily(familyValues, props.currUser.id);
      if (!didJoin) {
        setJoin('Invalid family name or family secret.');
      } else {
        props.setPage(3);
      }
    }

    if (joining) {
      const didJoin = await props.joinFamily(familyValues, props.currUser.id);
      if (!didJoin) {
        setJoin('Invalid family name or family secret.');
      } else {
        props.setPage(3);
      }
    }
  };

  //Make sure they dont skip the first signup part
  if (!props.currUser.id) {
    return <h1>Please Sign Up!</h1>;
  }

  return (
    <div id="createJoinFamily">
      {joinOrCreate === 'create' ? (
        <form className="createJoin" onSubmit={submitFamily}>
          <h4>CREATE FAMILY</h4>
          <small className={classes.root}>
            Already have a family? Click
            <span
              id="switchToJoinFamily"
              onClick={() => setJoinOrCreate('join')}
            >
              &nbsp;here&nbsp;
            </span>
            to enter family info.
          </small>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="parentOrChild"
              color="secondary"
              className={classes.parentOrChild}
            >
              {errors.relation}
            </InputLabel>
            <Select
              required
              className={classes.parentOrChild}
              native
              label={errors.relation}
              color="secondary"
              onChange={(e) => {
                props.setUserStatus(e.target.value);
                props.updateUser(props.currUser.id, { status: e.target.value });
              }}
            >
              <option aria-label="None" value="" />
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
            </Select>
            <FormHelperText>Are you a parent or child?</FormHelperText>
          </FormControl>
          <TextField
            className={classes.root}
            label={errors.familyName}
            variant="outlined"
            color="secondary"
            error={errors.familyName !== 'Family Name'}
            onBlur={(e) =>
              handleBlur(e, validUsername, 'familyName', 'Family name')
            }
            onChange={(e) => {
              handleChange(e, validUsername, 'familyName', 'Family Name');
            }}
          />
          <TextField
            className={classes.root}
            type="password"
            label={errors.familySecret}
            variant="outlined"
            color="secondary"
            error={errors.familySecret !== 'Family Secret'}
            onBlur={(e) => handleBlur(e, secretValid, 'familySecret')}
            onChange={(e) => {
              setFamilySecret(e.target.value);
              handleChange(e, secretValid, 'familySecret', 'Family Secret');
            }}
          />
          <TextField
            className={classes.root}
            type="password"
            label={errors.confirmSecret}
            variant="outlined"
            color="secondary"
            error={errors.confirmSecret !== 'Confirm Secret'}
            onChange={(e) => {
              setConfirmSecret(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              submitFamily(e);
            }}
            className={classes.root}
          >
            Sign Up
          </Button>
        </form>
      ) : (
        <form className="createJoin" onSubmit={submitFamily}>
          <h4>JOIN FAMILY</h4>
          <TextField
            className={classes.root}
            label={errors.familyName}
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              setFamilyCreds({ ...familyCreds, familyName: e.target.value });
            }}
          />
          <TextField
            className={classes.root}
            type="password"
            label={errors.familySecret}
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              setFamilyCreds({ ...familyCreds, familySecret: e.target.value });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              submitFamily(e, true);
            }}
            className={classes.root}
          >
            Join Family
          </Button>
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
