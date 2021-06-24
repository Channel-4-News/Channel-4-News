import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/userActions/updateUser';

const LandingPlaidLink = (props) => {
  const [token, setToken] = useState('');
  const [processing, setProcessing] = useState(false);

  async function fetchToken() {
    let linkToken = (await axios.post('/api/plaid/create_link_token')).data;
    setToken(linkToken);
  }

  if (!token) {
    fetchToken();
  }

  const onSuccess = async (token, metadata) => {
    const stripeBA = (
      await axios.post('/api/plaid/tokenExchange', {
        token,
        accountId: metadata.accounts[0].id,
      })
    ).data;
    await axios.post('/api/stripe/create_bank_account', {
      id: props.user.stripeAccount,
      accountToken: stripeBA.stripe_bank_account_token,
    });
    props.updateUser(props.user.id, { hasBankAccount: true });
    props.history.go(0);
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
    <Button
      id="PLplaidLink"
      onClick={() => {
        setProcessing(true);
        open();
      }}
      variant="contained"
    >
      {!processing ? 'Update Bank Account' : 'Processing...'}
    </Button>
  ) : (
    <div>LOADING...</div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (id, info) => dispatch(updateUser(id, info)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LandingPlaidLink)
);
