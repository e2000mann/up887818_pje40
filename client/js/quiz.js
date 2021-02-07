`use strict`;

// loads quiz into DOM
function loadQuiz(){
  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");
  let title = document.getElementsByTagName("h1");
  title[0].textContent = `This is quiz ${id}`;
}

function checkAnswers(){
  return 10;
}

// loads quiz when window has loaded
window.onload = loadQuiz;
