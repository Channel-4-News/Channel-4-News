import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';

const AllowanceModal = (props) => {
  const [open, setOpen] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [interval, setInterval] = useState('Every Week');
  const [intervalNum, setIntervalNum] = useState(7);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    //stop old allowance from running
    await axios.put(`/api/users/allowance/stop/${props.kid.id}`, {
      name: props.kid.firstName,
      email: props.kid.email,
    });

    await axios.put(`/api/allowance/modify/${props.kid.id}`, {
      allowance,
      intervalNum,
    });

    //starts interval for new allowance
    await axios.put(`/api/users/allowance/${props.kid.id}`, {
      allowance: allowance * 1,
      intervalNum,
      name: props.kid.firstName,
      email: props.kid.email,
    });

    setOpen(false);
    props.getKids();
  };

  const cancelAllowance = async () => {
    //stop allowance interval from running
    await axios.put(`/api/users/allowance/stop/${props.kid.id}`, {
      name: props.kid.firstName,
      email: props.kid.email,
    });

    await axios.put(`/api/allowance/modify/${props.kid.id}`, {
      allowance: 0,
      intervalNum: 0,
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAllowanceChange = async (e) => {
    setAllowance(e.target.value);
  };

  return (
    <div id="PLallowanceModal">
      <Button size="medium" variant="contained" onClick={() => setOpen(true)}>
        {props.kid.allowance ? 'Update Allowance' : 'Add Allowance'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.kid.allowance ? 'Update Allowance' : 'Add Allowance'}
        </DialogTitle>
        <DialogContent id="withdrawBoxItems">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Allowance
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={allowance}
              onChange={onAllowanceChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <DialogContentText id="alert-dialog-description">
            Pick an Interval
          </DialogContentText>
          <div id="allowanceIntervalDropdown">
            <div id="filterAndSortWishes">
              <div id="chooseAllowanceIntervalHover">
                <Button
                  size="large"
                  id="allowanceIntervalSelectButton"
                  variant="contained"
                  style={{ width: '300px' }}
                >
                  &nbsp;&nbsp;{interval}&nbsp;&nbsp;
                </Button>
                <div id="allowanceIntervalDropdownContent">
                  <div
                    onClick={() => {
                      setInterval('Every Day');
                      setIntervalNum(1);
                    }}
                  >
                    Every Day
                  </div>
                  <div
                    onClick={() => {
                      setInterval('Every Three Days');
                      setIntervalNum(3);
                    }}
                  >
                    Every Three Days
                  </div>
                  <div
                    onClick={() => {
                      setInterval('Every Week');
                      setIntervalNum(7);
                    }}
                  >
                    Every Week
                  </div>
                  <div
                    onClick={() => {
                      setInterval('Every Two Weeks');
                      setIntervalNum(14);
                    }}
                  >
                    Every Two Weeks
                  </div>
                  <div
                    onClick={() => {
                      setInterval('Every Month');
                      setIntervalNum(30);
                    }}
                  >
                    Every Month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Set Allowance
          </Button>
          <Button
            variant="contained"
            onClick={cancelAllowance}
            color="secondary"
            autoFocus
          >
            Cancel Allowance
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect()(AllowanceModal);
