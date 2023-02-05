const add = (numbers_string: string): number => {
  if (numbers_string.length === 0) return 0;

  const separator_regex = /,|\n/;

  console.log(numbers_string.split(separator_regex));

  return numbers_string
    .split(separator_regex)
    .map((n) => parseInt(n))
    .reduce((acc, n) => acc + n, 0);
};

describe("String calculator", () => {
  it("Can accept a single number", () => {
    expect(add("1")).toBe(1);
  });

  it("Can sum two numbers, separated by commas", () => {
    expect(add("1,2")).toBe(3);
  });

  it("Can sum two numbers, separated by newlines", () => {
    expect(add("1\n2")).toBe(3);
  });

  it("Throws if input contains trailing separators", () => {
    expect(add("1,2,")).toBe(3);
  });

  it("Can accept an empty string, and return 0", () => {
    expect(add("")).toBe(0);
  });
});
