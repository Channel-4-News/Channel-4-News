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

//Component Imports
import ChooseFile from './ChooseFile';

//Validation Util
import {
  validUsername,
  validEmail,
  validName,
} from '../../utilities/utilityValidation';

//React Notifications Components
// import ReactNotification from 'react-notifications-component';
// import { store } from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';
// import { validUsername } from '../../utilities/utilityValidation';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: 'lightgreen',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    color: 'green',
    height: '25px',
    width: '25px',
  },
}));

const EditChildInfo = ({ currUser, updateUser }) => {
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

  const handleSubmit = (firstName, lastName, username, email, imgUrl) => {
    const { id } = currUser;
    updateUser({ id, firstName, lastName, username, email, imgUrl });
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
    <Paper className={classes.pageContent}>
      <div className={classes.root}>
        <h2>Edit Your Profile!</h2>
        <Avatar className={classes.editAvatar} src={imgUrl} />
        <Button onClick={handleOpen}>
          <FiEdit className={classes.editPencilPic} />
        </Button>
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
          Save!
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChildInfo);
