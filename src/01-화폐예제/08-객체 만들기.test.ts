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
 * 통화?
 * Franc Multiplication Test를 를 지워야 할까?
 *
 */

export {}

abstract class Money {
  protected amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  equals(object: Money): boolean {
    return this.amount === object.amount
  }

  static dollar(amount: number) {
    return new Dollar(amount)
  }

  static franc(amount: number) {
    return new Franc(amount)
  }

  abstract times(multiplier: number): Money
}

class Dollar extends Money {
  constructor(amount: number) {
    super(amount)
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
}

class Franc extends Money {
  constructor(amount: number) {
    super(amount)
  }

  times(multiplier: number) {
    return new Franc(this.amount * multiplier)
  }
}

describe('test', () => {
  test('Dollar Multiplication', () => {
    const five = Money.dollar(5)

    expect(new Dollar(10)).toEqual(five.times(2))
    expect(new Dollar(15)).toEqual(five.times(3))
  })

  test('Franc Multiplication', () => {
    const five: Franc = new Franc(5)

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
