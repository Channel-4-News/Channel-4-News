import React, { useState } from 'react';
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
import {
  addNewWish,
  fillForm,
} from '../../store/actions/wishListActions/addNewWish';

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
  const [select, setSelect] = useState('Miscellaneous');
  const [url, setUrl] = useState('');

  const [itemName, setItemName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [userId, setUserId] = useState(props.user.id);

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
                  <option defaultValue={'Miscellaneous'}>Miscellaneous</option>
                </NativeSelect>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={async () => {
                  const result = await props.fillForm(
                    url,
                    select,
                    props.user.id
                  );
                  setItemName(result.itemName);
                  setCategory(result.category);
                  setCost(result.cost);
                  setDescription(result.description);
                  setImgUrl(result.imgUrl);
                  setLinkUrl(result.linkUrl);
                  console.log(userId);
                  props.update();
                  setForm('form');
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
          <div>
            <DialogContent id="withdrawBoxItems">
              <DialogContentText id="alert-dialog-description">
                Name
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={setItemName}
                type="search"
                variant="outlined"
                defaultValue={itemName}
              />
              <DialogContentText id="alert-dialog-description">
                Image
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={setImgUrl}
                type="search"
                variant="outlined"
                defaultValue={imgUrl}
              />
              <DialogContentText id="alert-dialog-description">
                Link
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={setLinkUrl}
                type="search"
                variant="outlined"
                defaultValue={linkUrl}
              />
              <DialogContentText id="alert-dialog-description">
                Cost
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={setCost}
                type="search"
                variant="outlined"
                defaultValue={cost}
              />
              <DialogContentText id="alert-dialog-description">
                Description
              </DialogContentText>
              <TextField
                id="wishListWithdrawBox"
                onChange={setDescription}
                type="search"
                variant="outlined"
                defaultValue={description}
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
                  <option defaultValue={'Miscellaneous'}>Miscellaneous</option>
                </NativeSelect>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={async () => {
                  await props.addNewWish({
                    itemName,
                    cost,
                    imgUrl,
                    linkUrl,
                    description,
                    category,
                    userId,
                  });
                  handleClose();
                  props.update();
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
    addNewWish: (item) => dispatch(addNewWish(item)),
    fillForm: (url, category, userId) =>
      dispatch(fillForm(url, category, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewWish);
