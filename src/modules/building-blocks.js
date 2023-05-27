export function elementSelector(selector) {
  const selectedElement = document.querySelector(selector);
  return selectedElement;
}

// Create new html elements
export function newElementCreator(tag) {
  const newElement = document.createElement(tag);
  return newElement;
}

// Adds class to an element
export function addClass(element, elementClass) {
  element.classList.add(elementClass);
}

// Adds content
export function addContent(element, content) {
  element.textContent = content;
}

// Appends a child element to a parent
export function appendElement(parent, child) {
  parent.appendChild(child);
}

// Adds src to an element
export function addSrc(element, source) {
  element.src = source;
}

// Adds alt attribute to an img element
export function addAlt(element, alternativeText) {
  element.alt = alternativeText;
}

// Adds title attribute to an element
export function addTitle(element, titleAttribute) {
  element.title = titleAttribute;
}

// Adds id attribute to an element
export function addId(element, idAttribute) {
  element.id = idAttribute;
}

// Adds type attribute to an element
export function addType(element, typeAttribute) {
  element.type = typeAttribute;
}

// Adds name attribute to an element
export function addName(element, nameAttribute) {
  element.name = nameAttribute;
}

// Adds name attribute to an element
export function addPlaceholder(element, placeholderAttribute) {
  element.placeholder = placeholderAttribute;
}

// Toggles input elements required attribute
export function isRequired(element) {
  element.required ? (element.required = false) : (element.required = true);
}

// Adds name attribute to an element
export function addValue(element, valueAttribute) {
  element.value = valueAttribute;
}

// Removes  a class from classList
export function removeClass(element, elementClass) {
  element.classList.remove(elementClass);
}

// Clears main container div
export function clearCards() {
  const mainContainer = document.querySelector('.main-container');
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}
