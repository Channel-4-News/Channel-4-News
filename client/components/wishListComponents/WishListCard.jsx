import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CalculatorButton from './CalculatorButton';
import EditWishListCard from './EditWishListCard';
import { deleteWishListCard } from '../../store/actions/wishListActions/deleteWishListCard';
import { purchaseOrWithdraw } from '../../store/actions/wishListActions/purchaseOrWithdraw';
import PurchaseButton from './PurchaseButton';

const WishListCard = (props) => {
  const [edit, setEdit] = useState(false);
  const [purchased, setPurchased] = useState(props.wishListItem.purchased);
  const item = props.wishListItem;
  const { id } = props.user;
  if (edit === false) {
    return (
      <Card id="wishListCardWrapper">
        <Typography className="title" gutterBottom variant="h5" component="h2">
          {item.itemName}
          <span id="purchased-tag">{purchased ? 'Purchased!' : ''}</span>
        </Typography>
        <div id="itemRow">
          <Paper id="itemImage" variant="outlined">
            <img src={item.imgUrl} />
          </Paper>
          <div id="itemInfo">
            <div>Wish Cost:</div>
            <Paper className="itemValues" variant="outlined">
              ${item.cost}
            </Paper>
            <br />
            <div>Wish Category:</div>
            <Paper className="itemValues" variant="outlined">
              {item.category}
            </Paper>
            <br />
            <div>Wish Description:</div>
            <Paper
              id="itemDescriptionWrapper"
              className="itemValues"
              variant="outlined"
            >
              <Typography
                id="itemDescription"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {item.description}
              </Typography>
            </Paper>
          </div>
        </div>
        <div id="buttonRow">
          <CalculatorButton wishListItem={item} />
          <PurchaseButton
            purchaseOrWithdraw={() => props.purchaseOrWithdraw(id, item)}
            setPurchased={() => setPurchased(true)}
            item={item}
          />
          <Button
            size="large"
            onClick={() => setEdit(true)}
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={() => props.deleteWishListCard(item.id)}
            size="large"
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </Card>
    );
  } else {
    return (
      <EditWishListCard
        wishListItem={item}
        state={(edit) => {
          setEdit(edit);
        }}
      />
    );
  }
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteWishListCard: (id) => dispatch(deleteWishListCard(id, history)),
    purchaseOrWithdraw: (id, transaction) =>
      dispatch(purchaseOrWithdraw(id, transaction)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(WishListCard));
