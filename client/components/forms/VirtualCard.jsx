import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import { Button } from '@material-ui/core';

import { connect } from 'react-redux';
import axios from 'axios';

const VirtualCard = (props) => {
  const [inf, setInf] = useState();
  const [cardBackground] = useState(
    document.getElementsByClassName('rccs__card__background')
  );
  const [cardDetails, setCardDetails] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (flipped) {
      setCardDetails({ ...cardDetails, focus: 'cvc' });
      cardBackground[1].style.backgroundColor = props.currUser.cardColor;
      cardBackground[1].style.backgroundImage = 'url()';
    }
    if (!flipped) setCardDetails({ ...cardDetails, focus: '' });
  }, [flipped]);

  useEffect(() => {
    cardBackground[0].style.backgroundColor = props.currUser.cardColor;
    cardBackground[0].style.backgroundImage = `url(${props.currUser.cardImage})`;
  }, [cardBackground]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (props.currUser.id) {
      const getCardInfo = async () => {
        let info;
        try {
          info = (
            await axios.get(`/api/stripe/card/${props.currUser.virtualCard}`, {
              cancelToken: source.token,
            })
          ).data;
          info.exp_month =
            info.exp_month < 10 ? '0' + info.exp_month : info.exp_month;
          info.exp_year = `${info.exp_year}`.slice(2);
          setInf(info);
        } catch (err) {
          console.log(err);
        }
      };
      getCardInfo();
    }
    return () => {
      source.cancel('Component unmounted');
    };
  }, [props.currUser]);

  useEffect(() => {
    if (inf?.cvc)
      setCardDetails({
        cvc: inf.cvc,
        number: inf.number,
        name: inf.cardholder.name,
        expiry: inf.exp_month + inf.exp_year,
      });
  }, [inf]);

  return (
    <div id="virtualCardContainer">
      <Cards
        className="testing"
        cvc={cardDetails.cvc}
        expiry={cardDetails.expiry}
        focused={cardDetails.focus}
        name={cardDetails.name}
        number={cardDetails.number}
      />
      <Button
        style={{ width: '30%', alignSelf: 'center' }}
        variant="contained"
        color="secondary"
        onClick={() => setFlipped(!flipped)}
      >
        Flip
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser };
};

export default connect(mapStateToProps)(VirtualCard);
