import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { GrCheckboxSelected } from 'react-icons/gr';
import { GiTakeMyMoney } from 'react-icons/gi';
import { VscError } from 'react-icons/vsc';

const useStyles = makeStyles((theme) => ({
  icons: {
    height: '50px',
    width: '50px',
  },
  completed: {
    backgroundColor: 'blue',
  },
  incomplete: {
    backgroundColor: 'red',
  },
  cash: {
    backgroundColor: 'green',
  },
}));

const NotificationCard = ({ currNote }) => {
  const classes = useStyles();
  return (
    <div>
      {currNote.isChoreCompleted ? (
        <Grid className={classes.completed}>
          <GrCheckboxSelected className={classes.icons} /> {currNote.text}
        </Grid>
      ) : currNote.isCash ? (
        <Grid className={classes.cash}>
          <GiTakeMyMoney className={classes.icons} /> {currNote.text}
        </Grid>
      ) : (
        <Grid className={classes.incomplete}>
          <VscError className={classes.icons} /> {currNote.text}
        </Grid>
      )}
    </div>
  );
};

export default connect()(NotificationCard);
