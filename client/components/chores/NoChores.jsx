import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import AddUpdateChoreContainer from './AddUpdateChoreContainer';

const NoChores = (props) => {
  if (props.user?.status === 'Child') {
    return (
      <div id="noChores">
        <h1>YOU ARE CHORELESS!</h1>
        You haven&apos;t been assigned any chores! Once your parent(s) add and
        assign you chores, they will appear on this page. You will be able to
        manage and easily sort through your chores, as well as mark them
        completed.
        <br /> <br /> When you complete a chore, a notification will be sent to
        your parent(s), and they will confirm by either paying out the chore, or
        marking it as incomplete.
      </div>
    );
  }
  return (
    <div id="noChoresParents">
      <h1>NOTHING TO SEE HERE!</h1>
      <div>Your kids are ready to work. Give them some chores!</div>
      <Button
        variant="contained"
        onClick={() => props.setAddChore(true)}
        color="secondary"
      >
        Add Chore
      </Button>
      <AddUpdateChoreContainer
        addChore={props.addChore}
        handleClose={props.handleClose}
        setAddChore={props.setAddChore}
        updateClicked={props.updateClicked}
        choreToUpdate={props.choreToUpdate}
        setUpdateClicked={props.setUpdateClicked}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};

export default connect(mapStateToProps)(NoChores);
