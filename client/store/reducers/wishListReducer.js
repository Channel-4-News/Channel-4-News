import { GET_WISH_LIST } from '../actions/childActions/getWishList';

const wishListReducer = (state = [], action) => {
  if (action.type === GET_WISH_LIST) {
    return (state = action.wishList);
  }
  return state;
};

export default wishListReducer;
