import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editWishListCard } from '../../store/actions/wishListActions/editWishListCard';

class PurchaseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      buttonDisabled: this.props.item.purchased,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  disableButton() {
    this.setState({ buttonDisabled: true });
  }

  render() {
    const { handleClickOpen, handleClose, disableButton } = this;
    const { open } = this.state;
    return (
      <div>
        {!this.state.buttonDisabled ? (
          <Button
            onClick={() => handleClickOpen()}
            size="large"
            variant="contained"
          >
            Purchase
          </Button>
        ) : (
          <Button
            disabled
            onClick={() => handleClickOpen()}
            size="large"
            variant="contained"
          >
            Purchase
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to purchase?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This cannot be undone...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                return (
                  handleClose(),
                  this.props.setPurchased(),
                  this.props.purchaseOrWithdraw(),
                  this.props.editWishListCard({
                    ...this.props.item,
                    purchased: true,
                  }),
                  disableButton()
                );
              }}
              color="primary"
            >
              Fund It!
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editWishListCard: (wishListCard) =>
      dispatch(editWishListCard(wishListCard)),
  };
};

export default connect(null, mapDispatchToProps)(PurchaseButton);
