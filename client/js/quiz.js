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
  for (let q = 0; q < 4; q++){
    question = questions[q];
    console.log(question);

    // add section element with id of q (index) and class of question type
    let questionSection = document.createElement("section");
    questionSection.id = `question${q}`;
    questionSection.setAttribute("class", question.type);

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
    // select random option for answer
    answerNo = getRandomInt(question.options.length);
    console.log(answerNo);
    console.log(question.options[answerNo]);
    answers[q] = question.options[answerNo];
  }

  let optionsSection = document.createElement("section");
  optionsSection.class = "options";

  const template = document.querySelector("#select");
  console.log(template);

  // add options as DOM elements (input & matching label)
  for (let o = 0; o < question.options.length; o++){
    let selectEle;
    selectEle = addOption(question, o, template);
    optionsSection.appendChild(selectEle);
  }

  return optionsSection;
}

// random int generator for random questions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// adds input & label for an option
function addOption(question, o, template){
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

  // set it so that only one input can be checked at a time
  if (question.type.includes("single")){
    cloneSelect.addEventListener("click", toggleSelected);
  }

  return clone;
}

// checks if an option is already selected
function toggleSelected(event) {
  console.log("checking");
  let targetEle = event.target;
  let targetParent = targetEle.parentElement;
  console.log(targetEle);
  if (!targetEle.classList.contains("selected")) {
    if (noneSelected(targetParent)) {
      targetEle.classList.add("selected");
    } else {
      let selectedEle = targetParent.querySelector(".selected");
      selectedEle.classList.remove("selected");
      targetEle.classList.add("selected");
    }
  } else {
    targetEle.classList.remove("selected");
  }
  correctCheckboxes(targetParent);
}

// check if any options are already selected
function noneSelected(section) {
  let options = section.getElementsByTagName("input");
  for (const option of options) {
    if (option.classList.contains("selected")) {
      return false;
    }
  }
  return true;
}

// unchecking the boxes using javascript does not update it visually unless
// this function is called
function correctCheckboxes(section) {
  let options = section.getElementsByTagName("input");
  for (const option of options) {
    option.checked = option.classList.contains("selected");
  }
}


// this goes through and checks the answers
function checkAnswers(){
  let score = 0;
  for (let q = 0; q < 4; q++){
    // finds corresponding question element
    // (have to escape character for it to find number ids)
    let currentQuestion = document.querySelector(`#question${q}`);
    if (currentQuestion.className.includes("written")){
      let answerInput = currentQuestion.getElementsByTagName("input")[0];
      score = score + checkWrittenAnswer(answerInput, q);
      console.log("written");
    } else {
      let answerInput = currentQuestion.getElementsByTagName("section")[0];
      score = score + checkSelectAnswer(answerInput, q);
    }
    console.log(`score is ${score}`);
  }
  return score;
}

// checks written answer
function checkWrittenAnswer(answerInput, q){
  let answer = answerInput.value;
  console.log(answer);
  let correctAnswer = answers[q];
  console.log(`correct answer is ${typeof(correctAnswer)}`);
  console.log(correctAnswer);
  if (typeof(correctAnswer) === 'object'){ //keywords
    // how many points is each keyword worth?
    let maxWords = correctAnswer.length;
    let scoreForEach = 100 / maxWords

    // how many keywords are in user's answer?
    let includedWords = 0;
    for (const index in correctAnswer){
      if (answer.includes(correctAnswer[index])){
        includedWords++;
      }
    }

    return includedWords * scoreForEach;
  } else {
    if (answer == correctAnswer){
      return 100;
    }
  }
}

// checks selection answer
function checkSelectAnswer(answerInput, q){
  let userAnswers = answerInput.getElementsByTagName("input");
  let correctAnswer = answers[q];
  if (typeof(correctAnswer) === 'object'){
    // multi select
    return 0;
  } else {
    let correctChoice = userAnswers.getElementsByName(correctAnswer)[0];
    return correctChoice.checked ? 100: 0;
  }
}


// this saves the highest score to sessionStorage & returns user to homepage
function saveScore(id){
  let score = checkAnswers();
  // save score to sessionStorage (if higher or first time)
  // if score exists
  if ("id" in localStorage){
    let prevHigh = localStorage.getItem(id);
    // if new score is higher
    if (prevHigh < score){
      localStorage.setItem(id, score);
    }
  } else {
    localStorage.setItem(id, score);
  }

  // return user to homepage
  window.location.href = `index.html`;
}

// loads quiz when window has loaded
window.onload = loadQuiz;
