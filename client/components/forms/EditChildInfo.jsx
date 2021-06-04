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
  const [newFirstName, setFirstName] = useState(firstName);
  const [newLastName, setLastName] = useState(lastName);
  const [newUsername, setUsername] = useState(username);
  const [newEmail, setEmail] = useState(email);
  const [newImgUrl, setImgUrl] = useState(imgUrl);

  const [dialogueOpen, setDialogoueOpen] = useState(false);

  //   const [errors, setErrors] = useState({
  //     username: 'Username',
  //     email: 'Email Address',
  //   });

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
  // const handleBlur = async (e, validation, field) => {
  //   const value = e.target.value;
  //   const error = await validation(e.target);
  //   console.log(error);
  //   if (error.error && value) setErrors({ ...errors, [field]: error.message });
  // };

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
              value={newFirstName}
              label="First Name"
              name="firstName"
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              className={classes.editTextinput}
              variant="outlined"
              label="Last Name"
              value={newLastName}
              name="lastName"
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              className={classes.editTextinput}
              variant="outlined"
              color="primary"
              value={newUsername}
              label="Username"
              // label={errors.username}
              // error={errors.username !== 'Username'}
              // onBlur={async (e) => {
              //   handleBlur(e, validUsername, 'username');
              // }}
              name="username"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.editTextinput}
              variant="outlined"
              label="Email Address"
              value={newEmail}
              name="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </form>
        <Button
          variant="contained"
          className={classes.saveEditButton}
          onClick={() =>
            handleSubmit(newFirstName, newLastName, newUsername, newEmail)
          }
        >
          Save!
        </Button>
      </div>
      <ChooseFile
        open={dialogueOpen}
        close={handleClose}
        submit={handleSubmit}
        firstName={newFirstName}
        lastName={newLastName}
        username={newUsername}
        email={newEmail}
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
