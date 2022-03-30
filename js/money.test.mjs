import { strict as assert } from "assert";
import { Money, Portfolio } from "./money.mjs";

let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
assert.deepEqual(fiveDollars.times(2), tenDollars);

let tenEuros = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
assert.deepEqual(tenEuros.times(2), twentyEuros);

let initialMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = initialMoney.divideBy(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
assert.deepEqual(expectedMoneyAfterDivision, actualMoneyAfterDivision);

let portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
let fifteenDollars = new Money(15, "USD");
assert.deepEqual(portfolio.evaluate("USD"), fifteenDollars);
