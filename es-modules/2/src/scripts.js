/**
 * Named Exports
 * Default Exports
 */

import { returnOk as ok, default as returnHi } from "./utils.js";

import * as math from "./math.js";

// console.log(math)

const name = "Nic";

// console.log(apiUrl)
console.log(returnHi);

console.log(ok(true));
console.log(returnHi(name));
