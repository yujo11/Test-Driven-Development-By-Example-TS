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
 *
 */

export {}

class Money {
  protected amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  equals(object: Money): boolean {
    return this.amount === object.amount
  }
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
    const five: Dollar = new Dollar(5)

    expect(new Dollar(10)).toStrictEqual(five.times(2))
    expect(new Dollar(15)).toStrictEqual(five.times(3))
  })

  test('Franc Multiplication', () => {
    const five: Franc = new Franc(5)

    expect(new Franc(10)).toStrictEqual(five.times(2))
    expect(new Franc(15)).toStrictEqual(five.times(3))
  })

  test('Equality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy()
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy()

    expect(new Franc(5).equals(new Franc(5))).toBeTruthy()
    expect(new Franc(5).equals(new Franc(6))).toBeFalsy()

    expect(new Franc(5).equals(new Dollar(5))).toBeTruthy()
  })
})
