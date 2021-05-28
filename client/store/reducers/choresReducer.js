import { GET_CHORES } from '../actions/choreActions/fetchChoreListChores';

const choresReducer = (state = [], action) => {
  if (action.type === GET_CHORES) {
    return (state = action.chores);
  }
  return state;
};

export default choresReducer;
