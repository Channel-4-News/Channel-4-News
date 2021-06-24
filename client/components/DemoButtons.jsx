import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const DemoButtons = ({ currUser }) => {
  return (
    <div>
      <button
        onClick={async () => {
          await axios.put(`/api/users/allowance/${currUser.id}`, {
            allowance: currUser.allowance,
            intervalNum: 7,
            name: currUser.firstName,
          });
        }}
      >
        Allowance
      </button>
      <button
        onClick={async () => {
          await axios.put('/api/users/stop/allowance');
        }}
      >
        Stop Allowance
      </button>
      <button
        onClick={async () => {
          await axios.post(
            `/api/stripe/invoiceitems/${currUser.stripeAccount}`
          );
        }}
      >
        Add INVOICE item
      </button>
      <button
        onClick={async () => {
          await axios.post(
            `/api/stripe/invoice/${currUser.stripeAccount}/${currUser.id}`
          );
        }}
      >
        INVOICE
      </button>
      <button
        onClick={async () => {
          await axios.put('/api/stripe/invoice/stopall');
        }}
      >
        Stop Invoices
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser, kids: state.kids };
};

export default connect(mapStateToProps)(DemoButtons);
