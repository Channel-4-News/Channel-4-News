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
      filter: '',
      wishList: [],
      sorted: false,
    };
    this.changeSort = this.changeSort.bind(this);
    this.sortToggle = this.sortToggle.bind(this);
  }

  async componentDidMount() {
    if (this.props.user.id && this.state.wishList.length === 0) {
      await this.props.getWishList(this.props.user.id);
      if (this.state.wishList.length > 0) {
        if (this.state.sort === 'most expensive') {
          const mostExpensive = sortByMostExpensive(this.state.wishList);
          this.setState({ wishList: mostExpensive, sorted: true });
        } else if (this.state.sort === 'least expensive') {
          const leastExpensive = sortByLeastExpensive(this.state.wishList);
          this.setState({ wishList: leastExpensive, sorted: true });
        } else if (this.state.sort === 'alphabetically') {
          const alphabetically = orderBy(
            this.state.wishList,
            ['itemName'],
            ['asc']
          );
          this.setState({ wishList: alphabetically, sorted: true });
        }
      }
    }
  }

  changeSort(sort) {
    this.setState({ sort });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.sorted === false &&
      this.props.wishList !== this.state.wishList
    ) {
      const { wishList } = this.props;
      this.setState({ wishList });
    }
    if (prevState.sort !== this.state.sort) {
      if (this.state.sort === 'most expensive') {
        const mostExpensive = sortByMostExpensive(this.state.wishList);
        this.setState({ wishList: mostExpensive, sorted: true });
      } else if (this.state.sort === 'least expensive') {
        const leastExpensive = sortByLeastExpensive(this.state.wishList);
        this.setState({ wishList: leastExpensive, sorted: true });
      } else if (this.state.sort === 'alphabetically') {
        const alphabetically = orderBy(
          this.state.wishList,
          ['itemName'],
          ['asc']
        );
        this.setState({ wishList: alphabetically, sorted: true });
      }
    }
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
            <CreateNewWish user={this.props.user} />
          </div>
          <div id="wishListWrapper">
            {this.state.wishList.map((wishListItem) => {
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
