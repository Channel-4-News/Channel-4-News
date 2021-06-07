import { orderBy, filter } from 'lodash';

const sortByMostExpensive = (wishList) => {
  //makes a copy of the array
  const wishListCopy = [...wishList];
  //changes the cost of each item from a string to a number
  const numbered = wishListCopy.reduce((newArray, current) => {
    current.cost = parseFloat(current.cost);
    newArray.push(current);
    return newArray;
  }, []);
  //puts the wishList copy with numbers in order
  const orderedWishListCopy = orderBy(numbered, ['cost'], ['desc']);
  //create new wishList array with sorted wishList
  let mostExpensive = [];
  orderedWishListCopy.forEach((sortedName) => {
    for (let item of wishList) {
      sortedName.itemName === item.itemName ? mostExpensive.push(item) : null;
    }
  });
  return mostExpensive;
};

const sortByLeastExpensive = (wishList) => {
  //makes a copy of the array
  const wishListCopy = [...wishList];
  //changes the cost of each item from a string to a number
  const numbered = wishListCopy.reduce((newArray, current) => {
    current.cost = parseFloat(current.cost);
    newArray.push(current);
    return newArray;
  }, []);
  //puts the wishList copy with numbers in order
  const orderedWishListCopy = orderBy(numbered, ['cost'], ['asc']);
  //create new wishList array with sorted wishList
  let leastExpensive = [];
  orderedWishListCopy.forEach((sortedName) => {
    for (let item of wishList) {
      if (sortedName.itemName === item.itemName) {
        leastExpensive.push(item);
      }
    }
  });
  return leastExpensive;
};

export { sortByMostExpensive, sortByLeastExpensive };
