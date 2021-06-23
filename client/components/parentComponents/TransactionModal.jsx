import React, { useState } from 'react';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

const TransactionModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="PLtransactModal">
      <Button size="medium" variant="contained" onClick={() => setOpen(true)}>
        Transactions
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent>
          <Transactions kid={props.kid} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect()(TransactionModal);
