/**
 * TEST LIST
 *
 * $5 + 10CHF = $10(환율이 2:1일 경우)
 * ✅ $5 * 2 = $10
 * amount를 private으로 만들기
 * Dollar 부작용(side effect)?
 * Money 반올림?
 */

export {};

class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier);
  }
}

describe("test", () => {
  it("testMultiplication", () => {
    const five: Dollar = new Dollar(5);
    let product: Dollar = five.times(2);

    expect(product.amount).toBe(10);

    product = five.times(3);
    expect(product.amount).toBe(15);
  });
});
