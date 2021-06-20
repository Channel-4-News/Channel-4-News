import axios from 'axios';

const EDIT_WISH_LIST_CARD = 'EDIT_WISH_LIST_CARD';

const editWishListCard = (wishListCard) => {
  return async (dispatch) => {
    try {
      let { id } = wishListCard;
      const newWishListItem = (
        await axios.put(`/api/wishlistitem/${id}`, wishListCard)
      ).data;
      dispatch(_editWishListCard(newWishListItem));
    } catch (err) {
      console.log(err);
    }
  };
};

const _editWishListCard = (wishListItem) => {
  return { type: EDIT_WISH_LIST_CARD, wishListItem };
};

export { EDIT_WISH_LIST_CARD, editWishListCard };
