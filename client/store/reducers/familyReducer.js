import { CREATE_FAMILY } from '../actions/familyActions/createFamily';

const familyReducer = (state = {}, action) => {
  if (action.type === CREATE_FAMILY) {
    return (state = action.family);
  }
  return state;
};

export default familyReducer;
