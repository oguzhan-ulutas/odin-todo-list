import taskButton from '../img/plus-circle.svg';
import today from '../img/today.svg';
import inbox from '../img/inbox.svg';
import upcoming from '../img/upcoming.svg';
import add_project from '../img/add_project.svg';
import trash from '../img/trash.svg';

let toDos = [];

// Selects an element in the dom by css selectors
function elementSelector(selector) {
  const selectedElement = document.querySelector(selector);
  return selectedElement;
}

// Create new html elements
function newElementCreator(tag) {
  const newElement = document.createElement(tag);
  return newElement;
}

// Adds class to an element
function addClass(element, elementClass) {
  element.classList.add(elementClass);
}

// Adds content
function addContent(element, content) {
  element.textContent = content;
}

// Appends a child element to a parent
function appendElement(parent, child) {
  parent.appendChild(child);
}

// Adds src to an element
function addSrc(element, source) {
  element.src = source;
}

// Adds alt attribute to an img element
function addAlt(element, alternativeText) {
  element.alt = alternativeText;
}

// Adds title attribute to an element
function AddTitle(element, titleAttribute) {
  element.title = titleAttribute;
}

// Adds id attribute to an element
function addId(element, idAttribute) {
  element.id = idAttribute;
}

// Adds type attribute to an element
function addType(element, typeAttribute) {
  element.type = typeAttribute;
}

// Adds name attribute to an element
function addName(element, nameAttribute) {
  element.name = nameAttribute;
}

// Adds name attribute to an element
function addPlaceholder(element, placeholderAttribute) {
  element.placeholder = placeholderAttribute;
}

// Toggles input elements required attribute
function isRequired(element) {
  element.required ? (element.required = false) : (element.required = true);
}

// Adds name attribute to an element
function addValue(element, valueAttribute) {
  element.value = valueAttribute;
}

// Removes  a class from classList
function removeClass(element, elementClass) {
  element.classList.remove(elementClass);
}

// Todo factory function
const toDoFactory = (title, description, notes, dueDate, priority, projectName) => ({
  title,
  description,
  notes,
  dueDate,
  priority,
  projectName,
});

// Gets form data and creats a to do object
function getFormData() {
  const form = document.querySelector('.to-do-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const toDo = toDoFactory(
      e.target[1].value,
      e.target[2].value,
      e.target[3].value,
      e.target[4].value,
      e.target[5].value,
      e.target[6].value,
    );
    toDos.push(toDo);
    storeToDos();
    toDoCardCreator(toDo);
    removeClass(document.querySelector('.to-do-form-container'), 'active');
    removeClass(document.querySelector('#overlay'), 'active');
  });
}

// Adds a project to form project element as select
function addProjectToForm(projectName) {
  const projectSelection = document.querySelector('.project-select');
  const option = newElementCreator('option');
  addContent(option, `${projectName}`);
  addValue(option, `${projectName}`);
  appendElement(projectSelection, option);
}

// Adds new projects to dom
function addProjectToDom(projectName) {
  const container = document.querySelector('.projects-container');
  const projectDiv = newElementCreator('div');
  addClass(projectDiv, 'project-div');
  addContent(projectDiv, projectName);
  appendElement(container, projectDiv);

  // Adds event listener to projectDiv
  projectDiv.addEventListener('click', () => {
    clearCards();
    toDos.forEach((toDo) => {
      if (projectName === toDo.projectName) {
        toDoCardCreator(toDo);
      }
    });
  });
}

// Adds new project
function addProject(buttonName) {
  buttonName.addEventListener('click', () => {
    const projectName = prompt('Please enter new project name');
    addProjectToForm(projectName);
    addProjectToDom(projectName);
  });
}

// Creates to do card and appends it to dom
function toDoCardCreator(toDo) {
  const mainContainer = document.querySelector('.main-container');
  const toDoCard = newElementCreator('div');

  const isCompleted = newElementCreator('input');
  addType(isCompleted, 'checkbox');
  addClass(isCompleted, 'isCompleted');
  appendElement(toDoCard, isCompleted);

  const keys = Object.keys(toDo);
  keys.forEach((key) => {
    const newElement = newElementCreator('div');
    if (key === 'priority') {
      addClass(newElement, toDo[`${key}`]);
    }
    addContent(newElement, toDo[`${key}`]);
    appendElement(toDoCard, newElement);
  });

  const deleteButton = newElementCreator('button');
  const deleteButtonSvg = newElementCreator('img');
  addClass(deleteButton, 'delete-button');
  addClass(deleteButtonSvg, 'delete-button-svg');
  addSrc(deleteButtonSvg, trash);
  addAlt(deleteButton, 'trash sing');
  AddTitle(deleteButton, 'Delete task');
  appendElement(toDoCard, deleteButton);
  appendElement(deleteButton, deleteButtonSvg);

  appendElement(mainContainer, toDoCard);
}

