const fruits = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
  ]);


//   for(const x of fruits){
//     console.log(fruits[x])
//   }

function fun(value, key) {
    text += key + ' = ' + value + ' ';
    console.log(text)
  }

let text = "";
fruits.forEach (fun)
