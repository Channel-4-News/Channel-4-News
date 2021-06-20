import React, { useState } from 'react';
import { connect } from 'react-redux';

import SpendingGraph from '../child components/SpendingGraph';

import Card from '@material-ui/core/Card';

const ChildCard = (props) => {
  const { kid } = props;
  console.log(kid);
  return (
    <Card id="kidCard">
      <div id="kidCardAvatarContainer">
        <img id="kidCardAvatar" src={kid.imgUrl}></img>
      </div>
      <div>{kid.username}</div>
      <div>Balance: {kid.balance}</div>
      <SpendingGraph
        transactions={kid.transactions}
        small={true}
        kid={kid.firstName}
      />
      <div></div>
    </Card>
  );
};

export default connect()(ChildCard);
