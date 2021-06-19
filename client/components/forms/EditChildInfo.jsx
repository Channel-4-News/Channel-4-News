import React, { useState } from 'react';

//Redux Imports
import { connect } from 'react-redux';

//Thunk Import
import { updateChildProfileThunk } from '../../store/actions/userActions/editChildProfile';

//MaterialUI Imports
import {
  Grid,
  TextField,
  Paper,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core';

//React Icons
import { FiEdit } from 'react-icons/fi';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

//Component Imports
import ChooseFile from './ChooseFile';

//Validation Util
import {
  validUsername,
  validEmail,
  validName,
} from '../../utilities/utilityValidation';

import axios from 'axios';
import { setAllowance } from '../../store/actions/allowance/setAllowance';

//React Notifications Components
// import ReactNotification from 'react-notifications-component';
// import { store } from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';
// import { validUsername } from '../../utilities/utilityValidation';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'white',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    borderRadius: '12px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  editAvatar: {
    width: '150px',
    height: '150px',
    alignSelf: 'center',
    marginBottom: '20px',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  editTextinput: {
    width: '300px',
    margin: theme.spacing(1),
    backgroundColor: 'white',
  },
  editPencilPic: {
    color: 'white',
    height: '25px',
    width: '25px',
    zIndex: '1',
    '&:hover': { backgroundColor: 'transparent' },
    marginLeft: '-27px',
  },
}));

const EditChildInfo = ({ currUser, updateUser, history, setAllowance }) => {
  if (!currUser.id) {
    return null;
  }
  const { firstName, lastName, username, email, imgUrl } = currUser;

  const [newImgUrl, setImgUrl] = useState(imgUrl);

  const [dialogueOpen, setDialogoueOpen] = useState(false);

  const [errors, setErrors] = useState({
    username: 'Username',
    email: 'Email Address',
    firstName: 'First Name',
    lastName: 'Last Name',
  });

  const [editValues, setEditValues] = useState({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
  });

  const handleOpen = () => {
    setDialogoueOpen(true);
  };

  const handleClose = () => {
    setDialogoueOpen(false);
  };

  const handleSubmit = async (firstName, lastName, username, email, imgUrl) => {
    const { id } = currUser;
    await updateUser({ id, firstName, lastName, username, email, imgUrl });
    history.push('/home');
  };

  //handles when user clicks off of input and checks validation
  const handleBlur = async (e, validation, field) => {
    const value = e.target.value;
    const error = await validation(e.target);
    if (error.error && value >= 0)
      setErrors({ ...errors, [field]: error.message });
  };

  //checks validation, sets label, sets signUpValues
  const handleChange = (e, validation, field, label) => {
    const error = validation(e.target);
    if (!error.error || e.target.value.length)
      setErrors({ ...errors, [field]: label });
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const classes = useStyles();

  return (
    <div id="editChild">
      <Paper className={classes.pageContent}>
        <div className={classes.root}>
          <h3 style={{ fontWeight: 'normal', marginBottom: '20px' }}>
            UPDATE YOUR PROFILE
          </h3>
          <Avatar className={classes.editAvatar} src={imgUrl} />
          <div id="avatarEdit">
            <Button
              onClick={handleOpen}
              style={{ backgroundColor: 'transparent' }}
            >
              <AddAPhotoOutlinedIcon className={classes.editPencilPic} />
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <Grid className={classes.editForm} item xs={6}>
              <TextField
                className={classes.editTextinput}
                variant="outlined"
                color="primary"
                value={editValues.firstName}
                label={errors.firstName}
                name="firstName"
                error={errors.firstName !== 'First Name'}
                required
                onBlur={async (e) => {
                  handleBlur(e, validName, 'firstName');
                }}
                fullWidth
                onChange={(e) => {
                  handleChange(e, validName, 'firstName', 'First Name');
                }}
              />
              <TextField
                className={classes.editTextinput}
                variant="outlined"
                label={errors.lastName}
                error={errors.lastName !== 'Last Name'}
                value={editValues.lastName}
                name="lastName"
                required
                onBlur={async (e) => {
                  handleBlur(e, validName, 'lastName');
                }}
                fullWidth
                onChange={(e) => {
                  handleChange(e, validName, 'lastName', 'Last Name');
                }}
              />
              <TextField
                className={classes.editTextinput}
                variant="outlined"
                color="primary"
                value={editValues.username}
                label={errors.username}
                error={errors.username !== 'Username'}
                onBlur={async (e) => {
                  handleBlur(e, validUsername, 'username');
                }}
                name="username"
                fullWidth
                onChange={(e) => {
                  handleChange(e, validUsername, 'username', 'Username');
                }}
              />
              <TextField
                className={classes.editTextinput}
                variant="outlined"
                label={errors.email}
                name="email"
                value={editValues.email}
                error={errors.email !== 'Email Address'}
                onBlur={async (e) => {
                  handleBlur(e, validEmail, 'email');
                }}
                fullWidth
                onChange={(e) => {
                  handleChange(e, validEmail, 'email', 'Email Address');
                }}
              />
            </Grid>
          </form>
          <Button
            variant="contained"
            color="secondary"
            className={classes.saveEditButton}
            onClick={() =>
              handleSubmit(
                editValues.firstName,
                editValues.lastName,
                editValues.username,
                editValues.email
              )
            }
          >
            Update
          </Button>
        </div>
        <ChooseFile
          open={dialogueOpen}
          close={handleClose}
          submit={handleSubmit}
          firstName={editValues.firstName}
          lastName={editValues.lastName}
          username={editValues.username}
          email={editValues.email}
          imgUrl={newImgUrl}
        />
      </Paper>
      <button
        onClick={async () => {
          const test = (
            await axios.put(`/api/users/allowance/${currUser.id}`, {
              allowance: 5,
            })
          ).data;
          // setAllowance(5, 7);
        }}
      >
        TEST
      </button>
      <button
        onClick={async () => {
          const test = (
            await axios.post('/api/stripe/invoiceitems/cus_JdBOqmptzdoNis', {
              amount: 10000,
              description: 'Joeys Purchase',
            })
          ).data;
          console.log('item', test);
        }}
      >
        Add INVOICE item
      </button>
      <button
        onClick={async () => {
          const test = (
            await axios.post(
              `/api/stripe/invoice/cus_JdBOqmptzdoNis/${currUser.id}`
            )
          ).data;
          // if (test.id) {
          //   await axios.put(`/api/stripe/invoice/${test.id}/finalize`);
          //   console.log('invoice', test);
          // }
        }}
      >
        INVOICE
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    currUser: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateChildProfileThunk(user)),
    setAllowance: (balance, daysToAllowance) =>
      dispatch(setAllowance(balance, daysToAllowance)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChildInfo);
