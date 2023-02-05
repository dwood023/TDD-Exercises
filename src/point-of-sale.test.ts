type Barcode = string;
type Price = number;
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

const inventory: Record<Barcode, Price> = {
  "12345": 7.25,
  "23456": 12.5,
};

const format = (price: Price): string =>
  `$${Math.floor(price)}.${price.toString().split(".")[1].padEnd(2, "0")}`;

const scan = (barcode: Barcode): Result<Price> => {
  if (barcode === "")
    return { ok: false, error: new Error("Error: empty barcode") };
  if (inventory[barcode]) return { ok: true, value: inventory[barcode] };
  return { ok: false, error: new Error("Error: barcode not found") };
};

const total = (barcodes: Barcode[]): Result<Price> =>
  barcodes.reduce(
    (acc, barcode) => {
      if ("error" in acc) return acc; // Already encountered error, just pass it on
      const result = scan(barcode);
      if ("error" in result) return result;
      return { ok: true, value: acc.value + result.value };
    },
    { ok: true, value: 0 }
  );

describe("Point of sale", () => {
  describe("Price formatting", () => {
    it("Formats prices in $X.Y format", () => {
      expect(format(7.25)).toBe("$7.25");
      expect(format(12.5)).toBe("$12.50");
    });
  });

  describe("Barcode scanning", () => {
    it.each([
      { barcode: "12345", price: "$7.25" },
      { barcode: "23456", price: "$12.50" },
    ])("Displays $price for barcode $barcode", ({ barcode, price }) => {
      const result = scan(barcode);

      expect(result.ok).toBe(true);

      if (result.ok) expect(format(result.value)).toBe(price);
    });

    it('Displays "barcode not found" for barcodes missing from inventory', () => {
      const result = scan("99999");
      expect(result.ok).toBe(false);
    });

    it('Displays "empty barcode" for empty barcodes', () => {
      const result = scan("");
      expect(result.ok).toBe(false);
      if ("error" in result)
        expect(result.error.message).toBe("Error: empty barcode");
    });
  });

  describe("Totalling", () => {
    it("Totals multiple items", () => {
      const result = total(["12345", "23456"]);
      expect(result.ok).toBe(true);
      if (result.ok) expect(result.value).toBe(7.25 + 12.5);
    });
  });
});
