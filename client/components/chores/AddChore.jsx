import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateChore } from '../../store/actions/choreActions/updateChore';
import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
} from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
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
    { name: 'Miscellaneous', file: 'misc' },
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

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    assigneeAmount: { width: '48%' },
    divWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <form className={classes.root} id="addChoreForm">
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel htmlFor="categoryInputAdd">Category</InputLabel>
        <Select
          native
          label="Category"
          color="secondary"
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
        className={classes.root}
        value={choreValues.name}
        label="Chore Name"
        variant="outlined"
        onChange={(e) =>
          setChoreValues({ ...choreValues, name: e.target.value })
        }
      />
      <TextField
        className={classes.root}
        label="Description"
        variant="outlined"
        onChange={(e) =>
          setChoreValues({ ...choreValues, description: e.target.value })
        }
      />
      <div id="amountAndAsignee" className={classes.divWrap}>
        <FormControl variant="outlined" className={classes.assigneeAmount}>
          <InputLabel htmlFor="choreAssigneeAdd">Assignee</InputLabel>
          <Select
            native
            label="Assignee"
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
          className={classes.assigneeAmount}
          id="addChoreInput"
          label="Amount"
          variant="outlined"
          onChange={(e) =>
            setChoreValues({ ...choreValues, amount: e.target.value * 1 })
          }
        />
      </div>
      {/* <button>Add Chore</button> */}
      <Button
        className={classes.root}
        variant="contained"
        color="secondary"
        onClick={async (e) => {
          e.preventDefault();
          await props.addChore(choreValues);
          props.setAddChore(false);
        }}
      >
        Add Chore
      </Button>
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
