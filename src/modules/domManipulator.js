import taskButton from '../img/plus-circle.svg';

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
  element.classList.value = elementClass;
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

export default function domManipulator() {
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

  // Add nav containers
}
