import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    borderRadius: 4,
    color: 'white',
    position: 'relative',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FE6B8B 90%)',
    border: 0,
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 3,
      borderColor: '##ed85bc',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));

const SortAndFilterWishList = (props) => {
  const classes = useStyles();
  const [sort, setSort] = React.useState('');
  const handleChange = (event) => {
    setSort(event.target.value);
    props.sort(sort);
  };
  return (
    <div id="wishListSelector">
      <span id="sortWishList">Sort:</span>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={sort}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option defaultValue={'alphabetically'}>alphabetically</option>
          <option value={'most expensive'}>most expensive</option>
          <option value={'least expensive'}>least expensive</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default SortAndFilterWishList;
