import React, { Component } from 'react';

class WishList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div id="wishListWrapper">
        {this.props.user.wishList.map((wishListItem) => {
          <p>This is a wishlist Item</p>;
        })}
      </div>
    );
  }
}

export default WishList;
