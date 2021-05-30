import { ADD_CHORE } from '../actions/choreActions/addChore';
import { GET_CHORES } from '../actions/choreActions/fetchChoresByFamily';
import { UPDATE_CHORE } from '../actions/choreActions/updateChore';

const choresReducer = (state = [], action) => {
  if (action.type === GET_CHORES) {
    return (state = action.chores);
  }
  if (action.type === ADD_CHORE) {
    return (state = action.chores);
  }
  return state;
};

export default choresReducer;
