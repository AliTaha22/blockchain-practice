/*A callback is a function passed as an argument to another function
This technique allows a function to call another function
A callback function can run after another function has finished*/


// function myDisplayer(some) {
//     console.log(some);
//   }
  
//   function myFirst() {
//     myDisplayer("Hello");
//   }
  
//   function mySecond() {
//     myDisplayer("Goodbye");
//   }
  
//   myFirst();
//   mySecond();


// Create an Array
const myNumbers = [4, 1, -20, -7, 5, 9, -6];

// Call removeNeg with a callback
const posNumbers = removeNeg(myNumbers, (x) => x >= 0); 

// Display Result
console.log(posNumbers);

// Keep only positive numbers
function removeNeg(numbers, callback) {
  const myArray = [];
  for (const x of numbers) {
    if (callback(x)) {
      myArray.push(x);
    }
  }
  return myArray;
}


//(x) => x >=0 it is an arrow function which is equivalent to:

//function fun(x){
//     if(x >=0){
//         return true;
//     }else{
//         return false;
//     }
// }