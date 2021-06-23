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
  const [cardHolder, setCardHolder] = useState({});
  const [cardIdx, setCardIdx] = useState(null);

  useEffect(() => {
    if (props.currUser.status === 'Child') setCardHolder(props.currUser);
    if (props.currUser.status === 'Parent') setCardHolder(props.kid);
  }, [props.currUser, props.kid]);

  useEffect(() => {
    if (props.kids?.length && props.kid?.id) {
      const idx = props.kids.findIndex(
        (kid) => kid.firstName === cardHolder.firstName
      );
      const kidIdx = idx * 2;
      setCardIdx(kidIdx);
    }
  }, [props.kids, cardHolder]);

  useEffect(() => {
    if (flipped && cardHolder.cardColor) {
      setCardDetails({ ...cardDetails, focus: 'cvc' });
      cardBackground[1].style.backgroundColor = props.currUser.cardColor;
      cardBackground[1].style.backgroundImage = 'url()';
    }
    if (!flipped) setCardDetails({ ...cardDetails, focus: '' });
  }, [flipped]);

  useEffect(() => {
    // console.log(cardHolder.cardColor, cardIdx);
    if (cardHolder.cardColor && props.kid?.id && cardIdx >= 0) {
      cardBackground[cardIdx].style.backgroundColor = cardHolder.cardColor;
      cardBackground[
        cardIdx
      ].style.backgroundImage = `url(${cardHolder.cardImage})`;
    }
    if (cardHolder?.id && !props.kid?.id) {
      cardBackground[0].style.backgroundColor = cardHolder.cardColor;
      cardBackground[0].style.backgroundImage = `url(${cardHolder.cardImage})`;
    }
  }, [cardBackground, cardHolder, cardIdx]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (cardHolder?.id) {
      const getCardInfo = async () => {
        let info;
        try {
          info = (
            await axios.get(`/api/stripe/card/${cardHolder.virtualCard}`, {
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
  }, [cardHolder]);

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
      {!props.kid?.id ? (
        <Button
          style={{ width: '30%', alignSelf: 'center' }}
          variant="contained"
          color="secondary"
          onClick={() => setFlipped(!flipped)}
        >
          Flip
        </Button>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser, kids: state.kids };
};

export default connect(mapStateToProps)(VirtualCard);
