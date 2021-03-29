import { dataSample } from "../../src";

describe("datasample", () => {
  test("movies", () => {
    const { data, info } = dataSample('movies');
    expect(Object.keys(data[0])).toEqual(info.fieldNames);
  });
});
