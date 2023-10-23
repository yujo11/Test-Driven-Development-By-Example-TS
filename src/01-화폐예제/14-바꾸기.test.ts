/**
 * TEST LIST
 *
 * $5 + 10CHF = $10(환율이 2:1일 경우)
 * $5 + $5 = $10
 * $5 + $5에서 Money 반환하기
 * ✅ Bank.reduce(Money)
 * Money에 대한 통화 변환을 수행하는 Reduce
 * Reduce(Bank, String)
 * ✅ $5 * 2 = $10
 * ✅ amount를 private으로 만들기
 * ✅ Dollar 부작용(side effect)?
 * Money 반올림?
 * ✅ equals()
 * hasCode()
 * Equal null
 * Equal object
 * ✅ 5CHF * 2 = 10CHF
 * Dollar/Franc 중복
 * ✅ 공용 equals
 * 공용 times
 * ✅ Franc과 Dollar 비교하기
 * ✅ 통화?
 * ✅ Franc Multiplication Test를 를 지워야 할까?
 *
 */

export {}

interface Expression {
  reduce: (bank: Bank, to: string) => Money
}

class Money implements Expression {
  amount: number
  currency: string

  constructor(amount: number, currency: string) {
    this.amount = amount
    this.currency = currency
  }

  equals(money: Money): boolean {
    return this.amount === money.amount && this.currency === money.currency
  }

  times(multiplier: number) {
    return new Money(this.amount * multiplier, this.currency)
  }

  toString() {
    return `${this.amount} ${this.currency}`
  }

  getCurrency() {
    return this.currency
  }

  plus(addend: Money): Expression {
    return new Sum(this, addend)
  }

  reduce(bank: Bank, to: string): Money {
    const rate = this.currency === 'CHF' && to === 'USD' ? 2 : 1

    return new Money(this.amount / rate, to)
  }

  static dollar(amount: number, currency: string = 'USD') {
    return new Money(amount, currency)
  }

  static franc(amount: number, currency: string = 'CHF') {
    return new Money(amount, currency)
  }
}

class Bank {
  private rates: Map<Pair, number> = new Map()

  reduce(source: Expression, to: string) {
    return source.reduce(this, to)
  }

  rate(from: string, to: string): number {
    if (from === to) return 1

    const rate = Number(this.rates.get(new Pair(from, to)))

    return rate
  }

  addRate(from: string, to: string, rate: number) {
    this.rates.set(new Pair(from, to), rate)
  }
}

class Sum implements Expression {
  augend: Money
  addend: Money

  constructor(augend: Money, addend: Money) {
    this.augend = augend
    this.addend = addend
  }

  reduce(bank: Bank, to: string): Money {
    const amount: number = this.augend.amount + this.addend.amount
    return new Money(amount, to)
  }
}

class Pair {
  private from: string
  private to: string

  constructor(from: string, to: string) {
    this.from = from
    this.to = to
  }

  equals(object: any): boolean {
    const pair: Pair = object as Pair

    return this.from === pair.from && this.to === pair.to
  }

  hashCode(): number {
    return 0
  }
}

describe('test', () => {
  test('Currency ', () => {
    expect('USD').toEqual(Money.dollar(1).getCurrency())
    expect('CHF').toEqual(Money.franc(1).getCurrency())
  })

  test('Multiplication', () => {
    const five = Money.dollar(5)

    expect(Money.dollar(10)).toEqual(five.times(2))
    expect(Money.dollar(15)).toEqual(five.times(3))
  })

  test('Equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()

    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy()
  })

  test('Simple Additional', () => {
    const five: Money = Money.dollar(5)
    const sum: Expression = five.plus(five)

    const bank: Bank = new Bank()

    const reduced: Money = bank.reduce(sum, 'USD')

    expect(Money.dollar(10)).toEqual(reduced)
  })

  test('PlusReturnSum', () => {
    const five: Money = Money.dollar(5)
    const result: Expression = five.plus(five)
    const sum: Sum = result as Sum
    expect(five).toEqual(sum.augend)
    expect(five).toEqual(sum.addend)
  })

  test('ReduceSum', () => {
    const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4))
    const bank: Bank = new Bank()

    const result: Money = bank.reduce(sum, 'USD')
    expect(Money.dollar(7)).toEqual(result)
  })

  test('ReduceMoney', () => {
    const bank: Bank = new Bank()
    const result: Money = bank.reduce(Money.franc(2), 'USD')

    expect(Money.dollar(1)).toEqual(result)
  })

  test('ReduceMoneyDifferentCurrency', () => {
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)

    const result: Money = bank.reduce(Money.franc(2), 'USD')
    expect(Money.dollar(1)).toEqual(result)
  })

  test('IdentityRate', () => {
    expect(new Bank().rate('USD', 'USD')).toEqual(1)
  })
})
