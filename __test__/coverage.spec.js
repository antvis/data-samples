const { removeItemFromArr, getAllCombine } = require("../scripts/utils");

describe("remove item from array", () => {
  expect(removeItemFromArr([1, 2, 3], 1)).toMatchObject([2, 3]);
  expect(removeItemFromArr([1, 2, 3], 10)).toMatchObject([1, 2, 3]);
});

describe("combine data pres", () => {
  it("single", () => {
    expect(getAllCombine([[["a"]]])).toEqual(["a"]);
  });

  it("double", () => {
    expect(
      getAllCombine([
        ["a", "b"],
        ["c", "d"],
      ]).sort()
    ).toEqual(["a*c", "a*d", "b*c", "b*d"].sort());
  });

  it("sort", () => {
    expect(
      getAllCombine([
        ["b", "a"],
        ["c", "d"],
      ]).sort()
    ).toEqual(["a*c", "a*d", "b*c", "b*d"].sort());
  });

  it("contain null", () => {
    expect(
      getAllCombine([
        ["a", "b"],
        ["c", "d"],
        [null, "e"],
      ]).sort()
    ).toEqual(
      ["a*c", "a*d", "b*c", "b*d", "a*c*e", "a*d*e", "b*c*e", "b*d*e"].sort()
    );
  });
});

