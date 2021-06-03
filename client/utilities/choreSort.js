const sortBy = (criteria, chores) => {
  console.log(chores);
  if (criteria === 'amount') {
    return [...chores].sort((a, b) => b.amount - a.amount);
  }
  if (criteria === 'due') {
    return [...chores].sort((a, b) => {
      if (!a) a = new Date();
      if (!b) b = new Date();
      return new Date(a.due) - new Date(b.due);
    });
  }
  if (criteria === 'incomplete') {
    return [...chores].sort((a, b) => {
      return a.isRecurring ? 0 : b.isRecurring ? 1 : -1;
    });
  }
};

export default sortBy;
