const toDos = [];

const toDoFactory = (title, description, notes, dueDate, priority, projectName) => {
const proto ={
    addToDoToList: (toDo) => {
  toDos.push(toDo)
}

    return Object.assign({},{
  title,
  description,
  dueDate,
  priority,
  notes,
  projectName,
}, proto)
};


export { toDoFactory };
