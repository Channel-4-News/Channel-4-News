const LOGOUT_USER = 'LOGOUT USER';

const logout = () => {
  window.localStorage.removeItem('userToken');
  return (dispatch) => {
    dispatch(_logout());
  };
};

const _logout = () => {
  return { type: LOGOUT_USER };
};

export { LOGOUT_USER, logout };
