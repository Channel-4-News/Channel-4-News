const UPDATE_ALLOWANCE = 'UPDATE_ALLOWANCE';

const updateAllowance = (balance, daysToAllowance) => {
  return {
    type: UPDATE_ALLOWANCE,
    balance,
    daysToAllowance,
  };
};

export { UPDATE_ALLOWANCE, updateAllowance };
