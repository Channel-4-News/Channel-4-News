import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import PulseLoader from 'react-spinners/PulseLoader';
import {
  addNewWish,
  fillForm,
} from '../../store/actions/wishListActions/addNewWish';

const CreateNewWish = (props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState('url');
  const [select, setSelect] = useState('Miscellaneous');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(props.user.id);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (itemName.length > 35) {
      setItemName(itemName.slice(0, 35));
    }
  });

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };
  return (
    <div>
      <Button variant="contained" size="large" onClick={() => setOpen(true)}>
        Make A New Wish
      </Button>
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
            size={form === 'url' ? 'small' : 'large'}
          >
            Enter Url
          </Button>
          <Button
            onClick={() => setForm('form')}
            variant="contained"
            size={form === 'url' ? 'small' : 'large'}
          >
            Input Form
          </Button>
        </div>
        {form === 'url' ? (
          <div>
            <DialogContent id="withdrawBoxItems">
              <TextField
                id="wishListWithdrawBox"
                onChange={(event) => setUrl(event.target.value)}
                type="input"
                label="Product URL"
                variant="outlined"
                defaultValue={url}
              />
              <br />
              <DialogContentText id="alert-dialog-description">
                Pick a Category
              </DialogContentText>
              <div id="wishListDropdown">
                <div id="filterAndSortWishes">
                  <div id="chooseWishHover">
                    <Button
                      size="large"
                      id="withdrawButton"
                      variant="contained"
                    >
                      &nbsp;&nbsp;{select}&nbsp;&nbsp;
                    </Button>
                    <div id="wishDropdownContent">
                      <div onClick={() => setSelect('Electronics')}>
                        Electronics
                      </div>
                      <div onClick={() => setSelect('Clothing')}>Clothing</div>
                      <div onClick={() => setSelect('Entertainment')}>
                        Entertainment
                      </div>
                      <div onClick={() => setSelect('Toys')}>Toys</div>
                      <div onClick={() => setSelect('Food')}>Food</div>
                      <div onClick={() => setSelect('Miscelleneous')}>
                        Miscelleneous
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <PulseLoader
              id="pulseLoader"
              color="blue"
              loading={loading}
              size={20}
            />
            <DialogActions>
              <Button
                onClick={async () => {
                  setLoading(true);
                  const result = await props.fillForm(
                    url,
                    select,
                    props.user.id
                  );
                  setItemName(result.itemName);
                  setSelect(result.category);
                  setCost(result.cost);
                  setDescription(result.description);
                  setImgUrl(result.imgUrl);
                  setLinkUrl(result.linkUrl);
                  props.update();
                  setLoading(false);
                  setForm('form');
                }}
                color="primary"
                variant="contained"
              >
                Enter
              </Button>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div>
            <DialogContent id="createWishBoxItems1">
              <DialogContentText id="alert-dialog-description">
                Pick a Category
              </DialogContentText>
              <div id="costAndCategory">
                <div id="wishListDropdown" className="secondCreateDropdown">
                  <div id="filterAndSortWishes">
                    <div id="chooseWishHover">
                      <Button
                        size="large"
                        id="withdrawButton"
                        variant="contained"
                      >
                        &nbsp;&nbsp;{select}&nbsp;&nbsp;
                      </Button>{' '}
                      <div id="wishDropdownContent">
                        <div onClick={() => setSelect('Electronics')}>
                          Electronics
                        </div>
                        <div onClick={() => setSelect('Clothing')}>
                          Clothing
                        </div>
                        <div onClick={() => setSelect('Entertainment')}>
                          Entertainment
                        </div>
                        <div onClick={() => setSelect('Toys')}>Toys</div>
                        <div onClick={() => setSelect('Food')}>Food</div>
                        <div onClick={() => setSelect('Miscelleneous')}>
                          Miscelleneous
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className="wishListCreateBox"
                >
                  <InputLabel>Cost</InputLabel>
                  <OutlinedInput
                    value={cost}
                    onChange={(event) => setCost(event.target.value)}
                    label="Cost"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </div>
              <TextField
                className="wishListCreateBox"
                onChange={(event) => setItemName(event.target.value)}
                type="input"
                label="Product Name"
                variant="outlined"
                defaultValue={itemName}
              />
              <TextField
                className="wishListCreateBox"
                onChange={(event) => setImgUrl(event.target.value)}
                type="input"
                label="Image Url"
                variant="outlined"
                defaultValue={imgUrl}
              />
              <TextField
                className="wishListCreateBox"
                onChange={(event) => setLinkUrl(event.target.value)}
                type="input"
                label="Product Link"
                variant="outlined"
                defaultValue={linkUrl}
              />
              <TextField
                className="wishListCreateBox"
                onChange={(event) => setDescription(event.target.value)}
                multiline
                rows={4}
                type="input"
                label="Description"
                variant="outlined"
                defaultValue={description}
              />
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
                    category: select,
                    userId,
                    purchased,
                  });
                }}
                color="primary"
                variant="contained"
              >
                Enter
              </Button>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addNewWish: (item) => dispatch(addNewWish(item, history)),
    fillForm: (url, category, userId) =>
      dispatch(fillForm(url, category, userId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateNewWish)
);
