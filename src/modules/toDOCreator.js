const toDoFactory = (title, describtion, dueDate, priority, notes) => {
  const getTitle = () => title;
  const getDescription = () => describtion;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getNotes = () => notes;
  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
  };
};

export { toDoFactory };
