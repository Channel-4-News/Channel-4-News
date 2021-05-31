import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateChore } from '../../store/actions/choreActions/updateChore';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateIcon from '@material-ui/icons/Create';
import { deleteChore } from '../../store/actions/choreActions/deleteChore';

const ChoreCard = (props) => {
  const [complete, setComplete] = useState(props.chore.isComplete);

  const today = new Date();
  let expired;
  if (props.chore.due && new Date(props.chore.due) < today) expired = true;
  return (
    <div
      className={
        props.isParent && !expired
          ? 'choreCardParent'
          : !expired
            ? 'choreCard'
            : props.isParent && expired
              ? 'choreCardParent expiredCard'
              : 'choreCard expiredCard'
      }
    >
      <input
        type="checkbox"
        className="choreCompletedCheck"
        checked={complete ? 'checked' : null}
        onChange={() => {
          setComplete(!complete);
          props.completeChore(props.chore.id, {
            isComplete: !complete,
          });
        }}
      />
      <img className="choreIcon" src={props.chore.icon} />
      <div className="cardChoreInfo">
        <div>{props.chore.name}</div>
        <small>{props.chore.description}</small>
      </div>
      <div>${props.chore.amount}</div>
      <div className="assignmentContainer">
        <div>{props.chore.user.firstName}</div>
        <small>Daily</small>
      </div>
      {props.isParent ? (
        <div className="editChore">
          <IconButton
            onClick={() => {
              props.updateClicked(true);
              props.setChore(props.chore);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => props.deleteChore(props.chore.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeChore: (id, info) => dispatch(updateChore(id, info)),
    deleteChore: (id) => dispatch(deleteChore(id)),
  };
};

export default connect(null, mapDispatchToProps)(ChoreCard);
