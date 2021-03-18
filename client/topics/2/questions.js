'use strict';

export function q4(){
  // generate 2 sets length 4
  // if true, sets are same (maybe shuffled)
  // if false, sets are different
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let set1;
  let output = {};
  set1 = generateSet(numbers);
  let set2 = [...set1];
  let randomNum = Math.random();
  // true
  if (randomNum < 0.5){
    set2 = shuffleArray(set1);
    output.answer = "true";
  } else {
    output.answer = "false";
    while (set2 === set1){
      set2 = generateSet(numbers);
    }
  }
  output.exampleText = `1) {${set1}}, 2) {${set2}}`;
  return output;
}

export function q5(){
  // generate set1, set length 6 and set2, set length 4
  // if true, set2 is subset of set1 (all elements of set2 in set1)
  // if false, set2 is not subset
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let set1;
  let output = {};
  set1 = generateSet(numbers, 6);
  let set2 = [...set1];
  let randomNum = Math.random();
  // true
  if (randomNum < 0.5){
    set2 = shuffleArray(set1);
    // pop 2 elements to make set length 4
    set2.pop();
    set2.pop();
    output.answer = "true";
  } else {
    output.answer = "false";
    while (set2.every(r => set1.includes(r))){
      set2 = generateSet(numbers);
    }
  }
  output.exampleText = `1) {${set1}}, 2) {${set2}}`;
  return output;
}

// gets 2 sets length 4, finds union
export function q7(){
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let output = {};

  let set1 = generateSet(numbers);
  let set2 = generateSet(numbers);

  output.exampleText = `1) {${set1}}, 2) {${set2}}`;

  let union = set1.filter(element => set2.includes(element));
  output.answer = union;

  return output;
}

// gets 2 sets length 4, finds intersection
export function q8(){
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let output = {};

  let set1 = generateSet(numbers);
  let set2 = generateSet(numbers);

  output.exampleText = `A={${set1}}, B={${set2}}`;

  let intersection = set1.filter(element => !set2.includes(element));
  output.answer = intersection;

  return output;
}

function generateSet(numbers, length=4){
  let setArray = [];
  for (let i=0; i<length; i++){
    let item = numbers[Math.floor((Math.random()*numbers.length))]
    // remove number from array
    numbers = numbers.filter(e => e !== item);
    setArray.push(item);
  }
  return setArray;
}

function shuffleArray(array){
  return array.sort(() => Math.random() - 0.5);
}
