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
 * Dollar/Franc 중복
 * 공용 equals
 * 공용 times
 *
 */

export {}

class Dollar {
  private amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }

  equals(object: Dollar) {
    return this.amount === object.amount
  }
}

class Franc {
  private amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  times(multiplier: number) {
    return new Franc(this.amount * multiplier)
  }

  equals(object: Franc) {
    return this.amount === object.amount
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
  })
})
