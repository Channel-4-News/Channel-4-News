import axios from 'axios';

const ADD_CHORE = 'ADD_CHORE';

const addChore = (chore) => {
  return async (dispatch) => {
    if (chore.recurringInterval) chore.isRecurring = true;
    if (chore.due === '') chore.due = null;
    const choreAdded = (await axios.post('/api/chores', chore)).data;
    const chores = (await axios.get(`/api/chores/family/${chore.familyId}`))
      .data;
    dispatch(_addChore(chores));
  };
};

const _addChore = (chores) => {
  return { type: ADD_CHORE, chores };
};

export { ADD_CHORE, addChore };
