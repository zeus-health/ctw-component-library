import { sortByIndex } from "@/components/core/table/table-helpers";

describe("Sort by Indices", () => {
  type ABC = { a?: string; b?: string; c?: string };
  const testBC: ABC = { b: "b", c: "c" };
  const testAC: ABC = { a: "a", c: "c" };
  const testAB: ABC = { a: "a", b: "c" };
  const testASame1: ABC = { a: "same", b: "a" };
  const testASame2: ABC = { a: "same", b: "b" };
  const tests = [testBC, testAC, testAB, testASame1, testASame2];
  test("Sort in ascending order.", () => {
    expect(sortByIndex(tests, ["a", "b"], "asc")).toEqual([
      testAB,
      testAC,
      testASame1,
      testASame2,
      testBC,
    ]);
  });
  test("Sort in descending order.", () => {
    expect(sortByIndex(tests, ["a", "b"], "desc")).toEqual([
      testAB,
      testAC,
      testASame1,
      testASame2,
      testBC,
    ]);
  });
});
