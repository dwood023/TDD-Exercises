const cities = [
  "Paris" as const,
  "Budapest" as const,
  "Skopje" as const,
  "Rotterdam" as const,
  "Valencia" as const,
  "Vancouver" as const,
  "Amsterdam" as const,
  "Vienna" as const,
  "Sydney" as const,
  "New York City" as const,
  "London" as const,
  "Bangkok" as const,
  "Hong Kong" as const,
  "Dubai" as const,
  "Rome" as const,
  "Istanbul" as const,
];
type City = typeof cities[number];

const search = (query: string): City[] => {
  // If the search text is fewer than 2 characters, then should return no results. (It is an optimization feature of the search functionality.)
  if (query.length < 2) return [];

  // If the search text is a “*” (asterisk), then it should return all the city names.
  if (query === "*") return cities;

  return cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );
};

describe("Search", () => {
  it.each(["", cities[0].slice(0, 1)])(
    "Returns no results for queries shorter than 2 characters",
    (query) => {
      const result = search(query);
      expect(result).toEqual([]);
    }
  );

  it("Should return results starting with the exact search text", () => {
    const query = "Va";
    const result = search(query);
    expect(result).toEqual(["Valencia", "Vancouver"]);
  });

  it("Should return results including the query at any location", () => {
    const query = "ape";
    const result = search(query);
    expect(result).toEqual(["Budapest"]);
  });

  it("Should be case insensitive", () => {
    const query = "va";
    const result = search(query);
    expect(result).toEqual(["Valencia", "Vancouver"]);
  });
});

