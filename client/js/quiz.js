`use strict`;

import { addWrittenQuestion } from './modules/writtenQ.js';
import { addSelectQuestion } from './modules/selectQ.js';
import { checkAnswers } from './modules/checker.js';

// global scope so all functions can access them
window.answers = {}

// loads quiz into DOM
async function loadQuiz(){
  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");
  let title = document.getElementsByTagName("h1");
  title[0].textContent = `This is quiz ${id}`;

  // get questions json file from server
  let url = `/loadQuiz?id=${id}`;
  let response = await fetch(url);
  let quizFile = await response.json();

  // add questions into DOM
  addQuestions(quizFile.questions);

  // add click event to submit button
  let submitButton = document.getElementsByName("Submit")[0];
  // function has to be nested so that it does not run automatically
  submitButton.addEventListener("click", () => {saveScore(id);});
}

// this goes through and adds the questions from the json file.
function addQuestions(questions){
  // find submit button to put questions before it
  let submitButton = document.getElementsByName("Submit")[0];

  // add each question
  // counter is used instead of "question in questions" so that
  // the index is easily accessible
  for (let q = 0; q < questions.length; q++){
    let question = questions[q];
    console.log(question);

    // add section element with id of q (index) and class of question type
    let questionSection = document.createElement("section");
    questionSection.id = `question${q}`;
    questionSection.setAttribute("class", question.type);

    let questionTitle = document.createElement("p");
    questionTitle.textContent = `Question ${q+1}: ${question.title}`;

    questionSection.appendChild(questionTitle);

    if (question.type == "written"){
      questionSection.appendChild(addWrittenQuestion(question, q));
    }

    else if (question.type.includes("select")){
      questionSection.appendChild(addSelectQuestion(question, q));
    }

    // add question in before submit button
    document.body.insertBefore(questionSection, submitButton);

    console.log(answers);
  }
}

// this saves the highest score to sessionStorage & returns user to homepage
function saveScore(id){
  let score = checkAnswers();
  // save score to sessionStorage (if higher or first time)
  // if score exists
  if ("id" in localStorage){
    let prevHigh = localStorage.getItem(id);
    // if new score is higher
    if (prevHigh < score){
      localStorage.setItem(id, score);
    }
  } else {
    localStorage.setItem(id, score);
  }

  // return user to homepage
  window.location.href = `index.html`;
}

// loads quiz when window has loaded
window.onload = loadQuiz;
