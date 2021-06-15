import { Grid, makeStyles, IconButton, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { GrCheckboxSelected } from 'react-icons/gr';
import { GiTakeMyMoney } from 'react-icons/gi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { deleteNotificationThunk } from '../../store/actions/notificationActions/deleteNotification';
import axios from 'axios';

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
}));

const NotificationCard = ({ currNote, destroy }) => {
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
            onClick={async () => {
              await axios.post('/api/stripe/charges', {
                customer: currNote.to.stripeAccount,
                amount: parseInt(currNote.amount) * 100,
                kid: currNote.from.firstName,
              });
              destroy(currNote.id);
            }}
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
          <IconButton onClick={() => destroy(currNote.id)}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroy: (currNotficationId) =>
      dispatch(deleteNotificationThunk(currNotficationId)),
  };
};

export default connect(null, mapDispatchToProps)(NotificationCard);
