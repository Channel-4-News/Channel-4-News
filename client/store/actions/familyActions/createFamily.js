import axios from 'axios';

const CREATE_FAMILY = 'CREATE_FAMILY';

const createFamily = (family) => {
  return async (dispatch) => {
    try {
      const newFamily = (await axios.post('/api/families', family)).data;
      dispatch(_createFamily(newFamily));
      return true;
    } catch (err) {
      console.log(err);
    }
  };
};

const _createFamily = (family) => {
  return { type: CREATE_FAMILY, family };
};

export { CREATE_FAMILY, createFamily };
