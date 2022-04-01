import { strict as assert } from "assert";
import { Money } from "./money.js";
import { Portfolio } from "./portfolio.js";
import { stdout, stderr } from "process";
import { Bank } from "./bank.js";

console = new console.Console({
  groupIndentation: 4,
  stdout,
  stderr,
});

class MoneyTest {
  getAllTestMethods() {
    const properties = Object.getOwnPropertyNames(MoneyTest.prototype);
    return properties.filter(
      (prop) =>
        typeof MoneyTest.prototype[prop] === "function" &&
        prop.startsWith("test")
    );
  }
  runAllTests() {
    for (let test of this.getAllTestMethods()) {
      try {
        console.log("[running]", test);
        this[test]();
      } catch (error) {
        if (error instanceof assert.AssertionError) {
          console.group("[\u274C]", test, "\n");
          console.log(error.message, "\n");
          console.log("expected:", error.expected);
          console.log("actual:  ", error.actual, "\n");
          console.groupEnd();
        } else {
          throw error;
        }
      }
    }
  }

  testMultiplication() {
    let tenEuros = new Money(10, "EUR");
    let twentyEuros = new Money(20, "EUR");
    assert.deepEqual(tenEuros.times(2), twentyEuros);
  }
  testDivision() {
    let initialMoney = new Money(4002, "KRW");
    let actualMoneyAfterDivision = initialMoney.divideBy(4);
    let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
    assert.deepEqual(expectedMoneyAfterDivision, actualMoneyAfterDivision);
  }
  testAddition() {
    let portfolio = new Portfolio();
    let fiveDollars = new Money(5, "USD");
    let tenDollars = new Money(10, "USD");
    let fifteenDollars = new Money(15, "USD");
    portfolio.add(fiveDollars, tenDollars);
    assert.deepEqual(portfolio.evaluate("USD"), fifteenDollars);
  }
  testAdditionOfDollarsAndEuros() {
    let portfolio = new Portfolio();
    let fiveDollars = new Money(5, "USD");
    let fiveEuros = new Money(5, "EUR");
    portfolio.add(fiveDollars, fiveEuros);
    let expectedDollarValue = new Money(11, "USD");
    assert.deepEqual(portfolio.evaluate("USD"), expectedDollarValue);
  }
  testAdditionOfDOllarsAndWons() {
    let fiveDollars = new Money(5, "USD");
    let thousandWons = new Money(1000, "KRW");
    let portfolio = new Portfolio();
    portfolio.add(fiveDollars, thousandWons);
    let expectedValue = new Money(6500, "KRW");
    assert.deepEqual(portfolio.evaluate("KRW"), expectedValue);
  }
  testAdditionWithMultipleMissingExchangeRates() {
    let oneDollar = new Money(1, "USD");
    let oneEuro = new Money(1, "EUR");
    let oneWon = new Money(1, "KRW");
    let portfolio = new Portfolio();
    portfolio.add(oneDollar, oneEuro, oneWon);
    let expectedError = new Error(
      "Missing exchange rate(s): [USD->Kalganid,EUR->Kalganid,KRW->Kalganid]"
    );
    assert.throws(() => portfolio.evaluate("Kalganid"), expectedError);
  }
  testConversion() {
    let bank = new Bank();
    bank.addExchangeRate("EUR", "USD", 1.2);
    let fiveEuros = new Money(5, "EUR");
    let sixDollars = new Money(6, "USD");
    assert.deepEqual(bank.convert(fiveEuros, "USD"), sixDollars);
  }
}

new MoneyTest().runAllTests();
