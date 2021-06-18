import React from 'react';
import AddChore from './AddChore';
import Modal from '@material-ui/core/Modal';
import UpdateChore from './UpdateChore';
import { connect } from 'react-redux';

const AddUpdateChoreContainer = (props) => {
  return (
    <>
      {props.currUser.status === 'Parent' ? (
        <div>
          <Modal
            id="addChoreModal"
            open={props.addChore}
            onClose={() => {
              props.handleClose('modal');
            }}
          >
            <AddChore
              kids={props.kids}
              familyId={props.currUser.familyId}
              setAddChore={props.setAddChore}
            />
          </Modal>
        </div>
      ) : null}
      <Modal
        id="addChoreModal"
        open={props.updateClicked}
        onClose={() => {
          props.handleClose('modal');
        }}
      >
        <UpdateChore
          chore={props.choreToUpdate}
          kids={props.kids}
          setClicked={props.setUpdateClicked}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return { kids: state.kids, currUser: state.currUser };
};

export default connect(mapStateToProps)(AddUpdateChoreContainer);
