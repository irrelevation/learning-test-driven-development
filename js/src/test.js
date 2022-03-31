import { strict as assert } from "assert";
import { Money } from "./money.js";
import { Portfolio } from "./portfolio.js";

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
      this[test]();
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
}

new MoneyTest().runAllTests();
