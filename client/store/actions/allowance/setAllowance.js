const SET_ALLOWANCE = 'SET_ALLOWANCE';

const setAllowance = (balance, daysToAllowance) => {
  return {
    type: SET_ALLOWANCE,
    balance,
    daysToAllowance,
  };
};

export { SET_ALLOWANCE, setAllowance };
