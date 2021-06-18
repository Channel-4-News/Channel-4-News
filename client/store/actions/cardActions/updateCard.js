const UPDATE_CARD = 'UPDATE_CARD';

const updateCard = (cardNumber, image, color) => {
  return { type: UPDATE_CARD, color, image, cardNumber };
};

export { UPDATE_CARD, updateCard };
