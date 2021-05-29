import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWishList } from '../../store/actions/childActions/getWishList';
import WishListCard from './WishListCard';

class WishList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getWishList(this.props.user.id);
    }
  }

  render() {
    if (this.props.wishList.length) {
      return (
        <div id="wishListWrapper">
          {this.props.wishList.map((wishListItem) => {
            return (
              <WishListCard key={wishListItem.id} wishListItem={wishListItem} />
            );
          })}
        </div>
      );
    } else {
      return <p>No Wishes</p>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wishList: state.wishList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishList: (userId) => dispatch(getWishList(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
