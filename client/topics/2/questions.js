'use strict';

export function q4(){
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let set1;
  set1 = generateSet(numbers);
  let randomNum = Math.random();
  // true
  if (randomNum < 0.5){
    let set2 = shuffleArray(set1);
  } else {
    let set2;
    while (set2 != set1){
      set2 = generateSet(numbers);
    }
  }
  return [set1, set2];
}

function generateSet(numbers){
  let setArray = [];
  for (i=0; i<4; i++){
    let item = numbers[Math.floor((Math.random()*list.length))]
    // remove number from array
    numbers = numbers.filter(e => e !== item);
    setArray.push(item);
  }
  return setArray;
}

function shuffleArray(array){
  for(let i = array.length — 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}
