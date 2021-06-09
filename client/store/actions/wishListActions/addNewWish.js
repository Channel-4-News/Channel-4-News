import axios from 'axios';

const ADD_NEW_WISH = 'ADD_NEW_WISH';

const addNewWish = (item, history) => {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/wishListItem/', item);
      dispatch(_addNewWish(result));
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
};

const fillForm = (url, category, userId) => {
  return async () => {
    try {
      const result = await axios.post('/api/wishListItem/form', {
        url,
        category,
        userId,
      });
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };
};

addNewWish();

const _addNewWish = (wishListItem) => {
  return { type: ADD_NEW_WISH, wishListItem };
};

export { addNewWish, ADD_NEW_WISH, fillForm };
