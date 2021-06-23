import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const DemoButtons = ({ currUser, kids }) => {
  const joey = kids[2];
  return (
    <div>
      <button
        onClick={async () => {
          await axios.put(`/api/users/allowance/${currUser.id}`, {
            allowance: currUser.allowance,
          });
        }}
      >
        Allowance
      </button>
      <button
        onClick={async () => {
          await axios.put(`/api/users/allowance/stop/${currUser.id}`, {
            allowance: currUser.allowance,
          });
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

          // if (test.id) {
          //   await axios.put(`/api/stripe/invoice/${test.id}/finalize`);
          //   console.log('invoice', test);
          // }
        }}
      >
        INVOICE
      </button>
      <div>{joey?.balance}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser, kids: state.kids };
};

export default connect(mapStateToProps)(DemoButtons);
