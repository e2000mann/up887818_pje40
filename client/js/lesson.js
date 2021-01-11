`use strict`;

// loads lesson into DOM
function loadLesson(){
  // get topic id from sessionStorage
  const id = sessionStorage.getItem("id");
  let header = document.getElementsByTagName("h1");
  console.log(header);
  header.textContent = `This is lesson ${id}`;
}

window.addEventListener("onload", loadLesson());
