import React, { useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import BankAuth from './stripe/BankAuth';
import { Button } from '@material-ui/core';

const LinkPlaid = (props) => {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(true);
  const [processing, setProcessing] = useState(false);

  async function fetchToken() {
    let linkToken = (await axios.post('/api/plaid/create_link_token')).data;
    setToken(linkToken);
  }

  if (!token) {
    fetchToken();
  }

  const onSuccess = async (token, metadata) => {
    console.log('onSuccess', token, metadata);
    await axios.post('/api/plaid/tokenExchange', {
      token,
      accountId: metadata.accounts[0].id,
    });
    props.history.push('/');
  };
  const onExit = (error, metadata) => {
    setProcessing(false);
    console.log('onExit', error, metadata);
  };

  const onEvent = (eventName, metadata) => {
    console.log('onEvent', eventName, metadata);
  };

  const config = {
    token: token,
    onSuccess,
    onExit,
    onEvent,
  };

  const { open, ready, error } = usePlaidLink(config);

  return token ? (
    <div id="linkContainer">
      <div id="linkButton">
        <h4>CONNECT YOUR BANK ACCOUNT</h4>
        <BankAuth setAuth={setAuth} auth={auth} />
        <Button
          onClick={() => {
            setProcessing(true);
            open();
          }}
          disabled={auth}
          variant="contained"
        >
          {!processing ? 'Connect Your Bank Account' : 'Processing...'}
        </Button>
        <div id="learnAboutPlaid" onClick={() => {}}>
          <small>
            We use Plaid to create a secure connection between your bank account
            and FUNDIT. Click{' '}
            <a
              href="https://plaid.com/how-we-handle-data/"
              target="_blank"
              rel="noreferrer"
            >
              here{' '}
            </a>
            to learn more about Plaid.{' '}
          </small>
          <small>
            If you have any questions or wish to revoke authorization, please
            contact FUNDIT at contact@fundit.com.
          </small>
        </div>
      </div>
    </div>
  ) : (
    <div>LOADING...</div>
  );
};

export default LinkPlaid;
