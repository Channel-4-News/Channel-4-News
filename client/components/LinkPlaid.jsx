import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import BankAuth from './stripe/BankAuth';
import { Button } from '@material-ui/core';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions/userActions/updateUser';

const LinkPlaid = (props) => {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false);

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
    <div id="signup-wrapper">
      <div id="linkContainer">
        <div id="linkButton">
          <h4>CONNECT YOUR BANK ACCOUNT</h4>
          <div id="bankConnectIcons">
            <ImportantDevicesIcon color="secondary" />
            <SettingsEthernetIcon color="secondary" />
            <AccountBalanceOutlinedIcon color="secondary" />
          </div>
          <BankAuth setAuth={setAuth} auth={auth} />
          <Button
            color="secondary"
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
              We use Plaid to create a secure connection between your bank
              account and FUNDIT. Click{' '}
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
    </div>
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
  connect(mapStateToProps, mapDispatchToProps)(LinkPlaid)
);
