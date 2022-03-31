import { fail } from "assert";
import { Money } from "./money.js";

export class Portfolio {
  constructor() {
    this.moneys = [];
    this.conversionRates = new Map();
    this.conversionRates.set("EUR->USD", 1.2);
    this.conversionRates.set("USD->KRW", 1100);
  }

  getConversionString(fromCurrency, toCurrency) {
    return `${fromCurrency}->${toCurrency}`;
  }

  getConversionRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return 1;
    } else {
      return this.conversionRates.get(
        this.getConversionString(fromCurrency, toCurrency)
      );
    }
  }
  convert(money, currency) {
    let conversionRate = this.getConversionRate(money.currency, currency);
    if (conversionRate === undefined) return undefined;
    return new Money(
      money.amount * this.getConversionRate(money.currency, currency),
      currency
    );
  }

  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }

  evaluate(currency) {
    let failures = [];
    let total = this.moneys.reduce((total, money) => {
      let converted = this.convert(money, currency);
        if (converted === undefined) {
        failures.push(this.getConversionString(money.currency, currency));
        return total;
      }
      return total + converted.amount;
    }, 0);
    if (failures.length > 0) {
      throw new Error(`Missing exchange rate(s): [${failures}]`);
    }
    return new Money(total, currency);
  }
}
