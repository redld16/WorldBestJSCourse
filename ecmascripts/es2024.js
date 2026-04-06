//* ==========================================
//* ECMAScript Features (2024) / ES15
//* =========================================

//? List of new useful features added in ES15 👇
// Object.groupBy() / Map.groupBy()
// Promise.withResolvers()
// String.prototype.isWellFormed()
// String.prototype.toWellFormed()
// ArrayBuffer transfer methods
// Atomics.waitAsync()
// RegExp /v flag for Unicode

//* ==========================================
//* Object.groupBy() / Map.groupBy()
//* =========================================

//? Object.groupBy() groups elements of an iterable according to string values returned from a callback function. This is useful for organizing data by categories.

const products = [
  { name: "Laptop", category: "Electronics" },
  { name: "Shirt", category: "Clothing" },
  { name: "Phone", category: "Electronics" },
  { name: "Shoes", category: "Clothing" },
];

const groupByObj = Object.groupBy(products, (product) => product.category);
console.log(groupByObj);

// Output: {
//   Electronics: [{ name: "Laptop", category: "Electronics" }, { name: "Phone", category: "Electronics" }],
//   Clothing: [{ name: "Shirt", category: "Clothing" }, { name: "Shoes", category: "Clothing" }]
// }

//? Map.groupBy() is similar but returns a Map instead of an object
const groupedMap = Map.groupBy(products, (product) => product.category);
console.log(groupedMap);

//* ==========================================
//* Promise.withResolvers()
//* =========================================

//? Promise.withResolvers() returns an object containing a new Promise along with its resolve and reject functions. This makes it easier to work with promises outside of their constructor.

const { promise, resolve, reject } = Promise.withResolvers();

// You can now pass resolve/reject to other functions
setTimeout(() => resolve("Success!"), 1000);

promise.then((value) => console.log(value)); // Output: Success!

//? Before ES2024, you had to do:
// let resolve, reject;
// const promise = new Promise((res, rej) => {
//   resolve = res;
//   reject = rej;
// });

//* ==========================================
//* String.prototype.isWellFormed()
//* =========================================

//? isWellFormed() checks if a string contains properly formed Unicode (no lone surrogates). Returns true if the string is well-formed, false otherwise.

const validString = "Hello World";
console.log(validString.isWellFormed()); // true

// Example with problematic Unicode
const problematicString = "Hello" + String.fromCharCode(0xd800) + "World";
console.log(problematicString.isWellFormed()); // false (contains lone surrogate)

//* ==========================================
//* String.prototype.toWellFormed()
//* =========================================

//? toWellFormed() returns a string where all lone surrogates are replaced with the Unicode replacement character (U+FFFD)

const problematic = "Hello" + String.fromCharCode(0xd800) + "World";
console.log(problematic.toWellFormed()); // "Hello�World" (� is replacement character)

const clean = "Normal String";
console.log(clean.toWellFormed()); // "Normal String" (unchanged)

//* ==========================================
//* ArrayBuffer Transfer Methods
//* =========================================

//? New methods for transferring ArrayBuffer ownership efficiently
// - ArrayBuffer.prototype.transfer()
// - ArrayBuffer.prototype.transferToFixedLength()

const buffer = new ArrayBuffer(8);
const newBuffer = buffer.transfer(); // Transfers ownership

console.log(buffer.byteLength); // 0 (detached)
console.log(newBuffer.byteLength); // 8

//* ==========================================
//* Atomics.waitAsync()
//* =========================================

//? Atomics.waitAsync() allows waiting on a SharedArrayBuffer location without blocking the main thread. It returns a Promise that resolves when notified.

// const buffer = new SharedArrayBuffer(16);
// const i32a = new Int32Array(buffer);

// const { async, value } = Atomics.waitAsync(i32a, 0, 0);
// if (async) {
//   value.then(() => console.log("Notified!"));
// }

//* ==========================================
//* RegExp /v flag (Unicode Set Notation)
//* =========================================

//? The /v flag enhances Unicode support in regular expressions with set notation and string properties

// Set difference
const regex1 = /[\p{Script=Greek}--[αβγ]]/v;
console.log(regex1.test("α")); // false (excluded)
console.log(regex1.test("δ")); // true (Greek but not excluded)

// Set intersection
const regex2 = /[\p{Letter}&&\p{ASCII}]/v;
console.log(regex2.test("A")); // true (Letter AND ASCII)
console.log(regex2.test("α")); // false (Letter but not ASCII)

//? The /v flag is more powerful than /u for advanced Unicode matching
