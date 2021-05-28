import React, { useState } from 'react';
import { connect } from 'react-redux';
import ChoreCard from './ChoreCard';

const Chores = (props) => {
  return (
    <div id="choresView">
      <ChoreCard />
    </div>
  );
};

export default connect(null)(Chores);
