`use strict`;

// loads lesson into DOM
async function loadLesson(){
  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");

  // retrieve lesson data from server
  let url = `/loadLesson?id=${id}`;
  let response = await fetch(url);
  let lessonFile = await response.json();

  // use lesson data to update DOM
  // update title
  let title = document.getElementsByTagName("h1");
  title[0].textContent = `Lesson ${id}: ${lessonFile.name}`;

  // add paragraphs
  for (const para of lessonFile.paragraphs){
    console.log(para);
    let paraElement = document.createElement("p");
    paraElement.textContent = para.text;
    document.body.appendChild(paraElement);
  }
}

//loads lesson when window has loaded
window.onload = loadLesson;
