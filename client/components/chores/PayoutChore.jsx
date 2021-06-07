import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const PayoutChore = () => {
  return (
    <Button id="payoutButton" variant="outlined">
      Payout
    </Button>
  );
};

export default connect()(PayoutChore);
