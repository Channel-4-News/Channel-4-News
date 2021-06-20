import axios from 'axios';

const UPDATE_FAMILY = 'UPDATE_FAMILY';

const updateFamily = (id, updateInfo) => {
  return async (dispatch) => {
    const family = (await axios.put(`/api/family/${id}`, updateInfo)).data;
    dispatch(_updateFamily(family));
  };
};

const _updateFamily = (family) => {
  return { type: UPDATE_FAMILY, family };
};

export { UPDATE_FAMILY, updateFamily };
