import React from 'react';
import { Button } from '@material-ui/core';

const ParentSortAddButtons = (props) => {
  return (
    <div id="childDropdown">
      <div id="filterAndSortChores">
        <div id="chooseChildHover">
          <Button id="childDropButton" variant="contained" color="secondary">
            Choose child
          </Button>
          <div id="childDropdownContent">
            {props.kids.map((user) => {
              return (
                <div
                  key={`${user.id}familyChild`}
                  onClick={() => {
                    props.setChildSelect(true);
                    props.setSelectedKid(user);
                  }}
                >
                  {user.firstName}
                </div>
              );
            })}
            <div
              onClick={() => {
                props.setChildSelect(true);
                props.setSelectedKid({});
              }}
            >
              All
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        onClick={() => props.setAddChore(true)}
        color="secondary"
      >
        Add Chore
      </Button>
    </div>
  );
};

export default ParentSortAddButtons;
