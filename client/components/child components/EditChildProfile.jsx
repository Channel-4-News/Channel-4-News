import React, { Component } from 'react';

//Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';

//React Icons
import { FiEdit } from 'react-icons/fi';
import { GiKoala } from 'react-icons/gi';

//Redux Imports
import { connect } from 'react-redux';

//Style Import
import '../../../public/style/editChildProfile.css';

class EditChildProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev) {
    this.setState({
      ...this.state,
      [ev.target.name]: ev.target.value,
    });
  }

  reset() {
    const { close } = this.props;
    console.log(close);
    close();
  }

  render() {
    const { submit, close, open } = this.props;
    const { firstName, lastName, email, username } = this.state;

    return (
      <div id="profile-toggle">
        <Dialog open={open} onClose={close} fullWidth>
          <DialogTitle>Edit Your Profile!</DialogTitle>
          <GiKoala id="koala" />
          <Avatar
            className="avatar"
            alt="test"
            src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          />
          <FiEdit className="edit-pencil" />
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="First Name"
              type="name"
              name="firstName"
              fullWidth
              value={firstName}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              type="name"
              name="lastName"
              value={lastName}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              name="email"
              value={email}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="username"
              name="username"
              value={username}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Close</Button>
            <Button
              onClick={() => submit(firstName, lastName, email, username)}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(EditChildProfile);
