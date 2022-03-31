export class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  getConversionRate(currency) {
    const EUR_TO_USD = 1.2;
    if (currency === this.currency) {
      return 1;
    } else {
      return EUR_TO_USD;
    }
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divideBy(divisor) {
    return new Money(this.amount / divisor, this.currency);
  }

  convert(currency) {
    return new Money(this.amount * this.getConversionRate(currency), currency);
  }
}
