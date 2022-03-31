import { Money } from "./money.js";

export class Portfolio {
  constructor() {
    this.moneys = [];
  }

  getConversionRate(fromCurrency, toCurrency) {
    const EUR_TO_USD = 1.2;
    if (fromCurrency === toCurrency) {
      return 1;
    } else {
      return EUR_TO_USD;
    }
  }
  convert(money, currency) {
    return new Money(
      money.amount * this.getConversionRate(money.currency, currency),
      currency
    );
  }

  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }

  evaluate(currency) {
    let total = this.moneys.reduce(
      (total, money) => total + this.convert(money, currency).amount,
      0
    );
    return new Money(total, currency);
  }
}
