'use strict';

import { setQuizButtons } from './modules/quizButtons.js';

//loads topics into DOM
async function loadTopics(){
  // adds button functions to global scope (since this is type module)
  window.loadQuiz = loadQuiz;
  window.loadLesson = loadLesson;
  window.getQuote = getQuote;

  // sends request to server to retrieve directory.json
  let url = '/loadDir';
  let response = await fetch(url);
  let directory = await response.json();
  let topics = directory.topics;

  // gets template from index.html
  const topicSection = document.querySelector("#topicSection");

  // special case for 1st topic only - no quiz available
  addSpecialTopicSection(topics[0]);
  // removes 1st topic as topic section created
  topics.shift();

  topics.forEach(addTopicSection);
}

// special function for 1st topic only
function addSpecialTopicSection(value){
  // copy template content (inc. children)
  let clone = topicSection.content.cloneNode(true);

  // all content must be before quiz buttons
  // quiz buttons are hidden until user selects a quiz
  const quizButtons = document.querySelector("#quizButtons");

  // change text using value
  // output = "n) Topic name", where n is topic id
  let text = `${value.id}) ${value.name}`;
  // text box is 1st p tag in clone
  let textBox = clone.querySelectorAll("p")[0];
  textBox.textContent = text;

  // change onClick functions for buttons to load right lesson/quiz
  let buttons = clone.querySelectorAll("button");
  setButtonEvents(buttons, value.id);

  // remove quiz button as not necessary (2nd button tag in clone)
  let quizButton = buttons[1];
  quizButton.remove();
  // remove score section as not necessary
  let scoreText = clone.querySelector(".topicScore");
  scoreText.remove();
  // also remove share button (3rd button tag in clone)
  buttons[2].remove();

  // add clone to DOM
  // before quiz buttons (specified earlier)
  document.body.insertBefore(clone, quizButtons);
}

// function for rest of topics
function addTopicSection(value){
  // copy template content (inc. children)
  let clone = topicSection.content.cloneNode(true);

  // all content must be before quiz buttons
  const quizButtons = document.querySelector("#quizButtons");

  let sectionEle = clone.querySelectorAll("section")[0];
  sectionEle.setAttribute("id",value.id);
  sectionEle.setAttribute("name",value.name);

  // change text using value
  // output = "n) Topic name", where n is topic id
  let text = `${value.id}) ${value.name}`;
  // text box is 1st p tag in clone
  let textBox = clone.querySelectorAll("p")[0];
  textBox.textContent = text;

  // change onClick functions for buttons to load right lesson/quiz
  let buttons = clone.querySelectorAll("button");
  setButtonEvents(buttons, value.id);

  // check for Highscore
  updateHighscore(value.id, clone.querySelector(".topicScore"));

  // add clone to DOM
  // before quiz buttons (specified earlier)
  document.body.insertBefore(clone, quizButtons);
}

//function to set onclick functions
function setButtonEvents(buttons, id){
  // lesson button
  buttons[0].setAttribute("onClick", `loadLesson(${id})`);
  // Quiz button
  buttons[1].setAttribute("onClick", `loadQuiz(${id})`);
  // Share button
  buttons[2].setAttribute("onClick", `shareFB()`);
}

// function to redirect to lesson page
function loadLesson(id){
  sessionStorage.setItem("id", id);
  window.location.href = "lesson.html";
}

//function to redirect to quiz page
function loadQuiz(id){
  let quizButtons = document.querySelector("#quizButtons");
  if (quizButtons.className.includes("hidden")){
    sessionStorage.setItem("id", id);
    // set click functions for button
    setQuizButtons(quizButtons, id);
    // cancel button (runs same function to hide buttons)
    let cancelButton = document.getElementsByName("cancel")[0];
    cancelButton.setAttribute('onClick', `loadQuiz(${id})`);
  }
  quizButtons.classList.toggle("hidden");
}

// function to check if score exists & update score element if yes
function updateHighscore(id, scoreText){
  if (id in localStorage){
    let rawScore = localStorage.getItem(id);
    // raw score is between 0 (0%) and 1000 (100%)
    let percentage = rawScore / 10;
    scoreText.textContent = `${rawScore} (${percentage}%)`;
    scoreText.title = `You currently have ${percentage}%! Can you get higher?`;
  }
}

// for facebook share function - use a different quote if user has score for topic
function getQuote(id, name){
  if (id in sessionStorage){
    let score = sessionStorage.getItem(id);
    return `I scored ${percentage}% on the ${name} quiz! Learn Discrete Mathematics here!`;
  } else {
    return `Are you interested in ${name}? Learn Discrete Mathematics here!`;
  }
}

//loads topics when window is loaded
window.onload = loadTopics;
