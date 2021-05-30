import { GET_WISH_LIST } from '../actions/childActions/getWishList';
import { EDIT_WISH_LIST_CARD } from '../actions/childActions/editWishListCard';

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
  return state;
};

export default wishListReducer;
