import React, { useEffect, useState } from 'react';
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

const UpdateChore = (props) => {
  const [updateValues, setUpdateValues] = useState({});
  const [today, setToday] = useState('');
  const [interval, setInterval] = useState('');

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

  useEffect(() => {
    const holdToday = new Date();
    let year = holdToday.getFullYear();
    let day = holdToday.getDate();
    let month = holdToday.getMonth() + 1;
    if (`${day}`.length < 2) {
      day = `0${day}`;
    }
    if (`${month}`.length < 2) {
      month = `0${month}`;
    }
    setToday(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (props.chore.isRecurring) {
      props.chore.recurringInterval === 1 ? setInterval('1') : setInterval('7');
    }
    if (props.chore.due) {
      setToday(props.chore.due);
    }
  }, [props.chore]);

  const filteredKids = props.kids.filter(
    (kid) => kid.firstName !== props.chore.user.firstName
  );

  const filteredIcons = icons.filter(
    (icon) => !props.chore.icon.includes(icon.file)
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    divWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: theme.spacing(1),
    },
    interval: { width: '48%' },
  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffa270',
        main: '#ff7043',
        dark: '#c63f17',
        contrastText: '#000',
      },
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <form id="updateChore" className={classes.root} onSubmit={() => {}}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="updateCategory" color="secondary">
            Category
          </InputLabel>
          <Select
            native
            placeholder={props.chore.user.firstName}
            defaultValue={props.chore.user.firstName}
            //   value={state.age}
            label="Category"
            color="secondary"
            onChange={(e) =>
              setUpdateValues({
                ...updateValues,
                icon: `/public/images/choreIcons/${e.target.value}.png`,
              })
            }
          >
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
          id="choreNameUpdate"
          className="choreUpdateField"
          label="Chore name"
          defaultValue={props.chore.name}
          variant="outlined"
          color="secondary"
          onChange={(e) =>
            setUpdateValues({ ...updateValues, name: e.target.value })
          }
        />
        <TextField
          multiline
          rowsMax={4}
          id="choreDescriptionUpdate"
          className="choreUpdateField"
          label="Desciption"
          defaultValue={props.chore.description}
          variant="outlined"
          color="secondary"
          onChange={(e) =>
            setUpdateValues({ ...updateValues, description: e.target.value })
          }
        />
        <TextField
          id="choreAmountUpdate"
          className="choreUpdateField"
          label="Amount"
          defaultValue={props.chore.amount}
          variant="outlined"
          color="secondary"
          onChange={(e) =>
            setUpdateValues({ ...updateValues, amount: e.target.value * 1 })
          }
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple" color="secondary">
            Assignee
          </InputLabel>
          <Select
            native
            placeholder={props.chore.user.firstName}
            defaultValue={props.chore.user.firstName}
            label="Assignee"
            color="secondary"
            onChange={(e) =>
              setUpdateValues({ ...updateValues, userId: e.target.value * 1 })
            }
          >
            <option key={props.chore.user.firstName}>
              {props.chore.user.firstName}
            </option>
            {filteredKids.map((kid) => {
              return (
                <option key={kid.firstName} value={kid.id}>
                  {kid.firstName}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <div id="dueOrInterval" className={classes.divWrap}>
          <FormControl variant="outlined" className={classes.interval}>
            <InputLabel htmlFor="choreAssigneeAdd">Interval</InputLabel>
            <Select
              native
              label="Interval"
              value={interval}
              onChange={(e) => {
                setInterval(e.target.value);
                setUpdateValues({
                  ...updateValues,
                  recurringInterval: e.target.value * 1,
                });
              }}
            >
              <option aria-label="None" value="" />
              <option value="1">Daily</option>
              <option value="7">Weekly</option>
            </Select>
          </FormControl>
          <small id="smallOr">OR</small>
          <TextField
            className={classes.interval}
            id="addChoreInput"
            label="Due Date"
            variant="outlined"
            type="date"
            value={today}
            onChange={(e) => {
              setToday(e.target.value);
              setUpdateValues({ ...updateValues, due: e.target.value });
            }}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.updateChore(props.chore.id, updateValues);
            props.setClicked(false);
          }}
        >
          Update Chore
        </Button>
      </form>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChore: (id, info) => dispatch(updateChore(id, info)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateChore);
