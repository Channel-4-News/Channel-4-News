import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { purchaseOrWithdraw } from '../../store/actions/wishListActions/purchaseOrWithdraw';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WithdrawMoneyDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [select, setSelect] = useState('Miscelleneous');
  const handleClose = () => {
    setOpen(false);
  };
  const onWithdrawChange = (event) => {
    setAmount(event.target.value);
  };
  const onSelectChange = (category) => {
    setSelect(category);
  };
  const onSubmit = () => {
    return {
      cost: amount,
      category: select,
    };
  };
  const errorNotify = () =>
    toast('You do not have enough money in your account for this withdrawal');
  const successNotify = () => toast('Your withdrawal was a success');
  return (
    <div>
      <Button size="large" variant="contained" onClick={() => setOpen(true)}>
        Withdraw Money
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Withdraw Money</DialogTitle>
        <DialogContent id="withdrawBoxItems">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={onWithdrawChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <DialogContentText id="alert-dialog-description">
            Pick a Category
          </DialogContentText>
          <div id="wishListDropdown">
            <div id="filterAndSortWishes">
              <div id="chooseWishHover">
                <Button size="large" id="withdrawButton" variant="contained">
                  &nbsp;&nbsp;{select}&nbsp;&nbsp;
                </Button>
                <div id="wishDropdownContent">
                  <div onClick={() => onSelectChange('Electronics')}>
                    Electronics
                  </div>
                  <div onClick={() => onSelectChange('Clothing')}>Clothing</div>
                  <div onClick={() => onSelectChange('Entertainment')}>
                    Entertainment
                  </div>
                  <div onClick={() => onSelectChange('Toys')}>Toys</div>
                  <div onClick={() => onSelectChange('Food')}>Food</div>
                  <div onClick={() => onSelectChange('Miscelleneous')}>
                    Miscelleneous
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              if (onSubmit().cost > parseInt(props.user.balance)) {
                errorNotify();
              } else {
                successNotify();
                handleClose(),
                props.purchaseOrWithdraw(props.user.id, onSubmit());
              }
            }}
            color="primary"
          >
            Withdraw
          </Button>
          <ToastContainer />
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseOrWithdraw: (id, transaction) =>
      dispatch(purchaseOrWithdraw(id, transaction)),
  };
};

export default connect(null, mapDispatchToProps)(WithdrawMoneyDialog);
