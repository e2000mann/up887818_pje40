'use strict';

function q1(){
  q1CheckAnswer("a set is a collection of elements");
}

// written answer questions expect answers to contain a number of keywords.
function q1CheckAnswer(input){
  const keyWords = ["collection", "elements"];

  let correct = true;

  for (const keyWord in keyWords){
    if !(keyword in input){
      correct = false;
    }
  }

  return correct;
}
