//* ==========================================
//* ECMAScript Features (2025) / ES16
//* =========================================

//? List of new useful features added in ES16 👇
// RegExp.escape()
// Promise.try()
// Iterator Helpers (.map(), .filter(), .take(), etc.)
// Set methods (.union(), .intersection(), .difference(), etc.)
// Float16Array (16-bit floating point)
// Math.f16round()
// RegExp Pattern Modifiers
// Import Attributes (JSON modules)

//* ==========================================
//* RegExp.escape()
//* =========================================

//? RegExp.escape() escapes any characters that would have special meaning in a regular expression.This is useful when you need to match user input literally.

// const userInput = "3.5 + 2 = 5.5";
// const escaped = RegExp.escape(userInput);
// console.log(escaped); // "3\.5 \+ 2 = 5\.5"

// const regex = new RegExp(escaped);
// console.log(regex.test("3.5 + 2 = 5.5")); // true

//? Before ES2025, you had to manually escape special characters
// const manualEscape = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

//* ==========================================
//* Promise.try()
//* =========================================

//? Promise.try() wraps a function call (sync or async) in a promise, catching both synchronous and asynchronous errors uniformly.

// Promise.try(() => {
//   return 42; // Synchronous
// }).then(result => console.log(result)); // 42

// Promise.try(() => {
//   throw new Error("Oops!");
// }).catch(err => console.log(err.message)); // "Oops!"

//? Great for normalizing sync and async code paths
// Promise.try(async () => {
//   return await fetch('/api/data');
// }).catch(err => console.log('Error:', err));

//* ==========================================
//* Iterator Helpers
//* =========================================

//? Iterator helpers provide functional programming methods for iterators without converting to arrays first

const nums = [1, 2, 3, 4, 5];

// .map() - transforms each element
const doubled = nums.values().map(x => x * 2);
console.log([...doubled]); // [2, 4, 6, 8, 10]

// .map() - transforms each element
const tripled = nums.map(x => x * 3);
console.log([...tripled]); // [3, 6, 9, 12, 15]

// .filter() - filters elements
const evens = nums.values().filter(x => x % 2 === 0);
console.log([...evens]); // [2, 4]

// .take() - takes first n elements
const first3 = nums.values().take(3);
console.log([...first3]); // [1, 2, 3]

// .drop() - skips first n elements
const skip2 = nums.values().drop(2);
console.log([...skip2]); // [3, 4, 5]

// .flatMap() - maps and flattens
const pairs = nums.values().flatMap(x => [x, x * 2]);
console.log([...pairs]); // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]

//? Chaining multiple helpers
const result = nums.values()
  .filter(x => x > 2)
  .map(x => x * 2)
  .take(2);
console.log([...result]); // [6, 8]

//* ==========================================
//* Set Methods
//* =========================================

//? New mathematical set operations for native Set objects

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// .union() - combines all elements
const union = setA.union(setB);//returns a new set(object)
console.log([...union]); // [1, 2, 3, 4, 5, 6]

// .intersection() - common elements
const intersection = setA.intersection(setB);
console.log([...intersection]); // [3, 4]

// .difference() - elements in A but not in B
const difference = setA.difference(setB);
console.log([...difference]); // [1, 2]

// .symmetricDifference() - elements in either but not both
const symDiff = setA.symmetricDifference(setB);
console.log([...symDiff]); // [1, 2, 5, 6]

// .isSubsetOf() - checks if A is subset of B
console.log(new Set([1, 2]).isSubsetOf(setA)); // true

// .isSupersetOf() - checks if A contains all of B
console.log(setA.isSupersetOf(new Set([2, 3]))); // true

// .isDisjointFrom() - checks if sets have no common elements
console.log(setA.isDisjointFrom(new Set([7, 8]))); // true

//* ==========================================
//* Float16Array
//* =========================================

//? Float16Array is a typed array for 16-bit floating point numbers (half precision). Useful for GPU operations, graphics, and memory-constrained scenarios.

const float16 = new Float16Array([1.5, 2.7, 3.9]);
console.log(float16[0]); // 1.5
console.log(float16.length); // 3
console.log(float16.byteLength); // 6 (2 bytes per element)

//? Comparison with other float arrays
// Float16Array: 16 bits (2 bytes) - less precision, saves memory
// Float32Array: 32 bits (4 bytes) - standard precision
// Float64Array: 64 bits (8 bytes) - double precision

//* ==========================================
//* Math.f16round()
//* =========================================

//? Math.f16round() rounds a number to the nearest 16-bit floating point representation

console.log(Math.f16round(1.337)); // Rounded to 16-bit precision
console.log(Math.f16round(1.5)); // 1.5
console.log(Math.f16round(NaN)); // NaN

//* ==========================================
//* RegExp Pattern Modifiers
//* =========================================

//? Inline modifiers allow applying flags to specific parts of a regular expression

// Apply case-insensitive flag only to specific part
const regex1 = /Hello (?i:world)/;
console.log(regex1.test("Hello WORLD")); // true
console.log(regex1.test("HELLO world")); // false (Hello must be exact case)

// Multiple modifiers
const regex2 = /(?i:abc)(?-i:DEF)/;
console.log(regex2.test("ABCdef")); // false
console.log(regex2.test("abcDEF")); // true

//? Modifiers: i (case-insensitive), m (multiline), s (dotAll)

//* ==========================================
//* Import Attributes (JSON modules)
//* =========================================

//? Import attributes allow you to specify the type of module being imported, ensuring type safety

// Import JSON file directly
// import config from './config.json' with { type: 'json' };
// console.log(config.version);

//? Before ES2025, you had to use fetch() or require() for JSON files
// const config = await fetch('./config.json').then(r => r.json());

//? Benefits:
// - Static analysis at build time
// - Type checking
// - Better performance
// - Works with bundlers
