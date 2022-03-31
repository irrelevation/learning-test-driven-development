import { Money } from "./money.js";

export class Portfolio {
  constructor() {
    this.moneys = [];
    this.conversionRates = new Map();
    this.conversionRates.set("EUR->USD", 1.2);
    this.conversionRates.set("USD->KRW", 1100);
  }

  getConversionRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return 1;
    } else {
      return this.conversionRates.get(`${fromCurrency}->${toCurrency}`);
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
