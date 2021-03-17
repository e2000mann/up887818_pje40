'use strict';
// loads text input box for written questions
// & adds answers to pre-defined object
export function addWrittenQuestion(question, q, id){
  let textInput = document.createElement("input");
  textInput.type = "text";

  if (question.keywords){
    answers[q] = question.keywords;
  } else {
    answers[q] = question.answer;
  }

  return textInput;
}
