import {
  IndexSort,
  sortByIndices,
} from "@/components/core/table/table-helpers";

describe("Sort by Indices", () => {
  type Triplet = { one?: string; two?: string; three?: string };
  const noOne: Triplet = { two: "b", three: "c" };
  const noTwo: Triplet = { one: "a", three: "c" };
  const noThree: Triplet = { one: "a", two: "c" };
  const sameOneDiffTwo1: Triplet = { one: "same", two: "a" };
  const sameOneDiffTwo2: Triplet = { one: "same", two: "b" };
  const tests = [noOne, noTwo, noThree, sameOneDiffTwo1, sameOneDiffTwo2];
  const indexSortsAsc: IndexSort<Triplet>[] = [
    { index: "one", dir: "asc" },
    { index: "two", dir: "asc" },
  ];
  const indexSortsDescAsc: IndexSort<Triplet>[] = [
    { index: "one", dir: "desc" },
    { index: "two", dir: "asc" },
  ];
  test("Sort in ascending order.", () => {
    expect(sortByIndices(tests, indexSortsAsc)).toEqual([
      noThree, // [A, B, _]
      noTwo, // [A, _, C]
      sameOneDiffTwo1, // [same, A, _]
      sameOneDiffTwo2, // [same, B, _]
      noOne, // [_, B, C]
    ]);
  });
  test("Sort in descending order, then ascending order.", () => {
    expect(sortByIndices(tests, indexSortsDescAsc)).toEqual([
      sameOneDiffTwo1, // [same, A, _]
      sameOneDiffTwo2, // [same, B, _]
      noThree, // [A, B, _]
      noTwo, // [A, _, C]
      noOne, // [_, B, C]
    ]);
  });
});
