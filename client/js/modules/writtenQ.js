'use strict';
// loads text input box for written questions
// & adds answers to pre-defined object
export function addWrittenQuestion(question, q){
  let textInput = document.createElement("input");
  textInput.type = "text";

  answers[q] = question.keywords;

  return textInput;
}
