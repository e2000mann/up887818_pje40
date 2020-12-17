'use strict';

//loads topics into DOM
async function loadTopics(){
  // sends request to server to retrieve directory.json
  let url = '/loadDir';
  let response = await fetch(url);
  let directory = await response.json;
  console.log(directory);
}

//loads topics when window is loaded
window.addEventListener("load", loadTopics());
