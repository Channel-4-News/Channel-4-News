import axios from 'axios';

const GET_WISH_LIST = 'GET_WISH_LIST';

const getWishList = (userId) => {
  return async (dispatch) => {
    try {
      const wishList = (await axios.get(`/api/wishlistitem/${userId}`)).data;
      dispatch(_getWishList(wishList));
    } catch (err) {
      console.log(err);
    }
  };
};

const _getWishList = (wishList) => {
  return { type: GET_WISH_LIST, wishList };
};

export { GET_WISH_LIST, getWishList };
