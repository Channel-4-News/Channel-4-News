import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateChore } from '../../store/actions/choreActions/updateChore';

const ChoreCard = (props) => {
  const [complete, setComplete] = useState(props.chore.isComplete);

  return (
    <div id={props.isParent ? 'choreCardParent' : 'choreCard'}>
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
          <img
            src="public/images/icons/edit.png"
            onClick={() => {
              props.updateClicked(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeChore: (id, info) => dispatch(updateChore(id, info)),
  };
};

export default connect(null, mapDispatchToProps)(ChoreCard);
