import axios from 'axios';

const DELETE_CHORE = 'DELETE_CHORE';

const deleteChore = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/chores/${id}`);
    dispatch(_deleteChore(id));
  };
};

const _deleteChore = (deletedId) => {
  return { type: DELETE_CHORE, deletedId };
};

export { DELETE_CHORE, deleteChore };
