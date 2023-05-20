import taskButton from '../img/plus-circle.svg';
import today from '../img/today.svg';
import inbox from '../img/inbox.svg';
import upcoming from '../img/upcoming.svg';

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
  addName(projectSelection, 'task-priority');
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

  // Add overlay div for making darker backround when form is open
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
  const projectsTitle = newElementCreator('h3');
  addContent(projectsTitle, 'Projects');
  appendElement(projectsTitle, projectsContainer);
}
