import axios from 'axios';

const UPDATE_CHORE = 'UPDATE_CHORE';

const updateChore = (id, updateInfo) => {
  return async (dispatch) => {
    const chore = (await axios.put(`/api/chores/${id}`, updateInfo)).data;
    const chores = (await axios.get(`/api/chores/family/${chore.familyId}`))
      .data;
    dispatch(_updateChore(chores));
  };
};

const _updateChore = (chores) => {
  return { type: UPDATE_CHORE, chores };
};

export { UPDATE_CHORE, updateChore };
