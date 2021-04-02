'use strict';

export function checkScreenSize() {
  let controlButtons = document.querySelector("#controlButtons");
  let container = document.querySelector(".container");
  let paragraphs = container.querySelectorAll("section");

  let currentlyHidden = controlButtons.classList.contains("hidden");
  let landscape = window.innerWidth > window.innerHeight;
  // do not change anything if it is already set up in the right way
  // if it is a mobile device (<40vw width screen) show control buttons
  // else hide control buttons
  if (!landscape && currentlyHidden) {
    controlButtons.classList.toggle("hidden");
    // if an element is focused on show that one, else show first one
    let focusExists = false;
    paragraphs.forEach(
      element => {
        if (!element.classList.contains("hidden")) {
          if (element === document.activeElement) {
            focusExists = true;
          } else {
            element.classList.toggle("hidden");
          }
        }
      }
    );
    if (!focusExists) {
      paragraphs[0].classList.toggle("hidden");
    }
  }
  if (landscape && !currentlyHidden) {
    controlButtons.classList.toggle("hidden");
    paragraphs.forEach(
      element => {
        if (element.classList.contains("hidden")) {
          element.classList.toggle("hidden");
        }
      }
    );
  }
}

export function setControlButtons(controlButtons) {
  let buttons = controlButtons.getElementsByTagName("button");
  // button 0 = untimed quiz
  buttons[0].addEventListener("click", goBack);
  // button 1 = timed quiz
  buttons[1].addEventListener("click", goNext);
}

function goBack() {
  let container = document.querySelector(".container");
  let paragraphs = container.querySelectorAll("section");
  console.log("go back");
  for (let i = 1; i < paragraphs.length; i++) {
    let element = paragraphs[i]
    let prevElement = paragraphs[i - 1]
    if (!element.classList.contains("hidden")) {
      element.classList.toggle("hidden");
      prevElement.classList.toggle("hidden");
      break;
    }
  }

}

function goNext() {
  let container = document.querySelector(".container");
  let paragraphs = container.querySelectorAll("section");
  console.log("go next");
  let endI = paragraphs.length - 1;
  for (let i = 0; i < endI; i++) {
    let element = paragraphs[i]
    let nextElement = paragraphs[i + 1]
    if (!element.classList.contains("hidden")) {
      element.classList.toggle("hidden");
      nextElement.classList.toggle("hidden");
      break;
    }
  }
}