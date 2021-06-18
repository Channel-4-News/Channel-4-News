import { Grid, makeStyles, IconButton, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GrCheckboxSelected } from 'react-icons/gr';
import { GiTakeMyMoney } from 'react-icons/gi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { deleteNotificationThunk } from '../../store/actions/notificationActions/deleteNotification';
import axios from 'axios';
import { updateChore } from '../../store/actions/choreActions/updateChore';
import { useState } from 'react';

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

const NotificationCard = (props) => {
  const classes = useStyles();
  const [chore, setChore] = useState({});

  useEffect(() => {
    if (props.currNote.chore) {
      const id = props.currNote.chore.id;
      const getSpecificChore = async (id) => {
        const { data: singleChore } = await axios.get(`/api/chores/${id}`);
        setChore(singleChore);
      };
      getSpecificChore(id);
    } else {
      setChore({});
    }
  }, []);

  return (
    <div>
      {props.currNote.isChoreCompleted ? (
        <Grid className={classes.completed}>
          <GrCheckboxSelected className={classes.icons} /> {props.currNote.text}
          , amount due ${props.currNote.amount}!
          <Button
            disabled={props.currNote.isChore && chore.wasPaid ? true : false}
            id="payoutButton"
            variant="outlined"
            onClick={async () => {
              await axios.post('/api/stripe/charges', {
                customer: props.currNote.to.stripeAccount,
                amount: parseInt(props.currNote.amount) * 100,
                kid: props.currNote.from.firstName,
              });
              props.destroy(props.currNote.id);
              props.updateChore(chore.id, {
                isComplete: true,
                wasPaid: true,
              });
            }}
          >
            Payout
          </Button>
          <IconButton onClick={() => props.destroy(props.currNote.id)}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      ) : props.currNote.isCash ? (
        <Grid className={classes.cash}>
          <GiTakeMyMoney className={classes.icons} /> {props.currNote.text}!
          <IconButton onClick={() => props.destroy(props.currNote.id)}>
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
    updateChore: (id, updateInfo) => dispatch(updateChore(id, updateInfo)),
  };
};

export default connect(null, mapDispatchToProps)(NotificationCard);
