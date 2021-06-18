import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { HashRouter as Link } from 'react-router-dom';
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
  if (props.wishListItem) {
    const [edit, setEdit] = useState(false);
    const item = props.wishListItem;
    const { id } = props.user;
    if (edit === false) {
      return (
        <Card id="wishListCardWrapper">
          <div className="itemTitle">
            <a
              id="itemUrlLink"
              target="_blank"
              rel="noreferrer"
              href={item.linkUrl}
            >
              {/* <Typography
              className="title"
              gutterBottom
              variant="h5"
              component="h2"
              id="wishListTitleText"
            > */}
              {item.itemName}

              {item.purchased ? (
                <span id="purchased-tag">Purchased! </span>
              ) : null}

              {/* </Typography> */}
            </a>
          </div>
          <div id="itemRow">
            <Paper id="itemImage" variant="outlined">
              <img src={item.imgUrl} />
            </Paper>
            <div id="itemInfo">
              <div></div>
              <Paper
                className="itemValues"
                variant="outlined"
                style={{ marginTop: '10px' }}
              >
                ${item.cost}
              </Paper>
              <br />
              {/* <div>Category:</div>
              <Paper className="itemValues" variant="outlined">
                {item.category}
              </Paper> */}
              {/* <br /> */}
              {/* <div>Description:</div> */}
              {/* <Paper
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
              </Paper> */}
            </div>
          </div>
          <div id="buttonRow">
            <CalculatorButton wishListItem={item} />
            <PurchaseButton
              purchaseOrWithdraw={() => props.purchaseOrWithdraw(id, item)}
              item={item}
              state={() => props.update()}
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
          state={() => {
            setEdit(false);
            props.update();
          }}
        />
      );
    }
  } else {
    return '';
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
