import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const WishListCard = (props) => {
  const item = props.wishListItem;
  console.log(props);
  return (
    <Card id="wishListCardWrapper">
      <Typography gutterBottom variant="h5" component="h2">
        {item.itemName}
      </Typography>
      <img src={item.imgUrl} />
      {/* <Typography variant="body2" color="textSecondary" component="p">
        {item.description}
      </Typography> */}
      <p>{item.cost}</p>
    </Card>
  );
};

export default WishListCard;
