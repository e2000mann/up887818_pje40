`use strict`;

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
  for (question in questions){
    console.log(question);
  }
}

// this goes through and checks the answers
function checkAnswers(){
  return 20;
}

// this saves the highest score to sessionStorage & returns user to homepage
function saveScore(id){
  const score = checkAnswers();
  // save score to sessionStorage (if higher or first time)
  // if score exists
  if ("id" in sessionStorage){
    let prevHigh = sessionStorage.getItem(id);
    // if new score is higher
    if (prevHigh < score){
      sessionStorage.setItem(id, score);
    }
  } else {
    sessionStorage.setItem(id, score);
  }

  // return user to homepage
  window.location.href = `index.html`;
}

// loads quiz when window has loaded
window.onload = loadQuiz;
