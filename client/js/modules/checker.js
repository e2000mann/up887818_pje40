'use strict';
// this goes through and checks the answers
export function checkAnswers() {
  let score = 0;
  // all question elements
  let container = document.querySelector(".container");
  let questions = container.childNodes;
  console.log(answers);
  for (let q = 0; q < questions.length; q++) {
    // finds corresponding question element
    // (have to escape character for it to find number ids)
    let currentQuestion = questions[q];
    if (currentQuestion.className.includes("written")) {
      let answerInput = currentQuestion.getElementsByTagName("input")[0];
      score = score + checkWrittenAnswer(answerInput, q);
      console.log("written");
    } else if (currentQuestion.className.includes("select")) {
      let answerInput = currentQuestion.getElementsByTagName("section")[0];
      score = score + checkSelectAnswer(answerInput, q);
    }
    console.log(`score is ${score}`);
  }
  return score;
}

// checks written answer
function checkWrittenAnswer(answerInput, q) {
  let answer = answerInput.value || "";
  console.log(answer);
  let correctAnswer = answers[q];
  console.log(`correct answer is ${typeof(correctAnswer)}`);
  console.log(correctAnswer);
  if (typeof(correctAnswer) === 'object') { //keywords
    // how many points is each keyword worth?
    let maxWords = correctAnswer.length;
    let scoreForEach = 100 / maxWords

    // how many keywords are in user's answer?
    let includedWords = 0;
    for (const index in correctAnswer) {
      if (answer.includes(correctAnswer[index])) {
        includedWords++;
      }
    }

    return includedWords * scoreForEach;
  } else {
    if (answer == correctAnswer) {
      return 100;
    }
  }
}

// checks selection answer
function checkSelectAnswer(answerInput, q) {
  let userAnswers = answerInput.getElementsByTagName("input");
  let correctAnswer = answers[q];
  if (typeof(correctAnswer) === 'object') {
    // multi select
    return 0;
  } else {
    let correctChoice = userAnswers[correctAnswer];
    return correctChoice.checked ? 100 : 0;
  }
}