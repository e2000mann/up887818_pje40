'use strict';

export function q4(){
  console.log("q4 code running");
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let set1;
  let set2;
  let output = {};
  set1 = generateSet(numbers);
  let randomNum = Math.random();
  // true
  if (randomNum < 0.5){
    set2 = shuffleArray(set1);
    output.answer = "true";
  } else {
    output.answer = "false";
    while (set2 != set1){
      set2 = generateSet(numbers);
    }
  }
  output.examples = [set1, set2];
  return output;
}

function generateSet(numbers){
  let setArray = [];
  for (let i=0; i<4; i++){
    let item = numbers[Math.floor((Math.random()*numbers.length))]
    // remove number from array
    numbers = numbers.filter(e => e !== item);
    setArray.push(item);
  }
  return setArray;
}

function shuffleArray(array){
  let starti = array.length - 1;
  for(let i = starti; i > 0; i= i-1){
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
