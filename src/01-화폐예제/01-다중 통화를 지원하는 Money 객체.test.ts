/**
 * TEST LIST
 *
 * $5 + 10CHF = $10(환율이 2:1일 경우)
 * ✅ $5 * 2 = $10
 * amount를 private으로 만들기
 * Dollar 부작용(side effect)?
 * Money 반올림?
 */

class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number) {
    this.amount = this.amount * multiplier;
  }
}

describe("test", () => {
  it("testMultiplication", () => {
    const five: Dollar = new Dollar(5);

    five.times(2);

    expect(five.amount).toBe(10);
  });
});
