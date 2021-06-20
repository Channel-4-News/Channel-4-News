import { Grid, makeStyles, IconButton, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GrCheckboxSelected } from 'react-icons/gr';
import { GiTakeMyMoney } from 'react-icons/gi';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Avatar from '@material-ui/core/Avatar';
import { deleteNotificationThunk } from '../../store/actions/notificationActions/deleteNotification';
import axios from 'axios';
import { updateChore } from '../../store/actions/choreActions/updateChore';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  icons: {
    height: '30px',
    width: '30px',
    alignSelf: 'center',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  completed: {
    backgroundColor: 'deepSkyBlue',
    borderRadius: '10px',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '65px',
    // marginLeft:'auto',
    // marginRight:'auto',
    textAlign: 'center',
  },
  cash: {
    backgroundColor: 'limeGreen',
    borderRadius: '15px',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '65px',
  },
}));

const NotificationCard = (props) => {
  const classes = useStyles();
  const [chore, setChore] = useState({});
  const [payoutMessage, setPayoutMessage] = useState('PAYOUT');

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
  }, [props.currNote.chore]);

  return (
    <div>
      {props.currNote.isChoreCompleted ? (
        <div className="choreCompletedNote">
          <Avatar className={classes.large} src={props.currNote.from.imgUrl} />
          <div>
            {props.currNote.from.firstName} completed:{' '}
            {props.currNote.chore.name}
          </div>
          <div>${props.currNote.amount}</div>
          <button
            disabled={props.currNote.isChore && chore.wasPaid ? true : false}
            className="border-gradient border-gradient-purple"
            // variant="outlined"
            onClick={async () => {
              setPayoutMessage('PROCESSING');
              await axios.post('/api/stripe/charges', {
                customer: props.currNote.to.stripeAccount,
                amount: parseInt(props.currNote.amount) * 100,
                kid: props.currNote.from.firstName,
              });
              props.destroy(props.currNote.id);
              setPayoutMessage('PAYOUT');
              props.updateChore(chore.id, {
                isComplete: true,
                wasPaid: true,
              });
            }}
          >
            {payoutMessage}
          </button>
          <IconButton onClick={() => props.destroy(props.currNote.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      ) : props.currNote.isCash ? (
        <div className="withdrawalNote">
          <Avatar className={classes.large} src={props.currNote.from.imgUrl} />
          <div>{props.currNote.from.firstName} initiated a withdrawal.</div>
          <div>${props.currNote.amount}</div>
          <div>
            <img
              src="public/images/icons/withdraw.png"
              style={{ width: '85%', marginLeft: '5%' }}
            />
          </div>
          <IconButton onClick={() => props.destroy(props.currNote.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      ) : (
        <div className="withdrawalNote">
          <div className="noteInvoiceLabel">INVOICE</div>
          {/* <Avatar className={classes.large} src={props.currNote.from.imgUrl} /> */}
          <div>
            <a
              href={`${props.currNote.text}`}
              className="clickForInvoice"
              target="_blank"
              rel="noreferrer noopener"
            >
              Click here to view your invoice.
            </a>
          </div>
          <div>${props.currNote.amount / 100}</div>
          <div>
            <img
              src="public/images/icons/invoice.png"
              style={{ width: '65%', marginLeft: '5%', marginTop: '2%' }}
            />
          </div>
          <IconButton onClick={() => props.destroy(props.currNote.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chores: state.chores,
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroy: (currNotficationId) =>
      dispatch(deleteNotificationThunk(currNotficationId)),
    updateChore: (id, updateInfo) => dispatch(updateChore(id, updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard);
