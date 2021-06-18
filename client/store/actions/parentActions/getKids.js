import axios from 'axios';

const GET_KIDS = 'GET_KIDS';

const getKids = (id) => {
  return async (dispatch) => {
    const user = (await axios.get(`/api/users/${id}`)).data;
    const kids = user.family?.users.filter((user) => user.status === 'Child');
    dispatch(_getKids(kids));
  };
};

const _getKids = (kids) => {
  return { type: GET_KIDS, kids };
};

export { getKids, GET_KIDS };
