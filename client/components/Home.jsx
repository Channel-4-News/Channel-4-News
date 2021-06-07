import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const createCard = async () => {
    const card = await axios.post('/api/stripe/create_cardholder');
    console.log(card);
  };

  return (
    <div>
      <h3>FUNDIT!</h3>
      <div>About</div>
      <div>Team</div>
      <div>Tech Used</div>
      <div>Github Repo</div>
      <button onClick={createCard}>CLICK</button>
    </div>
  );
};

export default Home;
