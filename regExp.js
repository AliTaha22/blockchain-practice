let x = "visit microsoft";


//normal
// let y = x.search("microsoft");

// console.log(y);



//regular expression
let y = x.search(/microsoft/i);
console.log(y);

y = x.replace(/microsoft/i , "W3school")

console.log(y);