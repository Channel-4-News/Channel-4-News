import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createFamily } from '../../store/actions/familyActions/createFamily';
import { authFamily } from '../../store/actions/familyActions/joinFamily';

import {
  passwordsMatch,
  secretValid,
  validUsername,
} from '../../utilityValidation';

const JoinOrCreateFamily = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [familySecret, setFamilySecret] = useState('');
  const [join, setJoin] = useState('');
  const [joinOrCreate, setJoinOrCreate] = useState('create');

  const submitFamily = async (e) => {
    e.preventDefault();

    const { familyName, familySecret, confirmSecret } = e.target;

    const familyValues = {
      name: familyName.value,
      familySecret: familySecret.value,
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
          <label>Family Name</label>
          <input
            name="familyName"
            onChange={(e) => {
              validUsername(e.target, 'Family name');
            }}
          />
          <label>Family Secret</label>
          <input
            className="passwordInput"
            name="familySecret"
            type={passwordShown ? 'text' : 'password'}
            onChange={(e) => {
              secretValid(e.target);
              setFamilySecret(e.target.value);
            }}
          />
          <label>Confirm Family Secret</label>
          <input
            className="passwordInput"
            name="confirmSecret"
            type={passwordShown ? 'text' : 'password'}
            onChange={(e) => {
              passwordsMatch(familySecret, e.target, 'Secrets');
            }}
          />
          <button>Sign Up</button>
        </form>
      ) : (
        <form className="createJoin" onSubmit={submitFamily}>
          <h5>Join Family</h5>
          <label>Family Name</label>
          <input name="familyName" />
          <label>Family Secret</label>
          <input
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinOrCreateFamily);
