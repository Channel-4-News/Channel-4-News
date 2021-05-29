import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const WishListCard = (props) => {
  const item = props.wishListItem;
  console.log(props);
  return (
    <Card id="wishListCardWrapper">
      <Typography className="title" gutterBottom variant="h5" component="h2">
        {item.itemName}
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
        <Button variant="contained">Calculator</Button>
        <Button variant="contained">Purchase</Button>
        <Button variant="contained">Edit</Button>
        <Button color="secondary" variant="contained">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default WishListCard;
