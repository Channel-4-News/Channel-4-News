import axios from 'axios';

const DELETE_WISH_LIST_CARD = 'DELETE_WISH_LIST_CARD';

const deleteWishListCard = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/wishlistitem/${id}`);
      dispatch(_deleteWishListCard(id));
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
};

const _deleteWishListCard = (id) => ({
  type: DELETE_WISH_LIST_CARD,
  id,
});

export { DELETE_WISH_LIST_CARD, deleteWishListCard };
