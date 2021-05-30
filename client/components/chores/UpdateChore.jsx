import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateChore } from '../../store/actions/choreActions/updateChore';

const UpdateChore = () => {
  return <div></div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChore: (id, info) => dispatch(updateChore(id, info)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateChore);
