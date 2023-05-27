import { addDays, format, startOfDay } from 'date-fns';
import taskButton from '../img/plus-circle.svg';
import today from '../img/today.svg';
import inbox from '../img/inbox.svg';
import upcoming from '../img/upcoming.svg';
import add_project from '../img/add_project.svg';
import trash from '../img/trash.svg';
import {
  elementSelector,
  newElementCreator,
  addClass,
  addContent,
  appendElement,
  addSrc,
  addAlt,
  addTitle,
  addId,
  addType,
  addName,
  addPlaceholder,
  isRequired,
  addValue,
  removeClass,
  clearCards,
} from './building-blocks';

let toDos = [];

// Create toDo id
const counterCreator = () => {
  let count = 0;
  return () => count++;
};
const counter = counterCreator();

// Todo factory function
const toDoFactory = (title, description, notes, date, priority, projectName) => {
  const isDone = false;
  const id = counter();

  const dateLong = new Date(date);
  const dueDate = format(dateLong, 'dd/MMM/yy');

  return {
    title,
    description,
    notes,
    dueDate,
    priority,
    projectName,
    isDone,
    id,
    dueDate,
  };
};

// Gets form data and creates a to do object
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
    toDos.splice(toDo.id, 0, toDo);
    console.log(toDo);
    storeToDos();
    toDoCardCreator(toDo);
    removeClass(document.querySelector('.to-do-form-container'), 'active');
    removeClass(document.querySelector('#overlay'), 'active');
  });
}

// Adds a project to form project element as select option
function addProjectToForm(projectName) {
  const className = projectName.replace(/ /g, '-').toLowerCase();
  const projectSelection = document.querySelector('.project-select');
  const option = newElementCreator('option');
  addContent(option, `${projectName}`);
  addClass(option, `option-${className}`);
  addValue(option, `${projectName}`);
  appendElement(projectSelection, option);
}

function deleteProjectFromForm(className) {
  const option = document.querySelector(`.option-${className}`);
  option.remove();
}

function deleteProjectFromDom(className) {
  const div = document.querySelector(`.project-${className}`);
  div.remove();
}

// Adds new projects to dom
function addProjectToDom(projectName) {
  const className = projectName.replace(/ /g, '-').toLowerCase();
  const container = document.querySelector('.projects-container');
  const projectDiv = newElementCreator('div');
  addClass(projectDiv, `project-${className}`);
  addClass(projectDiv, 'project-holder');
  const projectTitle = newElementCreator('div');
  addClass(projectTitle, `project-title-${className}`);
  addContent(projectTitle, projectName);
  appendElement(projectDiv, projectTitle);
  appendElement(container, projectDiv);

  // Creating project delete button
  const deleteButton = newElementCreator('button');
  const deleteButtonSvg = newElementCreator('img');
  addClass(deleteButton, `${className}`);
  addClass(deleteButtonSvg, `${className}`);
  addSrc(deleteButtonSvg, trash);
  addAlt(deleteButton, 'trash sing');
  addTitle(deleteButton, 'Delete project. Deletes all related tasks. Refresh for deleteing tasks');
  appendElement(projectDiv, deleteButton);
  appendElement(deleteButton, deleteButtonSvg);

  // adding event listener to delete button
  deleteButton.addEventListener('click', (e) => {
    const className = e.target.classList.value;
    deleteProjectFromDom(className);
    deleteProjectFromForm(className);

    toDos.forEach((toDo, i) => {
      const toDoProjectName = toDo.projectName.replace(/ /g, '-').toLowerCase();
      if (className === toDoProjectName) {
        toDos.splice(i, 1);
      }
    });
    storeToDos();
  });

  // Adds event listener to projectDiv
  projectTitle.addEventListener('click', () => {
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
    if (!projectName) {
      return;
    }
    addProjectToForm(projectName);
    addProjectToDom(projectName);
  });
}