// Clears main container div
function clearCards() {
  const mainContainer = document.querySelector('.main-container');
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

// Local storage functions for ToDos
function storeToDos() {
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

function getToDos() {
  toDos = JSON.parse(localStorage.getItem('toDos'));
}

// Loads toDos and populates the screen if there is any toDo
function loadToDos() {
  if (localStorage.getItem('toDos') !== null) {
    getToDos();
  }
  console.log(toDos);
  toDos.forEach((toDo) => {
    toDoCardCreator(toDo);
    const { projectName } = toDo;
    addProjectToForm(projectName);
    addProjectToDom(projectName);
  });
}

export default function mainPageCreator() {
  // Selecting main content div
  const contentDiv = elementSelector('#content');

  // Create main divs
  const header = newElementCreator('div');
  addClass(header, 'header');
  addContent(header, 'to-do list');
  appendElement(contentDiv, header);

  const nav = newElementCreator('div');
  addClass(nav, 'nav');
  appendElement(contentDiv, nav);

  const mainContainer = newElementCreator('div');
  addClass(mainContainer, 'main-container');
  appendElement(contentDiv, mainContainer);

  const footer = newElementCreator('div');
  addClass(footer, 'footer');
  addContent(footer, 'The Odin Project 2023 - coded by oguzhan-ulutas');
  appendElement(contentDiv, footer);

  // Add new task button
  const addNewTaskButton = newElementCreator('button');
  const taskButtonSvg = newElementCreator('img');
  addClass(addNewTaskButton, 'new-task-button');
  addClass(taskButtonSvg, 'task-button-svg');
  addSrc(taskButtonSvg, taskButton);
  addAlt(addNewTaskButton, 'plus sing');
  AddTitle(addNewTaskButton, 'Add new task');
  appendElement(header, addNewTaskButton);
  appendElement(addNewTaskButton, taskButtonSvg);

  // Add new to do popup form container
  const toDoFormContainer = newElementCreator('div');
  addClass(toDoFormContainer, 'to-do-form-container');
  addId(toDoFormContainer, 'to-do-form-container');
  appendElement(header, toDoFormContainer);

  // Adding form details
  const toDoForm = newElementCreator('form');
  addClass(toDoForm, 'to-do-form');
  appendElement(toDoFormContainer, toDoForm);

  const toDoFormFieldset = newElementCreator('fieldset');
  addClass(toDoFormFieldset, 'to-do-form-fieldset');
  appendElement(toDoForm, toDoFormFieldset);

  const toDoFormLegend = newElementCreator('legend');
  addClass(toDoFormLegend, 'to-do-form-legend');
  addContent(toDoFormLegend, 'New to-do');
  appendElement(toDoFormFieldset, toDoFormLegend);

  const nameInput = newElementCreator('input');
  addType(nameInput, 'text');
  addClass(nameInput, 'name-input');
  addName(nameInput, 'name');
  addPlaceholder(nameInput, '*Task Name');
  isRequired(nameInput);
  appendElement(toDoFormFieldset, nameInput);

  const describtionInput = newElementCreator('input');
  addType(describtionInput, 'text');
  addClass(describtionInput, 'describtion-input');
  addName(describtionInput, 'task-describtion');
  addPlaceholder(describtionInput, 'Describtion');
  appendElement(toDoFormFieldset, describtionInput);

  const notesInput = newElementCreator('input');
  addType(notesInput, 'text');
  addClass(notesInput, 'notes-input');
  addName(notesInput, 'task-notes');
  addPlaceholder(notesInput, 'Notes');
  appendElement(toDoFormFieldset, notesInput);

  const dateInput = newElementCreator('input');
  addType(dateInput, 'date');
  addClass(dateInput, 'date-input');
  addName(dateInput, 'task-date');
  appendElement(toDoFormFieldset, dateInput);

  const priority = newElementCreator('select');
  addName(priority, 'task-priority');
  appendElement(toDoFormFieldset, priority);
  const optionLow = newElementCreator('option');
  const optionMedium = newElementCreator('option');
  const optionHigh = newElementCreator('option');
  addContent(optionLow, 'low');
  addValue(optionLow, 'low');
  appendElement(priority, optionLow);
  addContent(optionMedium, 'medium');
  addValue(optionMedium, 'medium');
  appendElement(priority, optionMedium);
  addContent(optionHigh, 'high');
  addValue(optionHigh, 'high');
  appendElement(priority, optionHigh);

  const projectSelection = newElementCreator('select');
  addName(projectSelection, 'project-selection');
  addClass(projectSelection, 'project-select');
  appendElement(toDoFormFieldset, projectSelection);

  const buttonContainer = newElementCreator('div');
  addClass(buttonContainer, 'form-buttons');
  appendElement(toDoFormFieldset, buttonContainer);
  const submitButton = newElementCreator('button');
  const cancelButton = newElementCreator('button');
  addType(submitButton, 'submit');
  addContent(submitButton, 'Add task');
  appendElement(buttonContainer, submitButton);
  addType(cancelButton, 'reset');
  addContent(cancelButton, 'Cancel');
  appendElement(buttonContainer, cancelButton);

  // Add overlay div for making darker background when form is open
  const overlayDiv = newElementCreator('div');
  addId(overlayDiv, 'overlay');
  appendElement(contentDiv, overlayDiv);

  // Open form when addNewTaskButton clicked
  addNewTaskButton.addEventListener('click', () => {
    addClass(toDoFormContainer, 'active');
    addClass(overlayDiv, 'active');
  });

  // Close form when cancelButton clicked
  cancelButton.addEventListener('click', () => {
    removeClass(toDoFormContainer, 'active');
    removeClass(overlayDiv, 'active');
  });

  // Add nav containers
  const timeBasedContainer = newElementCreator('div');
  const projectsContainer = newElementCreator('div');
  addClass(timeBasedContainer, 'time-based-container');
  addClass(projectsContainer, 'projects-container');
  appendElement(nav, timeBasedContainer);
  appendElement(nav, projectsContainer);

  // Populate timeBasedContainer
  const inboxDiv = newElementCreator('div');
  const todayDiv = newElementCreator('div');
  const upcomingDiv = newElementCreator('div');
  const inboxSvg = newElementCreator('img');
  const todaySvg = newElementCreator('img');
  const upcomingSvg = newElementCreator('img');
  const inboxText = newElementCreator('div');
  const todayText = newElementCreator('div');
  const upcomingText = newElementCreator('div');

  // Populate inboxDiv
  addClass(inboxDiv, 'inbox-div');
  appendElement(timeBasedContainer, inboxDiv);

  addSrc(inboxSvg, inbox);
  addAlt(inboxSvg, 'Postbox sign');
  appendElement(inboxDiv, inboxSvg);

  addContent(inboxText, 'Inbox');
  appendElement(inboxDiv, inboxText);

  // Populate todayDiv
  addClass(todayDiv, 'today-div');
  appendElement(timeBasedContainer, todayDiv);

  addSrc(todaySvg, today);
  addAlt(todaySvg, 'Calender sign');
  appendElement(todayDiv, todaySvg);

  addContent(todayText, 'Today');
  appendElement(todayDiv, todayText);

  // Populate upcomingDiv
  addClass(upcomingDiv, 'upcoming-div');
  appendElement(timeBasedContainer, upcomingDiv);

  addSrc(upcomingSvg, upcoming);
  addAlt(upcomingSvg, 'Printer sign');
  appendElement(upcomingDiv, upcomingSvg);

  addContent(upcomingText, 'Upcoming');
  appendElement(upcomingDiv, upcomingText);

  // Populate projectsDiv
  const projectsTitleDiv = newElementCreator('div');
  addClass(projectsTitleDiv, 'projects-title-div');
  appendElement(projectsContainer, projectsTitleDiv);
  const projectsTitle = newElementCreator('h3');
  addContent(projectsTitle, 'Projects');
  appendElement(projectsTitleDiv, projectsTitle);
  const addNewProjectButton = newElementCreator('button');
  const projectButtonSvg = newElementCreator('img');
  addClass(addNewProjectButton, 'new-project-button');
  addClass(projectButtonSvg, 'project-button-svg');
  addSrc(projectButtonSvg, add_project);
  addAlt(addNewProjectButton, 'plus sing');
  AddTitle(addNewProjectButton, 'Add new project');
  appendElement(projectsTitleDiv, addNewProjectButton);
  appendElement(addNewProjectButton, projectButtonSvg);

  // Geting new task form data and creating an object from it
  getFormData();

  // Adding new project
  addProject(addNewProjectButton);

  // Imports old toDos if there is any
  loadToDos();
}
