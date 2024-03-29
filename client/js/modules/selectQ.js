'use strict';

// true/false (boolean) questions are subset of select question

// loads selection input for select questions
// checks if single select or multiple select
// randomises answers if wanted
export async function addSelectQuestion(question, q, id) {
  let exampleText;

  if (question.script) {
    // run custom script to get question and answer
    let output = await loadQuestionFunction(id, question.script);

    // answer always exists
    question.answer = output.answer;

    // get example text if exists
    if (output.exampleText) {
      let exampleText = document.createElement("p");
      exampleText.textContent = output.exampleText;
    }
  }

  if (question.type.includes("random")) {
    // select random option for answer
    let answerNo = getRandomInt(question.options.length);
    let answer = question.options[answerNo];
    answers[q] = Object.values(answer)[0];

    exampleText = document.createElement("p");
    exampleText.textContent = Object.keys(answer)[0];

  } else {
    answers[q] = question.answer;
  }

  let optionsSection = document.createElement("section");
  optionsSection.class = "options";

  const template = document.querySelector("#select");

  // add options as DOM elements (input & matching label)
  for (let o = 0; o < question.options.length; o++) {
    let selectEle;
    selectEle = addOption(question, o, template);
    optionsSection.appendChild(selectEle);
  }

  if (exampleText !== undefined) {
    return [exampleText, optionsSection];
  } else {
    return [optionsSection];
  }
}

export async function addBool(question, q, id) {
  let exampleText;

  if (question.script) {
    // run custom script to get question and answer
    let output = await loadQuestionFunction(id, question.script);

    // answer always exists
    question.answer = output.answer;

    // get example text if exists
    if (output.exampleText) {
      exampleText = document.createElement("p");
      exampleText.textContent = output.exampleText;
    }
  }

  if (question.type.includes("random")) {
    // if Math.random() less than 0.5 answer is true
    // else answer is false
    answers[q] = Math.random() < 0.5;
  } else {
    answers[q] = question.answer;
  }

  let optionsSection = document.createElement("section");
  optionsSection.class = "options";

  const template = document.querySelector("#select");

  question.options = ["true", "false"];

  // add options as DOM elements (input & matching label)
  for (let o = 0; o < question.options.length; o++) {
    let selectEle;
    selectEle = addOption(question, o, template);
    optionsSection.appendChild(selectEle);
  }

  if (exampleText !== undefined) {
    return [exampleText, optionsSection];
  } else {
    return [optionsSection];
  }
}

// random int generator for random questions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// adds input & label for an option
function addOption(question, o, template) {
  let optionName;

  if (typeof question.options[o] == "object") {
    optionName = Object.values(question.options[o]);
  } else {
    optionName = question.options[o];
  }

  // setting deep to true clones the child nodes too
  let clone = template.content.cloneNode(true);
  let cloneLabel = clone.querySelector("label");

  cloneLabel.textContent = optionName;
  cloneLabel.setAttribute("for", optionName);

  let cloneSelect = clone.querySelector("input");
  cloneSelect.name = optionName;

  // set it so that only one input can be checked at a time
  if (question.type.includes("single")) {
    cloneSelect.addEventListener("click", toggleSelected);
  }

  return clone;
}

// checks if an option is already selected
function toggleSelected(event) {
  console.log("checking");
  let targetEle = event.target;
  let targetParent = targetEle.parentElement;
  console.log(targetEle);
  if (!targetEle.classList.contains("selected")) {
    if (noneSelected(targetParent)) {
      targetEle.classList.add("selected");
    } else {
      let selectedEle = targetParent.querySelector(".selected");
      selectedEle.classList.remove("selected");
      targetEle.classList.add("selected");
    }
  } else {
    targetEle.classList.remove("selected");
  }
  correctCheckboxes(targetParent);
}

// check if any options are already selected
function noneSelected(section) {
  let options = section.getElementsByTagName("input");
  for (const option of options) {
    if (option.classList.contains("selected")) {
      return false;
    }
  }
  return true;
}

// unchecking the boxes using javascript does not update it visually unless
// this function is called
function correctCheckboxes(section) {
  let options = section.getElementsByTagName("input");
  for (const option of options) {
    option.checked = option.classList.contains("selected");
  }
}

// loads question.js from topic folder
// runs script given in question data & returns output
async function loadQuestionFunction(id, functName) {
  let output = {};
  let module = await import(`../../topics/${id}/questions.js`);
  output = module[functName]();
  return output;
}