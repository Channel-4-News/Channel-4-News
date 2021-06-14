import React from 'react';
import Button from '@material-ui/core/Button';

const SortAndFilterWishList = (props) => {
  const [sort, setSort] = React.useState('');
  const handleChange = (category) => {
    props.sort(category);
    props.sortToggle();
    setSort(category);
  };
  return (
    <div id="wishListDropdown">
      <div id="filterAndSortWishes">
        <div id="chooseWishHover">
          <Button size="large" color="primary" variant="contained">
            &nbsp;&nbsp;Sort By&nbsp;&nbsp;
          </Button>
          <div id="wishDropdownContent">
            <div
              className="wishSelector"
              onClick={() => handleChange('alphabetically')}
            >
              Alphabetically
            </div>
            <div
              className="wishSelector"
              onClick={() => handleChange('most expensive')}
            >
              Most Expensive
            </div>
            <div
              className="wishSelector"
              onClick={() => handleChange('least expensive')}
            >
              Least Expensive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortAndFilterWishList;
