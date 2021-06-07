import React, { useEffect, useState } from 'react';
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios';

const LinkPlaid = (props) => {
  const [token, setToken] = useState('');

  async function fetchToken() {
    let linkToken = await axios.post('/api/plaid/create_link_token');
    setToken(linkToken);
  }

  if (!token) {
    fetchToken();
  }

  const onSuccess = async (token, metadata) => {
    console.log('onSuccess', token, metadata);
    await axios.post('/api/plaid/tokenExchange', { token });
    props.history.push('/');
  };
  const onExit = (error, metadata) => console.log('onExit', error, metadata);

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata);
    // if(metadata === 'OPEN') {
    // props.getToken()
    // }
  };

  return token.data ? (
    <PlaidLink
      onSuccess={onSuccess}
      onExit={onExit}
      onEvent={onEvent}
      token={token.data}
    >
      Connect!
    </PlaidLink>
  ) : (
    <div>LOADING...</div>
  );
};

export default LinkPlaid;
