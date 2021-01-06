'use strict';

//loads topics into DOM
async function loadTopics(){
  // sends request to server to retrieve directory.json
  let url = '/loadDir';
  let response = await fetch(url);
  let directory = await response.json();
  console.log(directory);
  let topics = directory.topics;

  // gets template from index.html
  const topicSection = document.querySelector("#topicSection");

  // special case for 1st topic only - no quiz available
  addSpecialTopicSection(topics[0]);
  // removes 1st topic as topic section created
  topics.shift();

  topics.forEach(addTopicSection);
}

// special function for 1st topic only
function addSpecialTopicSection(value){
  // copy template content (inc. children)
  let clone = topicSection.content.cloneNode(true);

  // change text using value
  // output = "n) Topic name", where n is topic id
  let text = `${value.id}) ${value.name}`;
  // text box is 1st p tag in clone
  let textBox = clone.querySelectorAll("p")[0];
  textBox.textContent = text;

  // remove quiz button as not necessary (2nd button tag in clone)
  let quizButton = clone.querySelectorAll("button")[1];
  console.log(quizButton);
  quizButton.remove();

  // add clone to DOM
  document.body.appendChild(clone);
}

// function for rest of topics
function addTopicSection(value){
  // copy template content (inc. children)
  let clone = topicSection.content.cloneNode(true);

  // change text using value
  // output = "n) Topic name", where n is topic id
  let text = `${value.id}) ${value.name}`;
  // text box is 1st p tag in clone
  let textBox = clone.querySelectorAll("p")[0];
  textBox.textContent = text;

  // add clone to DOM
  document.body.appendChild(clone);
}

//loads topics when window is loaded
window.addEventListener("load", loadTopics());
