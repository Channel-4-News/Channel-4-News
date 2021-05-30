import React, { Component } from 'react';

//Redux Imports
import { connect } from 'react-redux';
import { updateChildProfileThunk } from '../../store/actions/userActions/editChildProfile';

//Material UI Imports
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

//Style Import
import '../../../public/style/childProfile.css';
import EditChildProfile from './EditChildProfile';

class ChildProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogueOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({
      ...this.state,
      dialogueOpen: true,
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      dialogueOpen: false,
    });
  }

  handleSubmit(firstName, lastName, email, username, imgUrl) {
    const { updateUser } = this.props;
    const { id } = this.props.user;

    updateUser({ id, firstName, lastName, username, email, imgUrl });
    this.handleClose();
  }

  render() {
    const { currUser } = this.props;
    const { dialogueOpen } = this.state;
    const { firstName, lastName, email, username, imgUrl } = currUser;

    return (
      <div className="child-profile-container">
        <h3>{firstName}s Profile!</h3>
        <Avatar id="avatar" alt="current user pic" src={imgUrl} />
        <div>
          <h6>First Name:</h6>
          <p className="child-profile-p">{firstName}</p>
          <h6>Last Name:</h6>
          <p className="child-profile-p">{lastName}</p>
          <h6>Email:</h6>
          <p className="child-profile-p">{email}</p>
          <h6>Username:</h6>
          <p className="child-profile-p">{username}</p>
        </div>
        <Button
          className="edit-profile-button"
          variant="outlined"
          color="primary"
          onClick={this.handleOpen}
        >
          Edit Profile!
        </Button>

        <EditChildProfile
          open={dialogueOpen}
          close={this.handleClose}
          submit={this.handleSubmit}
          {...currUser}
        />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ChildProfile);
