import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const DemoButtons = ({ currUser }) => {
  console.log(currUser);
  return (
    <div>
      <button
        onClick={async () => {
          await axios.put(`/api/users/allowance/${currUser.id}`, {
            allowance: 5,
          });
        }}
      >
        Allowance
      </button>
      <button
        onClick={async () => {
          await axios.post('/api/stripe/invoiceitems/cus_JdBOqmptzdoNis', {
            amount: 10000,
            description: 'Joeys Purchase',
          });
        }}
      >
        Add INVOICE item
      </button>
      <button
        onClick={async () => {
          await axios.post(
            `/api/stripe/invoice/cus_JdBOqmptzdoNis/${currUser.id}`
          );

          // if (test.id) {
          //   await axios.put(`/api/stripe/invoice/${test.id}/finalize`);
          //   console.log('invoice', test);
          // }
        }}
      >
        INVOICE
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser };
};

export default connect(mapStateToProps)(DemoButtons);
