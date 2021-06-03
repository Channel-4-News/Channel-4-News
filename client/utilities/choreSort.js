const sortBy = (criteria, chores) => {
  if (criteria === 'amount') {
    return [...chores].sort((a, b) => b.amount - a.amount);
  }
  if (criteria === 'due') {
    return [...chores].sort((a, b) => {
      if (a.isRecurring) a.due = new Date();
      if (b.isRecurring) b.due = new Date();
      return new Date(a.due) - new Date(b.due);
    });
  }
  if (criteria === 'incomplete') {
    return [...chores].sort((a, b) => {
      return a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1;
    });
  }
};

export default sortBy;
