import axios from 'axios';

const GET_CHORES = 'GET_CHORES';

const getChores = (id) => {
  return async (dispatch) => {
    const chores = (await axios.get(`/chores/chores/${id}`)).data;
    dispatch(_getChores(chores));
  };
};

const _getChores = (chores) => {
  return { type: GET_CHORES, chores };
};

export { GET_CHORES, getChores };
