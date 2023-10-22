/**
 * TEST LIST
 *
 * $5 + 10CHF = $10(환율이 2:1일 경우)
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

interface Expression {}

class Money implements Expression {
  protected amount: number
  protected currency: string

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
    return new Money(this.amount + this.amount, this.currency)
  }

  static dollar(amount: number, currency: string = 'USD') {
    return new Money(amount, currency)
  }

  static franc(amount: number, currency: string = 'CHF') {
    return new Money(amount, currency)
  }
}

class Bank {
  reduced(source: Expression, to: string): Money {
    return Money.dollar(10)
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
    const five = Money.dollar(5)
    const sum: Expression = five.plus(five)

    const bank: Bank = new Bank()

    const reduced: Money = bank.reduced(sum, 'USD')

    expect(Money.dollar(10)).toEqual(reduced)
  })
})
