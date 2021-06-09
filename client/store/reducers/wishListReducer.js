import { GET_WISH_LIST } from '../actions/wishListActions/getWishList';
import { EDIT_WISH_LIST_CARD } from '../actions/wishListActions/editWishListCard';
import { DELETE_WISH_LIST_CARD } from '../actions/wishListActions/deleteWishListCard';
import { ADD_NEW_WISH } from '../actions/wishListActions/addNewWish';

const wishListReducer = (state = [], action) => {
  if (action.type === GET_WISH_LIST) {
    return (state = action.wishList);
  }
  if (action.type === EDIT_WISH_LIST_CARD) {
    const sameItems = state.filter(
      (item) => item.id !== action.wishListItem.id
    );
    const newState = [...sameItems, action.wishListItem];
    return newState;
  }
  if (action.type === DELETE_WISH_LIST_CARD) {
    const leftoverItems = state.filter((item) => item.id !== action.id.id);
    return [...leftoverItems];
  }
  if (action.type === ADD_NEW_WISH) {
    return [...state, action.wish];
  }
  return state;
};

export default wishListReducer;
