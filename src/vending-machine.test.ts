const coins = [200, 100, 50, 20, 10, 5, 2, 1] as const;
type Coin = typeof coins[number];

const get_change = (amount_owed: number, amount_paid: number): Coin[] => {
  const credit = amount_paid - amount_owed;

  if (credit < 0)
    throw new Error(
      `Insufficient amount paid. ${amount_owed} was owed, but only ${amount_paid} was paid`
    );

  let remaining = credit;
  const change: Coin[] = [];

  for (const coin of coins) {
    while (remaining >= coin) {
      remaining -= coin;
      change.push(coin);
    }
  }

  return change;
};

describe("Vending Machine", () => {
  describe("Calculation of change", () => {
    it.each([
      {
        owed: 200,
        paid: 300,
        expected_change: [100],
      },
      {
        owed: 200,
        paid: 310,
        expected_change: [100, 10],
      },
      {
        owed: 100,
        paid: 500,
        expected_change: [200, 200],
      },
      {
        owed: 100,
        paid: 525,
        expected_change: [200, 200, 20, 5],
      },
    ])(
      "Should return $expected_change, paying $paid for $owed",
      ({ owed, paid, expected_change }) => {
        expect(get_change(owed, paid)).toEqual(expected_change);
      }
    );

    it("Should throw if amount paid is less than owed", () => {
      const amount_owed = 300;
      const amount_paid = 200;

      expect(() => get_change(amount_owed, amount_paid)).toThrow();
    });
  });
});
