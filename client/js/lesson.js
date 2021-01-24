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

  // all paragraphs must be before quiz buttons
  let quizButtons = document.querySelector("#quizButtons");

  // add paragraphs
  for (const para of lessonFile.paragraphs){
    console.log(para);

    // create section to store paragraph text & example
    let paraSection = document.createElement("section");

    // p tag to store paragraph text
    let paraElement = document.createElement("p");
    paraElement.textContent = para.text;
    paraSection.appendChild(paraElement);

    // figure tag to store example (if necessary)
    if ("example" in para) {
      let exampleFigure = document.createElement("figure");

      // img tag & figcaption to go inside figure tag
      let exampleImg = document.createElement("img");
      exampleImg.src = `../topics/${id}/${para.example.imageFile}`;

      let exampleFigCaption = document.createElement("figcaption");
      exampleFigCaption.textContent = para.example.caption;

      // add img & figcaption into figure
      exampleFigure.appendChild(exampleImg);
      exampleFigure.appendChild(exampleFigCaption);

      // add figure to section
      paraSection.appendChild(exampleFigure);
    }

    // add section to DOM
    // before quiz buttons (specified earlier)
    document.body.insertBefore(paraSection, quizButtons);
  }
}

//loads lesson when window has loaded
window.onload = loadLesson;
