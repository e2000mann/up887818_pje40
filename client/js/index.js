'use strict';

//loads topics into DOM
async function loadTopics(){
  // sends request to server to retrieve directory.json
  let url = '/loadDir';
  let response = await fetch(url);
  let directory = await response.json();
  console.log(directory);
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
  console.log(quizButton);
  quizButton.remove();

  // add clone to DOM
  document.body.appendChild(clone);
}

// function for rest of topics
function addTopicSection(value){
  // copy template content (inc. children)
  let clone = topicSection.content.cloneNode(true);

  // change text using value
  // output = "n) Topic name", where n is topic id
  let text = `${value.id}) ${value.name}`;
  // text box is 1st p tag in clone
  let textBox = clone.querySelectorAll("p")[0];
  textBox.textContent = text;

  // change onClick functions for buttons to load right lesson/quiz
  let buttons = clone.querySelectorAll("button");
  setButtonEvents(buttons, value.id);

  console.log(clone.querySelectorAll("button"));

  // add clone to DOM
  document.body.appendChild(clone);
}

//function to set onclick functions
function setButtonEvents(buttons, id){
  // lesson button
  buttons[0].setAttribute("onClick", `loadLesson(${id})`);
  // Quiz button
  buttons[1].setAttribute("onClick", `loadQuiz(${id})`);
}

// function to redirect to lesson page
function loadLesson(id){
  sessionStorage.setItem("id", id);
  window.location.href = "lesson.html";
}

//function to redirect to quiz page
function loadQuiz(id){
  sessionStorage.setItem("id", id);
  window.location.href = "quiz.html";
}

//loads topics when window is loaded
window.onload = loadTopics;
