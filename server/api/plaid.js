const { Router } = require('express');
const router = Router();
const plaid = require('plaid');

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

router.post('/create_link_token', async (req, res, next) => {
  try {
    const { id, legal_name, email_address } = req.body;
    const response = await plaidClient.createLinkToken({
      user: {
        client_user_id: 'user1',
        legal_name: 'Joe Fun',
        email_address: 'joe@test.com',
      },
      client_name: 'FUNDIT',
      products: ['auth', 'transactions', 'identity'],
      country_codes: ['US'],
      language: 'en',
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings'],
        },
      },
    });
    res.status(201).send(response.link_token);
  } catch (err) {
    next(err);
  }
});

router.post('/tokenExchange', async (req, res) => {
  const { token } = req.body;
  const { access_token: accessToken } = await plaidClient.exchangePublicToken(
    token
  );
  console.log('accessToken', accessToken);

  const authResponse = await plaidClient.getAuth(accessToken);
  console.log('Auth response:', authResponse);
  console.log('---------------');

  const identityResponse = await plaidClient.getIdentity(accessToken);
  console.log('Identity response:', identityResponse);
  console.log('---------------');

  const balanceResponse = await plaidClient.getBalance(accessToken);
  console.log('Balance response', balanceResponse);
  console.log('---------------');

  res.sendStatus(200);
});

module.exports = router;
