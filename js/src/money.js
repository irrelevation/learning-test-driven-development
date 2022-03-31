export class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divideBy(divisor) {
    return new Money(this.amount / divisor, this.currency);
  }

}
