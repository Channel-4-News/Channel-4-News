require('dotenv').config();
const { Router, json } = require('express');
const router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const path = require('path');
const util = require('util');

const plaid = require('plaid');
const plaidClient = new plaid.Client({
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,
  env: plaid.environments.sandbox,
});

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/create-link-token', async (req, res) => {
  console.log(plaidClient);
  const { link_token: linkToken } = await plaidClient.createLinkToken({
    user: {
      client_user_id: 'some-unique-identifier',
    },
    client_name: 'App of Tyler',
    products: ['auth', 'identity'],
    country_codes: ['US'],
    language: 'en',
  });

  res.json({ linkToken });
});

router.post('/token-exchange', async (req, res) => {
  const { publicToken } = req.body;
  const { access_token: accessToken } = await plaidClient.exchangePublicToken(
    publicToken
  );
  console.log(accessToken);

  const authResponse = await plaidClient.getAuth(accessToken);
  console.log('Auth response:');
  console.log(util.inspect(authResponse, false, null, true));
  console.log('---------------');

  const identityResponse = await plaidClient.getIdentity(accessToken);
  console.log('Identity response:');
  console.log(util.inspect(identityResponse, false, null, true));
  console.log('---------------');

  const balanceResponse = await plaidClient.getBalance(accessToken);
  console.log('Balance response');
  console.log(util.inspect(balanceResponse, false, null, true));
  console.log('---------------');

  res.sendStatus(200);
});

module.exports = router;
