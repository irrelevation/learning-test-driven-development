import { Money } from "./money.js";

export class ConversionError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConversionError";
  }
}

export class Bank {
  constructor() {
    this.exchangeRates = new Map();
  }
  getExchangeKey(from, to) {
    return from + "->" + to;
  }
  addExchangeRate(from, to, rate) {
    this.exchangeRates.set(this.getExchangeKey(from, to), rate);
  }
  getExchangeRate(from, to) {
    return this.exchangeRates.get(this.getExchangeKey(from, to));
  }
  convert(money, currency) {
    if (money.currency === currency)
      return new Money(money.amount, money.currency);
    let rate = this.getExchangeRate(money.currency, currency);
    if (rate === undefined) {
      throw new ConversionError(this.getExchangeKey(money.currency, currency));
    }
    return new Money(money.amount * rate, currency);
  }
}
