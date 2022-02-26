var origArray = [0, 1, 2, 3, 4, 5];
var cloneArray = origArray.slice();
var i = 3;

cloneArray.splice(i, 1);

console.log(cloneArray.join("---"));
