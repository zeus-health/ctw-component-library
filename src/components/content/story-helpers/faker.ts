import { faker as fakerNamespace } from "@faker-js/faker";

// To import, export and use faker in this file, we had to first rename the
// faker import to "fakerNamespace" and then export a const named "faker"
export const faker = fakerNamespace;

faker.seed(1); // Any positive number should ensure consistent mocks
export const FAKER_BUILDER_UUID = faker.datatype.uuid();

export const fakerCreateUid = () =>
  faker.helpers.replaceSymbolWithNumber(
    "urn:oid:#.##.###.#.######.#.####.#.#.####.#.#.##"
  );

export function fakerFakeMockSourceId() {
  const id = faker.random.alpha({
    count: 16,
    casing: "upper",
    bannedChars: [],
  });
  return `#${id}`;
}

export function fakerFakeBundleLinks(
  resourceType: string,
  extend = {},
  pageCount = 250
) {
  const queryParams = {
    _count: pageCount,
    ...extend,
  };
  const query = new URLSearchParams();
  Object.entries(queryParams).forEach(([name, value]) => {
    query.set(name, `${value}`);
  });

  const queryNext = new URLSearchParams(query);
  queryNext.set("_offset", `${pageCount}`);

  return [
    {
      relation: "self",
      url: `https://api.sandbox.zusapi.com/fhir/${resourceType}?${query}`,
    },
    {
      relation: "next",
      url: `https://api.sandbox.zusapi.com/fhir/${resourceType}?${queryNext}`,
    },
  ];
}
