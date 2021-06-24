import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from '@material-ui/core';
import EmailInviteForm from './EmailInviteForm';

const EmailModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        id="PLinviteFamily"
        onClick={() => setOpen(true)}
      >
        Invite Family Members
      </Button>
      <Modal
        id="addChoreModal"
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <EmailInviteForm setOpen={setOpen}></EmailInviteForm>
      </Modal>
    </>
  );
};

export default connect()(EmailModal);
