import React, { Component } from 'react';

//Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//React Icons
import { FiEdit } from 'react-icons/fi';
import { GiKoala } from 'react-icons/gi';

//Redux Imports
import { connect } from 'react-redux';

//Style Import
import '../../../../public/style/editChildProfile.css';

//Component Import
import ChooseFile from './ChooseFile';

class EditChildProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      imgUrl: this.props.imgUrl,
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(ev) {
    this.setState({
      ...this.state,
      [ev.target.name]: ev.target.value,
    });
  }

  reset() {
    const { close, firstName, lastName, username, email, imgUrl } = this.props;
    close();
    setTimeout(() => {
      this.setState({
        firstName,
        lastName,
        username,
        email,
        imgUrl,
      });
    }, 100);
  }

  render() {
    const { submit, close, open } = this.props;
    const { firstName, lastName, email, username, imgUrl } = this.state;
    return (
      <div id="profile-toggle">
        <Dialog open={open} onClose={close} fullWidth>
          <DialogTitle>Edit Your Profile!</DialogTitle>
          <div className="mid-section-profile">
            <GiKoala id="koala" />
            <FiEdit className="edit-pencil" />
          </div>
          <ChooseFile
            id={this.props.id}
            imgUrl={imgUrl}
            value={imgUrl || ''}
            photoChange={this.handleChange}
          />
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="First Name"
              type="name"
              name="firstName"
              fullWidth
              value={firstName || ''}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Last Name"
              type="name"
              name="lastName"
              value={lastName || ''}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              name="email"
              value={email || ''}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="dense"
              id="username"
              label="Username"
              type="username"
              name="username"
              value={username || ''}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.reset}>Close</Button>
            <Button
              onClick={() =>
                submit(firstName, lastName, email, username, imgUrl)
              }
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
