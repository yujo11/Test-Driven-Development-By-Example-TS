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
 * Franc Multiplication Test를 를 지워야 할까?
 *
 */

export {}

abstract class Money {
  protected amount: number
  protected currency: string

  constructor(amount: number, currency: string) {
    this.amount = amount
    this.currency = currency
  }

  equals(object: Money): boolean {
    return this.amount === object.amount
  }

  static dollar(amount: number) {
    return new Dollar(amount, 'USD')
  }

  static franc(amount: number) {
    return new Franc(amount, 'CHF')
  }

  abstract times(multiplier: number): Money

  abstract getCurrency(): string
}

class Dollar extends Money {
  constructor(amount: number, currency: string) {
    super(amount, 'USD')
    this.amount = amount
    this.currency = currency
  }

  times(multiplier: number) {
    return Money.dollar(this.amount * multiplier)
  }

  getCurrency() {
    return this.currency
  }
}

class Franc extends Money {
  constructor(amount: number, currency: string) {
    super(amount, 'CHF')
    this.amount = amount
    this.currency = currency
  }

  times(multiplier: number) {
    return Money.franc(this.amount * multiplier)
  }

  getCurrency() {
    return this.currency
  }
}

describe('test', () => {
  test('Currency ', () => {
    expect('USD').toEqual(Money.dollar(1).getCurrency())
    expect('CHF').toEqual(Money.franc(1).getCurrency())
  })

  test('Dollar Multiplication', () => {
    const five = Money.dollar(5)

    expect(Money.dollar(10)).toEqual(five.times(2))
    expect(Money.dollar(15)).toEqual(five.times(3))
  })

  test('Franc Multiplication', () => {
    const five: Franc = Money.franc(5)

    expect(Money.franc(10)).toEqual(five.times(2))
    expect(Money.franc(15)).toEqual(five.times(3))
  })

  test('Equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()

    expect(Money.franc(5).equals(Money.franc(5))).toBeTruthy()
    expect(Money.franc(5).equals(Money.franc(6))).toBeFalsy()

    expect(Money.franc(5).equals(Money.dollar(5))).toBeTruthy()
  })
})
