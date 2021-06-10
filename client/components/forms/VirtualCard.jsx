import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css';
import { connect } from 'react-redux';
import axios from 'axios';

const VirtualCard = (props) => {
  const [cardDetails, setCardDetails] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  // const cardBackground = document.getElementById

  useEffect(() => {
    if (props.currUser.id) {
      let info;
      const getCardInfo = async () => {
        info = (
          await axios.get(`/api/stripe/card/${props.currUser.virtualCard}`)
        ).data;
        info.exp_month =
          info.exp_month < 10 ? '0' + info.exp_month : info.exp_month;
        info.exp_year = `${info.exp_year}`.slice(2);
        setCardDetails({
          cvc: info.cvc,
          number: info.number,
          name: info.cardholder.name,
          expiry: info.exp_month + info.exp_year,
        });
      };
      getCardInfo();
    }
  }, [props.currUser]);

  return (
    <div id="PaymentForm">
      <Cards
        className="testing"
        cvc={cardDetails.cvc}
        expiry={cardDetails.expiry}
        focused={cardDetails.focus}
        name={cardDetails.name}
        number={cardDetails.number}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser };
};

export default connect(mapStateToProps)(VirtualCard);
