import React, { useState } from 'react';
import { connect } from 'react-redux';

const ChoreCard = (props) => {
  return (
    <div id="choreCard">
      <img className="choreIcon" src="./public/images/icons/bed.png" />
      <div id="cardChoreInfo">
        <div>Make your bed.</div>
        <small>
          Make your bed every morning before you leave to school. Weekends are
          off.
        </small>
      </div>
      <div>$5</div>
      <div id="assignmentContainer">
        <div>Name</div>
        <small>Assigned today</small>
        <small>Due tomorrow</small>
      </div>
    </div>
  );
};

export default connect(null)(ChoreCard);
