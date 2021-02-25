'use strict';

// used for quiz buttons on both index.html & lesson.html

//function to redirect to quiz page
export function setQuizButtons(quizButtons, id){
  window.untimedQuiz = untimedQuiz;
  window.timedQuiz = timedQuiz;

  let buttons = quizButtons.getElementsByTagName("button");
  // button 0 = untimed quiz
  buttons[0].setAttribute('onClick', `untimedQuiz(${id})`);
  // button 1 = timed quiz
  buttons[1].setAttribute('onClick', `timedQuiz(${id}, event)`);
}

//untimed quiz
function untimedQuiz(id){
  sessionStorage.setItem("time", 0);
  window.location.href = "quiz.html";
}

//timed quiz
function timedQuiz(id, event){
  console.log("timed");
  let inputEle = event.target.parentElement.getElementsByTagName("input")[0];
  let minutes = inputEle.value;
  console.log(minutes);
  sessionStorage.setItem("time", minutes);
  window.location.href = "quiz.html";
}
