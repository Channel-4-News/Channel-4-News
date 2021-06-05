import axios from 'axios';

const ADD_NEW_WISH = 'ADD_NEW_WISH';

const addNewWish = (url, category, userId) => {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/wishListItem/', {
        url,
        category,
        userId,
      });
      dispatch(_addNewWish(result));
    } catch (err) {
      console.log(err);
    }
  };
};

addNewWish();

const _addNewWish = (wishListItem) => {
  return { type: ADD_NEW_WISH, wishListItem };
};

export { addNewWish, ADD_NEW_WISH };
