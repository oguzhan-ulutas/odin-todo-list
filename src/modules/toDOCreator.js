const toDos = [];

const toDoFactory = (title, description, dueDate, priority, notes, projectName) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getNotes = () => notes;
  const getProjectName = () => projectName;
  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getProjectName,
  };
};

export { toDoFactory };
