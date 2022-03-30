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

export class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }

  evaluate(currency) {
    let total = this.moneys.reduce((total, money) => total + money.amount, 0);
    return new Money(total, currency);
  }
}
