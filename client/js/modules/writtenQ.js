'use strict';
// loads text input box for written questions
// & adds answers to pre-defined object
export async function addWrittenQuestion(question, q, id) {
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

  console.log(question.type.includes("random"));

  if (question.type.includes("random")) {
    // select random option for answer
    let answerNo = getRandomInt(question.options.length);
    let answer = question.options[answerNo];
    answers[q] = Object.values(answer)[0];

    exampleText = document.createElement("p");
    exampleText.textContent = Object.keys(answer)[0];

  } else {
    answers[q] = question.keywords || question.answer;
  }

  let textInput = document.createElement("input");
  textInput.type = "text";

  if (exampleText !== undefined) {
    return [exampleText, textInput];
  } else {
    return [textInput];
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

// random int generator for random questions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}