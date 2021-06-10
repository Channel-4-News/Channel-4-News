import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  TextField,
  Button,
  makeStyles,
  MenuItem,
  Menu,
} from '@material-ui/core';
import Cards from 'react-credit-cards';

const CreateCard = (props) => {
  const [val, setVal] = useState('#3e98ff');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();
  return (
    <div>
      <h4>CREATE YOUR CARD</h4>
      <TextField
        className={classes.root}
        label="Full Name"
        variant="outlined"
        color="secondary"
        onChange={(e) => {
          setCardDetails({ ...cardDetails, name: e.target.value });
        }}
      />
      <div id="cardColorPicker">
        <h5>Choose A Color</h5>
        <Button
          // color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          style={{ backgroundColor: `${val}` }}
        >
          &nbsp;
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            style={{ backgroundColor: '#3e98ff' }}
            onClick={() => {
              handleClose();
              setVal('#3e98ff');
              setBackgroundColor('#3e98ff');
            }}
          >
            &nbsp;
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              setVal('#ef0066');
              setBackgroundColor('#ef0066');
            }}
            style={{ backgroundColor: '#ef0066' }}
          >
            &nbsp;
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              setVal('#fffc49');
              setBackgroundColor('#fffc49');
            }}
            style={{ backgroundColor: '#fffc49' }}
          >
            &nbsp;
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              setVal('#ff7300');
              setBackgroundColor('#ff7300');
            }}
            style={{ backgroundColor: '#ff7300' }}
          >
            &nbsp;
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              setVal('#00d9ff');
              setBackgroundColor('#00d9ff');
            }}
            style={{ backgroundColor: '#00d9ff' }}
          >
            &nbsp;
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              setVal('#00ff6a');
              setBackgroundColor('#00ff6a');
            }}
            style={{ backgroundColor: '#00ff6a' }}
          >
            &nbsp;
          </MenuItem>
        </Menu>
      </div>
      <div>
        <h5>Choose An Image</h5>
        <div id="cardImageSelector">
          <img
            src="public/images/cardIcons/basketball.png"
            name="basketball"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/bathdog.png"
            name="bathdog"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/bernie.png"
            name="bernie"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/catFace.png"
            name="catFace"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/dogFace.png"
            name="dogFace"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/earth.png"
            name="earth"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/flowerpower.png"
            name="flowerpower"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/panda.png"
            name="panda"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/penguinpaper.png"
            name="penguinpaper"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/pizzapizza.png"
            name="pizzapizza"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/spiderman.png"
            name="spiderman"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/sushi.png"
            name="sushi"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
          <img
            src="public/images/cardIcons/tacotaco.png"
            name="tacotaco"
            onClick={(e) => setBackgroundImage(e.target.name)}
          />
        </div>
      </div>
      <Cards
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

export default connect(mapStateToProps)(CreateCard);
