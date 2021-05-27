import axios from 'axios';

const JOIN_FAMILY = 'JOIN_FAMILY';

const authFamily = (creds, userId) => {
  return async (dispatch) => {
    try {
      let response = (await axios.post('/api/auth/family', creds)).data;
      const { token } = response;
      const family = (
        await axios.get('/api/auth/family', {
          headers: {
            authorization: token,
          },
        })
      ).data;
      const user = (
        await axios.put(`/api/users/${userId}`, { familyId: family.id })
      ).data;
      dispatch(_joinFamily(user));
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

const _joinFamily = (user) => {
  return { type: JOIN_FAMILY, user };
};

export { JOIN_FAMILY, authFamily };
