'use strict';
// loads text input box for written questions
// & adds answers to pre-defined object
export async function addWrittenQuestion(question, q, id){
  let exampleText;

  if (question.script){
    // run custom script to get question and answer
    let output = await loadQuestionFunction(id, question.script);

    // answer always exists
    question.answer = output.answer;

    // get example text if exists
    if (output.exampleText){
      exampleText = document.createElement("p");
      exampleText.textContent = output.exampleText;
    }
  }
  else if (question.type.includes("random")){
    // select random option for answer
    let answerNo = getRandomInt(question.options.length);
    answers[q] = question.options[answerNo];
    console.log(answers[q]);

    exampleText = document.createElement("p");
    exampleText.textContent = Object.keys(answers[q])[0];
    console.log(exampleText);

  } else {
    if (question.keywords){
      answers[q] = question.keywords;
    } else {
      answers[q] = question.answer;
    }
  }

  let textInput = document.createElement("input");
  textInput.type = "text";

  if (exampleText !== undefined){
    return [exampleText, textInput];
  } else{
    return [textInput];
  }
}

// loads question.js from topic folder
// runs script given in question data & returns output
async function loadQuestionFunction(id, functName){
  let output = {};
  let module = await import(`../../topics/${id}/questions.js`);
  output = module[functName]();
  return output;
}
