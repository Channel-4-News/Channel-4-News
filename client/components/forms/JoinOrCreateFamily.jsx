import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createFamily } from '../../store/actions/familyActions/createFamily';
import { authFamily } from '../../store/actions/familyActions/joinFamily';

const JoinOrCreateFamily = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const submitFamily = async (e) => {
    e.preventDefault();

    const { familyName, familySecret, confirmSecret } = e.target;

    const familyValues = {
      name: familyName.value,
      familySecret: familySecret.value,
    };

    if (confirmSecret) await props.createFamily(familyValues);
    props.joinFamily(familyValues, props.currUser.id);
  };

  return (
    <div id="createJoinFamily">
      <form className="createJoin" onSubmit={submitFamily}>
        <h3>Create Family</h3>
        <label>Family Name</label>
        <input name="familyName" />
        <label>Family Secret</label>
        <input
          className="passwordInput"
          name="familySecret"
          type={passwordShown ? 'text' : 'password'}
        />
        <label>Confirm Family Secret</label>
        <input
          className="passwordInput"
          name="confirmSecret"
          type={passwordShown ? 'text' : 'password'}
        />
        <button>Create Family</button>
      </form>
      <form className="createJoin" onSubmit={submitFamily}>
        <h3>Join Family</h3>
        <label>Family Name</label>
        <input name="familyName" />
        <label>Family Secret</label>
        <input
          className="passwordInput"
          name="familySecret"
          type={passwordShown ? 'text' : 'password'}
        />
        <button>Join Family</button>
      </form>
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
