const fizz_buzz = (number: number) => {
  let output: null | number | string = null;
  if (number % 3 === 0) output = "Fizz";
  if (number % 5 === 0) output = (output ?? "") + "Buzz";
  return output ?? number;
};

describe("FizzBuzz", () => {
  it("Fizzes for inputs divisible by 3", () => {
    expect(fizz_buzz(6)).toBe("Fizz");
  });

  it("Buzzes for inputs divisible by 5", () => {
    expect(fizz_buzz(5)).toBe("Buzz");
  });

  it("FizzBuzzes for inputs divisible by 3 and 5", () => {
    expect(fizz_buzz(30)).toBe("FizzBuzz");
  });

  it("Returns the input if divisible by neither 3 or 5", () => {
    expect(fizz_buzz(2)).toBe(2);
  });
});
