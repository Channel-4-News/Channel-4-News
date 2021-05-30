import axios from 'axios';

const UPDATE_CHORE = 'UPDATE_CHORE';

const updateChore = (id, updateInfo) => {
  return async (dispatch) => {
    const chore = (await axios.put(`/api/chores/${id}`, updateInfo)).data;
    dispatch(_updateChore(chore));
  };
};

const _updateChore = (chore) => {
  console.log(chore);
  return { type: UPDATE_CHORE, chore };
};

export { UPDATE_CHORE, updateChore };
