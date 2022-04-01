import { fail } from "assert";
import { Money } from "./money.js";

export class Portfolio {
  constructor() {
    this.moneys = [];
  }
  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }
  evaluate(bank, currency) {
    let errors = [];
    let total = this.moneys.reduce((total, money) => {
      try {
        return total + bank.convert(money, currency).amount;
      } catch (error) {
        if (error.name !== "ConversionError") throw error;
        errors.push(error.message);
        return total;
      }
    }, 0);
    if (errors.length > 0) {
      throw new Error(`Missing exchange rate(s): [${errors}]`);
    }
    return new Money(total, currency);
  }
}