// Creates to do card and appends it to dom
function toDoCardCreator(toDo) {
  const mainContainer = document.querySelector('.main-container');
  const toDoCard = newElementCreator('div');
  addClass(toDoCard, `to-do-${toDo.id}`);

  const isCompleted = newElementCreator('input');
  addType(isCompleted, 'checkbox');
  addClass(isCompleted, `is-completed-${toDo.id}`);
  appendElement(toDoCard, isCompleted);
  isCompleted.addEventListener('click', (e) => {
    const cardNumber = e.target.classList.value.split('-')[2];
    const cardDiv = document.querySelector(`.to-do-${cardNumber}`);
    cardDiv.classList.toggle('completed');

    if (isCompleted.checked) {
      toDo.isDone = true;
      storeToDos();
    } else {
      toDo.isDone = false;
      storeToDos();
    }
  });

  const keys = Object.keys(toDo);
  keys.forEach((key) => {
    if (key !== 'id' && key !== 'isDone' && key !== 'dateLong') {
      const newElement = newElementCreator('div');
      addClass(newElement, `${key}-${toDo.id}`);
      addContent(newElement, toDo[`${key}`]);
      if (key === 'priority') {
        addClass(newElement, toDo[`${key}`]);
      }
      appendElement(toDoCard, newElement);
    }
  });

  const deleteButton = newElementCreator('button');
  const deleteButtonSvg = newElementCreator('img');
  addClass(deleteButton, 'delete-button');
  addClass(deleteButtonSvg, `delete-button-svg-${toDo.id}`);
  addSrc(deleteButtonSvg, trash);
  addAlt(deleteButton, 'trash sing');
  addTitle(deleteButton, 'Delete task');
  appendElement(toDoCard, deleteButton);
  appendElement(deleteButton, deleteButtonSvg);
  deleteButton.addEventListener('click', (e) => {
    const cardNumber = e.target.classList.value.split('-')[3];
    const toDoCard = document.querySelector(`.to-do-${cardNumber}`);
    toDoCard.remove();
    toDos.splice(cardNumber, 1);
    storeToDos();
  });

  if (toDo.isDone) {
    addClass(toDoCard, 'completed');
    isCompleted.checked = true;
  }

  appendElement(mainContainer, toDoCard);
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
  const projectList = [];
  toDos.forEach((toDo) => {
    toDoCardCreator(toDo);
    const { projectName } = toDo;

    if (!projectList.includes(projectName)) {
      addProjectToForm(projectName);
      addProjectToDom(projectName);
    }
    projectList.push(projectName);
  });
}

export default function mainPageCreator() {
  // storeToDos();
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
  addTitle(addNewTaskButton, 'Add new task');
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

  const descriptionInput = newElementCreator('input');
  addType(descriptionInput, 'text');
  addClass(descriptionInput, 'description-input');
  addName(descriptionInput, 'task-description');
  addPlaceholder(descriptionInput, 'Description');
  appendElement(toDoFormFieldset, descriptionInput);

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
  const emptyOption = newElementCreator('option');
  addName(projectSelection, 'project-selection');
  addClass(projectSelection, 'project-select');
  appendElement(toDoFormFieldset, projectSelection);
  addValue(emptyOption, '');
  appendElement(projectSelection, emptyOption);

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

  // Adding inbox functionality. It will list tasks until today.
  inboxDiv.addEventListener('click', () => {
    clearCards();
    const date = new Date();

    toDos.forEach((toDo) => {
      const toDoDate = new Date(toDo.dueDate);
      if (date >= toDoDate) {
        toDoCardCreator(toDo);
      }
    });
  });

  // Adding todayDiv functionality. It will list todays' tasks.
  todayDiv.addEventListener('click', () => {
    clearCards();
    const date = new Date();
    const start = startOfDay(date);
    const end = addDays(start, 1);
    toDos.forEach((toDo) => {
      const toDoDate = new Date(toDo.dueDate);
      console.log(toDoDate);
      console.log(start.getTime());
      if (start.getTime() === toDoDate.getTime()) {
        toDoCardCreator(toDo);
      }
    });
  });

  // Adding upComingDiv functionality. It will list all the tasks by ascending order
  upcomingDiv.addEventListener('click', () => {
    toDos.sort((a, b) => a.dateLong - b.dateLong);
    clearCards();
    toDos.forEach((toDo) => toDoCardCreator(toDo));
  });

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
  addTitle(addNewProjectButton, 'Add new project');
  appendElement(projectsTitleDiv, addNewProjectButton);
  appendElement(addNewProjectButton, projectButtonSvg);

  // Getting new task form data and creating an object from it
  getFormData();

  // Adding new project
  addProject(addNewProjectButton);

  // Imports old toDos if there is any
  loadToDos();
}
