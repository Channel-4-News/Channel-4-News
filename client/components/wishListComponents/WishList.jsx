import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWishList } from '../../store/actions/wishListActions/getWishList';
import WishListCard from './WishListCard';
import SortAndFilterWishList from './SortAndFilterWishList';
import WithdrawMoneyDialog from './WithdrawMoneyDialog';
import CreateNewWish from './CreateNewWish';
import { orderBy } from 'lodash';
import {
  sortByMostExpensive,
  sortByLeastExpensive,
} from '../../utilities/wishListSort';

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'alphabetically',
      wishList: [],
      sorted: null,
    };
    this.changeSort = this.changeSort.bind(this);
    this.sortToggle = this.sortToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id && this.state.wishList.length === 0) {
      this.props.getWishList(this.props.user.id);
    }
  }

  componentDidUpdate() {
    let mostExpensive, leastExpensive, alphabetically;
    if (
      this.state.sorted !== true &&
      this.props.wishList !== this.state.wishList
    ) {
      let { wishList } = this.props;
      this.setState({ wishList });
    }
    if (this.state.sorted === false) {
      if (this.state.sort === 'most expensive') {
        mostExpensive = sortByMostExpensive(this.props.wishList);
        this.setState({ wishList: mostExpensive, sorted: true });
      } else if (this.state.sort === 'least expensive') {
        leastExpensive = sortByLeastExpensive(this.props.wishList);
        this.setState({ wishList: leastExpensive, sorted: true });
      } else if (this.state.sort === 'alphabetically') {
        alphabetically = orderBy(this.props.wishList, ['itemName'], ['asc']);
        this.setState({ wishList: alphabetically, sorted: true });
      }
    }
  }

  changeSort(sort) {
    this.setState({ sort });
  }

  sortToggle() {
    this.setState({ sorted: false });
  }

  render() {
    const { changeSort, sortToggle } = this;
    if (this.props.wishList.length) {
      return (
        <div id="wishListContent">
          <div id="wishListTopBar">
            <SortAndFilterWishList sort={changeSort} sortToggle={sortToggle} />
            <WithdrawMoneyDialog user={this.props.user} />
            <CreateNewWish update={sortToggle} user={this.props.user} />
          </div>
          <div id="wishListWrapper">
            {this.state.wishList.map((wishListItem) => {
              return (
                <WishListCard
                  user={this.props.user}
                  key={wishListItem.id}
                  wishListItem={wishListItem}
                  update={sortToggle}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div>No Wishes</div>;
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
