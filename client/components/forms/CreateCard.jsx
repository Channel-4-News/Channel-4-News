import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  TextField,
  Button,
  makeStyles,
  MenuItem,
  Menu,
} from '@material-ui/core';
import Cards from 'react-credit-cards';
import CardStepper from './createCard/CardStepper';

const CreateCard = (props) => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [cardBackground] = useState(
    document.getElementsByClassName('rccs__card--front')
  );

  const [cardDetails, setCardDetails] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [textFieldStyle, setTextFieldStyle] = useState({
    width: '400px',
    alignSelf: 'center',
  });
  const [colorPickerStyle, setColorPickerStyle] = useState({
    display: 'none',
  });
  const [imagesStyle, setImagesStyle] = useState({
    display: 'none',
  });

  useEffect(() => {
    if (cardBackground[0])
      cardBackground[0].style.backgroundColor = backgroundColor;
    if (cardBackground[0] && backgroundImage) {
      cardBackground[0].style.backgroundImage = `url(public/images/cardIcons/${backgroundImage}.png)`;
      cardBackground[0].style.backgroundSize = 'auto 170px';
    }
  }, [cardBackground, backgroundColor, backgroundImage]);

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const handleColorClick = (color) => {
    setBackgroundColor(color);
    axios.put(`/api/users/${props.currUser.id}`, { cardColor: color });
  };

  const handleImageClick = (e) => {
    setBackgroundImage(e.target.name);
    axios.put(`/api/users/${props.currUser.id}`, {
      cardImage: e.target.name,
    });
  };

  const classes = useStyles();
  return (
    <div id="createYourCard">
      <div id="tempCardView">
        <Cards
          cvc={cardDetails.cvc}
          expiry={cardDetails.expiry}
          focused={cardDetails.focus}
          name={cardDetails.name}
          number={cardDetails.number}
        />
      </div>
      <CardStepper
        setInputStyle={setTextFieldStyle}
        inputStyle={textFieldStyle}
        setColorPickerStyle={setColorPickerStyle}
        setImagesStyle={setImagesStyle}
        history={props.history}
        name={cardDetails.name}
      />
      <div id="cardChooser">
        <TextField
          style={textFieldStyle}
          className={classes.root}
          label="Full Name"
          variant="outlined"
          color="secondary"
          onChange={(e) => {
            setCardDetails({ ...cardDetails, name: e.target.value });
          }}
        />
        <div id="cardColorPicker" style={colorPickerStyle}>
          {/* <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
            style={{ backgroundColor: `${val}` }}
          >
            &nbsp;
          </Button> */}
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            name="#3e98ff"
            test="tomatoe"
            onClick={() => handleColorClick('#3e98ff')}
            variant="contained"
            style={{ backgroundColor: '#3e98ff' }}
          >
            &nbsp;
          </Button>
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            onClick={() => handleColorClick('rgb(255, 72, 0)')}
            variant="contained"
            style={{ backgroundColor: 'rgb(255, 72, 0)' }}
          >
            &nbsp;
          </Button>
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            onClick={() => handleColorClick('#ff73ff')}
            variant="contained"
            style={{ backgroundColor: '#ff73ff' }}
          >
            &nbsp;
          </Button>
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            onClick={() => handleColorClick('#fffc49')}
            variant="contained"
            style={{ backgroundColor: '#fffc49' }}
          >
            &nbsp;
          </Button>
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            onClick={() => handleColorClick('#00d9ff')}
            variant="contained"
            style={{ backgroundColor: '#00d9ff' }}
          >
            &nbsp;
          </Button>
          <Button
            // color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            // onClick={handleClick}
            onClick={() => handleColorClick('#00ff6a')}
            variant="contained"
            style={{ backgroundColor: '#00ff6a' }}
          >
            &nbsp;
          </Button>
        </div>
        <div id="imageSelectContainer" style={imagesStyle}>
          <div id="cardImageSelector">
            <img
              src="public/images/cardIcons/basketball.png"
              name="basketball"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/bathdog.png"
              name="bathdog"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/bernie.png"
              name="bernie"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/catpeak.png"
              name="catpeak"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/dogFace.png"
              name="dogFace"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/earth.png"
              name="earth"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/donut.png"
              name="donut"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/orangutanstand.png"
              name="orangutanstand"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/flowerpower.png"
              name="flowerpower"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/panda.png"
              name="panda"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/penguinpaper.png"
              name="penguinpaper"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/pizzapizza.png"
              name="pizzapizza"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/spiderman.png"
              name="spiderman"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/sushi.png"
              name="sushi"
              onClick={handleImageClick}
            />
            <img
              src="public/images/cardIcons/tacotaco.png"
              name="tacotaco"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currUser: state.currUser };
};

export default connect(mapStateToProps)(CreateCard);
