`use strict`;

import {
  setQuizButtons
} from './modules/quizButtons.js';
import {
  checkScreenSize,
  setControlButtons
} from './modules/forwardbackbuttons.js';

// loads lesson into DOM
async function loadLesson() {

  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");

  // check that id is integer (sanitisation)
  // if not error and go back to homepage
  if (isNaN(id)) {
    window.alert("This is not a valid topic id!");
    window.location.href = "index.html";
  }

  // retrieve lesson data from server
  let url = `/loadLesson?id=${id}`;
  let response = await fetch(url);
  let lessonFile = await response.json();

  // use lesson data to update DOM
  // update title
  let title = document.getElementsByTagName("h1");
  title[0].textContent = `Lesson ${id}: ${lessonFile.name}`;

  // all paragraphs must be before quiz buttons
  let quizButtons = document.querySelector("#quizButtons");
  let container = document.createElement("section");
  container.classList.add("container");
  document.body.insertBefore(container, controlButtons);

  // add paragraphs
  for (const para of lessonFile.paragraphs) {
    addParagraph(para, container, id);
  }

  setQuizButtons(quizButtons, id);
  setControlButtons(controlButtons);

  // remove quizButtons for first lesson - no quiz available
  if (id === "1") {
    quizButtons.remove();
  }

  // check screen size for button
  checkScreenSize();
}

// adds paragraph of lesson into DOM (before quiz buttons)
function addParagraph(para, container, id) {
  // create section to store paragraph text & example
  let paraSection = document.createElement("section");

  // p tag to store paragraph text
  let paraElement = document.createElement("p");
  paraElement.textContent = para.text;
  paraSection.appendChild(paraElement);

  // figure tag to store example (if necessary)
  if (para.example) {
    let exampleFigure = document.createElement("figure");

    // img tag & figcaption to go inside figure tag
    let exampleImg = document.createElement("img");
    exampleImg.src = `../topics/${id}/images/${para.example.imageFile}`;

    let exampleFigCaption = document.createElement("figcaption");
    exampleFigCaption.textContent = para.example.caption;

    // add img & figcaption into figure
    exampleFigure.appendChild(exampleImg);
    exampleFigure.appendChild(exampleFigCaption);

    // add figure to section
    paraSection.appendChild(exampleFigure);
  }

  // add section to DOM in container element
  container.appendChild(paraSection);
}


//loads lesson when window has loaded
window.onload = loadLesson;
//checks window when resized to see if mobile design required
// set it so that it waits 100ms (so that it doesn't repeatedly call)
let done;
window.onresize = function() {
  clearTimeout(done);
  done = setTimeout(checkScreenSize, 100);
}