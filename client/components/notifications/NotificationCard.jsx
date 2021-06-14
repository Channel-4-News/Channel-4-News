import { Grid, makeStyles, IconButton, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { GrCheckboxSelected } from 'react-icons/gr';
import { GiTakeMyMoney } from 'react-icons/gi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { HashRouter as Router, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icons: {
    height: '50px',
    width: '50px',
  },
  completed: {
    backgroundColor: 'deepSkyBlue',
    borderRadius: '10px',
    margin: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '65px',
  },
  cash: {
    backgroundColor: 'limeGreen',
    borderRadius: '15px',
    margin: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '65px',
  },
  // notificationLink:{
  //     textDecoration: 'none',
  //     color: 'black',
  // }
  //<Link className={classes.notificationLink} to='chores'></Link>
}));

const NotificationCard = ({ currNote }) => {
  const classes = useStyles();
  return (
    <div>
      {currNote.isChoreCompleted ? (
        <Grid className={classes.completed}>
          <GrCheckboxSelected className={classes.icons} /> {currNote.text},
          amount due ${currNote.amount}!
          <Button
            // disabled={props.chore.wasPaid ? true : false}
            id="payoutButton"
            variant="outlined"
            // onClick={async () => {
            //   await axios.post('/api/stripe/charges', {
            //     customer: props.stripeAccount,
            //     amount: parseInt(props.chore.amount) * 100,
            //     kid: props.chore.user.firstName,
            //   });
            // setComplete(true);
            // props.updateChore(props.chore.id, {
            //   isComplete: true,
            //   wasPaid: true,
            // });
            //}}
          >
            Payout
          </Button>
        </Grid>
      ) : currNote.isCash ? (
        <Grid className={classes.cash}>
          <GiTakeMyMoney className={classes.icons} /> {currNote.text}!
          <IconButton onClick={() => console.log('delete')}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
};

export default connect()(NotificationCard);
