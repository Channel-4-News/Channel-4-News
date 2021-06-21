import { SET_CURRENT_KID } from '../actions/parentActions/setCurrentKid';

const currKidReducer = (state = {}, action) => {
  if (action.type === SET_CURRENT_KID) {
    return (state = action.id);
  }
  return state;
};

export default currKidReducer;
