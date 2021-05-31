import React, { Component } from 'react';

//Redux Imports
import { connect } from 'react-redux';
import { updateChildProfileThunk } from '../../store/actions/userActions/editChildProfile';

//Material UI Imports
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//Style Import
import '../../../public/style/childProfile.css';

//Component Import
import EditChildProfile from './editProfile/EditChildProfile';

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
    const { id } = this.props.currUser;

    updateUser({ id, firstName, lastName, username, email, imgUrl });
    this.handleClose();
  }

  render() {
    const { currUser } = this.props;
    const { dialogueOpen } = this.state;
    const { firstName, lastName, email, username, imgUrl } = currUser;

    //Prevent losing info after hard reload on EditChild Profile Component
    if (!currUser.id) {
      return null;
    }

    return (
      <React.Fragment>
        <form className="childProfile-form" onSubmit={this.handleSubmit}>
          <Card className="card-container">
            <CardMedia
              component="img"
              height="140"
              className="profile-img"
              image={imgUrl}
            />
            <CardContent>
              <Typography className="detail-text" variant="h5">
                First Name:
              </Typography>
              <Typography variant="h6">{firstName}</Typography>
              <Typography className="detail-text" variant="h5">
                Last Name:
              </Typography>
              <Typography variant="h6">{lastName}</Typography>
              <Typography className="detail-text" variant="h5">
                Email:
              </Typography>
              <Typography variant="h6">{email}</Typography>
              <Typography className="detail-text" variant="h5">
                Username:
              </Typography>
              <Typography variant="h6">{username}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleOpen}
              >
                Edit Profile!
              </Button>
            </CardActions>
          </Card>

          <EditChildProfile
            open={dialogueOpen}
            close={this.handleClose}
            submit={this.handleSubmit}
            {...currUser}
            // firstName={firstName}
            // lastName={lastName}
            // email={email}
            // username={username}
            // imgUrl={imgUrl}
          />
        </form>
      </React.Fragment>
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

{
  /* <Avatar id="avatar" alt="current user pic" src={imgUrl} /> */
}

{
  /* <div>
            <h5 className='text-detail'>First Name:</h5>
            <p className='child-info'>{firstName}</p>
            </div>
            <div>
            <h5 className='text-detail'>Last Name:</h5>
            <p className='child-info'>{lastName}</p>
            </div>
            <div>

            <h5 className='text-detail'>Email:</h5>
            <p className='child-info'>{email}</p>
            </div>
            <div>
            <h5 className='text-detail'>Username:</h5>
            <p className='child-info'>{username}</p>            </div>
 */
}
