import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

class CalculatorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatorOpen: false,
      howMuch: 0,
      howOften: 0,
      howLong: '',
      dropDownValue: '',
    };
    this.onCalculatorOpen = this.onCalculatorOpen.bind(this);
    this.onCalculatorClose = this.onCalculatorClose.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }

  onCalculatorOpen() {
    this.setState({ calculatorOpen: true });
  }

  onCalculatorClose() {
    this.setState({ calculatorOpen: false, howLong: 0 });
  }

  onTextChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  calculate(ev) {
    ev.preventDefault();
    let howLong =
      (this.props.wishListItem.cost / this.state.howMuch) * this.state.howOften;
    howLong = Math.ceil(howLong / this.state.howOften) * this.state.howOften;
    const getHowLong = (days) => {
      let months, weeks;
      days = Math.ceil(days);
      if (days >= 30) {
        months = parseInt(days / 30);
        days = days - months * 30;
      }
      if (days >= 7) {
        weeks = parseInt(days / 7);
        days = days - weeks * 7;
      }
      return (
        (months > 0 ? months + ' month' + (months > 1 ? 's, ' : ', ') : '') +
        (weeks > 0 ? weeks + ' week' + (weeks > 1 ? 's, ' : ', ') : '') +
        (days > 0 ? days + ' day' + (days > 1 ? 's, ' : ', ') : '')
      );
    };
    howLong = getHowLong(howLong);
    this.setState({ howLong });
  }

  onDropdownChange(ev) {
    if (ev.target.value === 'day') {
      this.setState({ howOften: 1, dropDownValue: 'day' });
    }
    if (ev.target.value === 'week') {
      this.setState({ howOften: 7, dropDownValue: 'week' });
    }
    if (ev.target.value === 'two weeks') {
      this.setState({ howOften: 14, dropDownValue: 'two weeks' });
    }
    if (ev.target.value === 'month') {
      this.setState({ howOften: 30, dropDownValue: 'month' });
    }
  }

  render() {
    const {
      onCalculatorOpen,
      onCalculatorClose,
      onTextChange,
      calculate,
      onDropdownChange,
    } = this;
    const { dropDownValue } = this.state;
    const item = this.props.wishListItem;
    return (
      <div>
        <Button
          id="calculateButton"
          onClick={onCalculatorOpen}
          size="large"
          variant="contained"
          color="primary"
        >
          Calculator
        </Button>
        <Dialog
          open={this.state.calculatorOpen}
          onClose={onCalculatorClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`How Long Until I Can Buy The ${item.itemName}?`}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={calculate}>
              <DialogContentText>Total Cost:</DialogContentText>
              <OutlinedInput
                className="wishListFormBox"
                defaultValue={item.cost}
                onChange={onTextChange}
                type="search"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <DialogContentText>How much are you saving?</DialogContentText>
              <OutlinedInput
                className="wishListFormBox"
                onChange={onTextChange}
                name="howMuch"
                type="search"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <DialogContentText>How often?</DialogContentText>
              <FormControl
                className="wishListFormBox"
                variant="outlined"
                type="search"
              >
                <InputLabel id="demo-simple-select-outlined">
                  Every...
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined"
                  id="demo-simple-select-outlined"
                  value={dropDownValue}
                  onChange={onDropdownChange}
                  label="howOften"
                >
                  <MenuItem value={'day'}>Day</MenuItem>
                  <MenuItem value={'week'}>Week</MenuItem>
                  <MenuItem value={'two weeks'}>Two Weeks</MenuItem>
                  <MenuItem value={'month'}>Month</MenuItem>
                </Select>
              </FormControl>
              <br />
              <div id="calculatorButtons">
                <Button type="submit" color="primary" variant="contained">
                  Calculate
                </Button>
                <Button
                  onClick={onCalculatorClose}
                  color="secondary"
                  variant="contained"
                >
                  Exit
                </Button>
              </div>
            </form>
            <DialogContentText>
              How long until you can purchase your wish:
            </DialogContentText>
            <TextField
              className="wishListFormBox"
              id="outlined-search"
              type="search"
              variant="outlined"
              value={this.state.howLong}
              disabled
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default CalculatorButton;
