import React from 'react';
import { Button } from '@material-ui/core';
import sortBy from '../../utilities/choreSort';

const KidsChoreSort = (props) => {
  return (
    <div id="childDropdown">
      <div id="childDropdown">
        <div id="filterAndSortChores">
          <div id="chooseChildHover">
            <Button
              id="sortButtonChild"
              variant="outlined"
              color="secondary"
              style={{
                color: 'white',
                backgroundColor: 'tomato',
                border: '2px white solid',
              }}
            >
              &nbsp;&nbsp;Sort By&nbsp;&nbsp;
            </Button>
            <div id="childDropdownContent">
              <div
                onClick={() => props.setChores(sortBy('amount', props.chores))}
              >
                Amount
              </div>
              <div onClick={() => props.setChores(sortBy('due', props.chores))}>
                Due
              </div>
              <div
                onClick={() =>
                  props.setChores(sortBy('incomplete', props.chores))
                }
              >
                Incomplete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsChoreSort;
