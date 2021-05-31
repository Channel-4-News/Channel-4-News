import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWishList } from '../../store/actions/wishListActions/getWishList';
import WishListCard from './WishListCard';
import SortAndFilterWishList from './SortAndFilterWishList';
import WithdrawMoneyDialog from './WithdrawMoneyDialog';
import CreateNewWish from './CreateNewWish';

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
      filter: '',
    };
    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getWishList(this.props.user.id);
    }
  }

  changeSort(sort) {
    this.setState({ sort });
  }

  componentDidUpdate() {}

  render() {
    const { changeSort } = this;
    if (this.props.wishList.length) {
      return (
        <div id="wishListContent">
          <div id="wishListTopBar">
            <SortAndFilterWishList sort={changeSort} />
            <WithdrawMoneyDialog />
            <CreateNewWish />
          </div>
          <div id="wishListWrapper">
            {this.props.wishList.map((wishListItem) => {
              return (
                <WishListCard
                  user={this.props.user}
                  key={wishListItem.id}
                  wishListItem={wishListItem}
                />
              );
            })}
          </div>
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
