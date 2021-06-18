import { GET_KIDS } from '../actions/parentActions/getKids';

const kidsReducer = (state = [], action) => {
  if (action.type === GET_KIDS) {
    return (state = action.kids);
  }
  return state;
};

export default kidsReducer;
