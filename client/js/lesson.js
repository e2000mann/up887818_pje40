`use strict`;

// loads lesson into DOM
async function loadLesson(){
  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");
  let title = document.getElementsByTagName("h1");
  title[0].textContent = `This is lesson ${id}`;
}

//loads lesson when window has loaded
window.onload = loadLesson;
