import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { addNewWish } from '../../store/actions/wishListActions/addNewWish';
import EditWishListCard from './EditWishListCard';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    height: 48,
    padding: '0 100px 0 0',
    boxShadow: '1px 1px 1px 1px rgba(54, 54, 54, 0.3)',
    borderRadius: 4,
    position: 'relative',
    border: '1px',
    borderColor: 'black',
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 3,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FE6B8B 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const CreateNewWish = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState('url');
  const [select, setSelect] = useState('Miscelleneous');
  const [url, setUrl] = useState('');
  const [itemAdded, setItemAdded] = useState(false);
  const [lastItem, setLastItem] = useState({});
  // const isFirstRender = useRef(true);
  const onItemAdded = () => {
    setItemAdded(true);
    const newItemId = props.wishList
      .map((item) => item.id)
      .sort((a, b) => b - a)[0];
    const item = props.wishList.find((item) => item.id === newItemId);
    setLastItem({ ...item });
  };
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //     console.log('lastItem changed');
  //   }
  // }, [lastItem]);
  if (itemAdded) {
    setForm('form');
    setItemAdded(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const onSelectChange = (event) => {
    setSelect(event.target.value);
  };
  const onUrlChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <div>
      <StyledButton onClick={() => setOpen(true)}>Make A New Wish</StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="makeAWishDialog"
      >
        <DialogTitle id="alert-dialog-title">Make A New Wish</DialogTitle>
        <div id="makeNewWishButtons">
          <Button
            onClick={() => setForm('url')}
            variant="contained"
            size="small"
          >
            Enter Url
          </Button>
          <Button
            onClick={() => setForm('form')}
            variant="contained"
            size="small"
          >
            Input Form
          </Button>
        </div>
        {form === 'url' ? (
          <div>
            <DialogContent id="withdrawBoxItems">
              <DialogContentText id="alert-dialog-description">
                Enter Link
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={onUrlChange}
                type="search"
                variant="outlined"
                defaultValue={url}
              />
              <DialogContentText id="alert-dialog-description">
                Pick a Category
              </DialogContentText>
              <FormControl className={classes.margin}>
                <NativeSelect
                  id="demo-customized-select-native"
                  value={select}
                  onChange={onSelectChange}
                  input={<BootstrapInput />}
                >
                  <option value={'Electronics'}>Electronics</option>
                  <option value={'Clothing'}>Clothing</option>
                  <option value={'Entertainment'}>Entertainment</option>
                  <option value={'Toys'}>Toys</option>
                  <option value={'Food'}>Food</option>
                  <option defaultValue={'Miscelleneous'}>Miscelleneous</option>
                </NativeSelect>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  props.addNewWish(
                    'https://www.amazon.com/Olight-I3T-EOS-Lumens-Dual-Output/dp/B07DLRK7Q5?ref_=Oct_DLandingS_D_ecb7a14f_60&smid=A3E6E1V9X0VZ5Q',
                    'Electronics',
                    props.user.id
                  );
                  onItemAdded();
                }}
                color="primary"
              >
                Enter
              </Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        ) : (
          ''
        )}
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wishList: state.wishList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewWish: (url, category, userId) =>
      dispatch(addNewWish(url, category, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewWish);
