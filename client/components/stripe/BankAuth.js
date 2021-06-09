import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const BankAuth = (props) => {
  return (
    <div>
      <div id="bankAcctAuth">
        <Checkbox onClick={() => props.setAuth(!props.auth)} />
        <div>
          I authorize FUNDIT to electronically debit my account and, if
          necessary, electronically credit my account to correct erroneous
          debits.
        </div>
      </div>
    </div>
  );
};

export default BankAuth;
