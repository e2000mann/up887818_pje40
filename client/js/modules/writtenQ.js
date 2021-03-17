'use strict';
// loads text input box for written questions
// & adds answers to pre-defined object
export async function addWrittenQuestion(question, q, id){
  // fragment element is used to store all elements generated in code
  // this does not show in the final HTML.
  let newElements = document.createElement("fragment");
  if (question.script){
    console.log("custom script exists");
    // run custom script to get question and answer
    let output = await loadQuestionFunction(id, question.script);
    console.log(`custom script output is ${Object.values(output)}`);

    // answer always exists
    question.answer = output.answer;

    // get example text if exists
    if (output.exampleText){
      let exampleText = document.createElement("p");
      exampleText.textContent = output.exampleText;
      newElements.appendChild(exampleText);
    }
  }

  let textInput = document.createElement("input");
  textInput.type = "text";

  if (question.keywords){
    answers[q] = question.keywords;
  } else {
    answers[q] = question.answer;
  }

  newElements.appendChild(textInput);
  return newElements;
}
// loads question.js from topic folder
// runs script given in question data & returns output
async function loadQuestionFunction(id, functName){
  let output = {};
  let module = await import(`../../topics/${id}/questions.js`);
  output = module[functName]();
  return output;
}
