import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const createCard = async () => {
    // const card = await axios.post('/api/stripe/create_cardholder', {
    //   name: 'Test',
    //   email: 'test@test.com',
    // });
    // console.log(card);
  };

  const createAccount = async () => {
    // const account = await axios.post('/api/stripe/create_bank_account', {
    //   id: 'cus_JdBOqmptzdoNis',
    //   accountToken: 'btok_1IzurxGMLeOpoTZxivNeSiOt',
    // });
    // console.log(account);
  };

  const createCharge = async () => {
    const charge = await axios.post('/api/stripe/charges', {
      customer: 'cus_JdBOqmptzdoNis',
      amount: 400,
      kid: 'Joe',
    });
    console.log(charge);
  };

  return (
    <div>
      <h3>FUNDIT!</h3>
      <div>About</div>
      <div>Team</div>
      <div>Tech Used</div>
      <div>Github Repo</div>
      <button onClick={createCard}>Create card</button>
      <button onClick={createAccount}>CREATE ACCOUNT</button>
      <button onClick={createCharge}>Create charge</button>
    </div>
  );
};

export default Home;
