const addon = require("bindings")("addon");

//
// Modify memory of typed array.

// > before
const arr: Int32Array = new Int32Array(5);
console.log(arr); // [ 0, 0, 0, 0, 0]

// > after
addon.modifyTypedArray(arr);
console.log(arr); // [ 0, 1, 2, 3, 4]

//
// Modify memory of string.

// > before
const str: string = "Hi!!";
console.log(str); // "Hi!!"

// > after
addon.modifyString(str);
console.log(str); // "Hi!!"
