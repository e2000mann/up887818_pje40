`use strict`;

// global scope so all functions can access them
let answers = {}

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
  // find submit button to put questions before it
  let submitButton = document.getElementsByName("Submit")[0];

  // add each question
  // counter is used instead of "question in questions" so that
  // the index is easily accessible
  for (let q = 0; q < 10; q++){
    question = questions[q];
    console.log(question);

    // add section element with id of q (index) and class of question type
    let questionSection = document.createElement("section");
    questionSection.id = q;
    questionSection.class = question.type;

    let questionTitle = document.createElement("p");
    questionTitle.textContent = `Question ${q+1}: ${question.title}`;

    questionSection.appendChild(questionTitle);

    if (question.type == "written"){
      questionSection.appendChild(addWrittenQuestion(question, q));
    }

    if (question.type.includes("select")){
      questionSection.appendChild(addSelectQuestion(question, q));
    }

    // add question in before submit button
    document.body.insertBefore(questionSection, submitButton);

    console.log(answers);
  }
}

// loads text input box for written questions
// & adds answers to pre-defined object
function addWrittenQuestion(question, q){
  let textInput = document.createElement("input");
  textInput.type = "text";

  answers[q] = question.keywords;

  return textInput;
}

// loads selection input for select questions
// checks if single select or multiple select
// randomises answers if wanted
function addSelectQuestion(question, q){
  if (question.type.includes("random")){
    answerNo = getRandomInt(question.options.length);
    console.log(answerNo);
    console.log(question.options[answerNo]);
    answers[q] = question.options[answerNo];
  }

  let optionsSection = document.createElement("section");
  optionsSection.class = "options";

  const template = document.querySelector("#select");
  console.log(template);

  for (let o = 0; o < question.options.length; o++){
    let optionName;

    if (question.type.includes("random")){

      optionName = Object.values(question.options[o])[0];
    } else {
      optionName = question.options[o];
    }
    console.log(optionName);
    // setting deep to true clones the child nodes too
    let clone = template.content.cloneNode(true);
    let cloneLabel = clone.querySelector("label");

    cloneLabel.textContent = optionName;
    cloneLabel.setAttribute("for", optionName);

    let cloneSelect = clone.querySelector("input");
    cloneSelect.name = optionName;

    optionsSection.appendChild(clone);
  }

  return optionsSection;
}

// random int generator for random questions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
