import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateChore } from '../../store/actions/choreActions/updateChore';
import { InputLabel, FormControl, Select, TextField } from '@material-ui/core';
import { addChore } from '../../store/actions/choreActions/addChore';

const AddChore = (props) => {
  const [choreValues, setChoreValues] = useState({
    icon: '',
    name: '',
    description: '',
    amount: 0,
    userId: 0,
    familyId: props.familyId,
  });

  const icons = [
    { name: 'Miscellaneous', file: 'clean' },
    { name: 'Bed', file: 'beds' },
    { name: 'Car', file: 'car' },
    { name: 'Clothing', file: 'clean-clothes-2' },
    { name: 'House', file: 'clean-house' },
    { name: 'Trash', file: 'delete' },
    { name: 'Dishes', file: 'dish-2' },
    { name: 'Siblings', file: 'babysitter' },
    { name: 'Pets', file: 'pets-2' },
    { name: 'Cooking', file: 'soup' },
    { name: 'Plants', file: 'watering-plants' },
  ];

  return (
    <form
      id="addChoreForm"
      onSubmit={(e) => {
        e.preventDefault();
        props.addChore(choreValues);
      }}
    >
      <FormControl>
        <InputLabel htmlFor="age-native-simple">Category</InputLabel>
        <Select
          native
          inputProps={{
            name: 'category',
            id: 'age-native-simple',
          }}
          onChange={(e) =>
            setChoreValues({
              ...choreValues,
              icon: `/public/images/choreIcons/${e.target.value}.png`,
            })
          }
        >
          <option aria-label="None" value="" />
          {icons.map((icon) => {
            return (
              <option key={icon.name} value={icon.file}>
                {icon.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        value={choreValues.name}
        className="addChoreInput"
        label="Chore Name"
        variant="outlined"
        onChange={(e) =>
          setChoreValues({ ...choreValues, name: e.target.value })
        }
      />
      <TextField
        className="addChoreInput"
        label="Description"
        variant="outlined"
        onChange={(e) =>
          setChoreValues({ ...choreValues, description: e.target.value })
        }
      />
      <div id="amountAndAsignee">
        <FormControl id="addAssignee" variant="outlined">
          <InputLabel htmlFor="choreAssigneeAdd" id="testest">
            Assignee
          </InputLabel>
          <Select
            native
            inputProps={{
              name: 'category',
              id: 'choreAssigneeAdd',
            }}
            onChange={(e) =>
              setChoreValues({ ...choreValues, userId: e.target.value * 1 })
            }
          >
            <option aria-label="None" value="" />
            {props.kids.map((kid) => {
              return (
                <option key={kid.firstName} value={kid.id}>
                  {kid.firstName}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          // className="addChoreInput"
          id="addChoreInput"
          label="Amount"
          variant="outlined"
          onChange={(e) =>
            setChoreValues({ ...choreValues, amount: e.target.value * 1 })
          }
        />
      </div>
      <button>Add Chore</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChore: (id, info) => dispatch(updateChore(id, info)),
    addChore: (chore) => dispatch(addChore(chore)),
  };
};

export default connect(null, mapDispatchToProps)(AddChore);
