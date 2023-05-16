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

// Appends a child element to a parent
function appendElement(parent, child) {
  parent.appendChild(child);
}

export default function domManipulator() {
  // Selecting main content div
  const contentDiv = elementSelector('#content');
  const newDiv = newElementCreator('div');
  addClass(newDiv, 'header');
  appendElement(contentDiv, newDiv);
  console.log(newDiv);
}
