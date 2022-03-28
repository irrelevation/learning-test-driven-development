import { strict as assert } from "assert";
import { Dollar } from "./money.mjs";

let fiver = new Dollar(5);
let tenner = fiver.times(2);

assert.strictEqual(tenner.amount, 10);
