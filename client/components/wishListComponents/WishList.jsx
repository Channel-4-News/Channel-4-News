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
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getWishList(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.user.id && this.state.wishList.length === 0) {
    //   this.props.getWishList(this.props.user.id);
    // }
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
    if (prevState.wishList.length !== this.state.wishList.length) {
      this.setState({});
    }
  }

  changeSort(sort) {
    this.setState({ sort });
  }

  sortToggle() {
    this.setState({ sorted: false });
  }

  reRender() {
    let { wishList } = this.props;
    this.setState({ wishList });
  }

  render() {
    const { changeSort, sortToggle, reRender } = this;
    return (
      <div>
        {this.props.wishList.length ? (
          <div id="wishListContent">
            <div id="wishListTopBar">
              <div id="wishlistHeader">WISHLIST</div>
              <SortAndFilterWishList
                sort={changeSort}
                sortToggle={sortToggle}
              />
              <WithdrawMoneyDialog user={this.props.user} />
              <CreateNewWish
                update={sortToggle}
                user={this.props.user}
                newItem={reRender}
              />
            </div>
            <div id="wishListWrapper">
              {this.state.wishList.map((wishListItem, idx) => {
                return (
                  <WishListCard
                    user={this.props.user}
                    key={idx}
                    wishListItem={wishListItem}
                    update={sortToggle}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div id="wishListContent">
            <div id="wishListTopBar">
              <div id="wishlistHeader">WISHLIST</div>
              <CreateNewWish
                update={sortToggle}
                user={this.props.user}
                newItem={reRender}
              />
            </div>
            <h1>Currently No Wishes!</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wishList: state.wishList,
    user: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishList: (userId) => dispatch(getWishList(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
