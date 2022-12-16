import { faker } from "@faker-js/faker";

const FAKER_SEED = 1; // Any positive number, ensures consistent mocks.
faker.seed(FAKER_SEED);

const EARLIEST_DATE = new Date("2020-11-11");
const LATEST_DATE = new Date();
const BUILDER_UUID = faker.datatype.uuid();
const SOURCE_IDS = Array.from({ length: 5 }).map(createMockSourceId);

function createMockSourceId() {
  const id = faker.random.alpha({
    count: 16,
    casing: "upper",
    bannedChars: [],
  });
  return `#${id}`;
}

type PatientEntry = fhir4.BundleEntry<fhir4.Patient>;

export function createMockPatientBundle(
  entries: PatientEntry[],
  pageCount: number,
  pageOffset: number,
  total: number
): fhir4.Bundle<fhir4.Patient> {
  return {
    total,
    entry: entries,
    resourceType: "Bundle",
    id: faker.datatype.uuid(),
    meta: {
      lastUpdated: faker.date.past().toISOString(),
    },
    type: "searchset",
    link: [
      {
        relation: "self",
        url: `https://api.storybook.zusapi.com/fhir/Patient?_count=${pageCount}&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7Cbuilder%2F${BUILDER_UUID}&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&_total=accurate`,
      },
      {
        relation: "next",
        url: `https://api.storybook.zusapi.com/fhir/Patient?_count=${pageCount}&_offset=${pageOffset}&_tag=https%3A%2F%2Fzusapi.com%2Faccesscontrol%2Fowner%7Cbuilder%2F${BUILDER_UUID}&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fsummary%7CCommon&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Ffhir%2Ftag%2Fupi-record-type%7Cuniversal&_total=accurate`,
      },
    ],
  };
}

export function createMockPatientBundleEntry(): fhir4.BundleEntry<fhir4.Patient> {
  const resourceId = faker.datatype.uuid();
  const upid = faker.datatype.uuid();
  const created = faker.date.between(EARLIEST_DATE, LATEST_DATE);
  const updated = faker.date.between(created, LATEST_DATE);
  return {
    fullUrl: `https://api.storybook.zusapi.com/fhir/Patient/${resourceId}`,
    resource: {
      resourceType: "Patient",
      id: resourceId,
      meta: {
        versionId: "5",
        lastUpdated: updated.toISOString(),
        source: faker.helpers.arrayElement(SOURCE_IDS),
        tag: [
          {
            system: "https://zusapi.com/accesscontrol/owner",
            code: `builder/${BUILDER_UUID}`,
          },
        ],
      },
      identifier: [
        {
          system: "https://zusapi.com/fhir/identifier/universal-id",
          value: upid,
        },
      ],
      name: [
        {
          use: "official",
          family: faker.name.lastName(),
          given: [faker.name.firstName()],
          prefix: [faker.name.prefix()],
        },
      ],
      telecom: [
        {
          system: "phone",
          value: faker.phone.number(
            faker.helpers.arrayElement([
              "!# 555 ####!",
              "!1-555-####!",
              "!555-####!",
            ])
          ),
          use: faker.helpers.arrayElement(["home", "work", "mobile"]),
        },
      ],
      gender: faker.helpers.arrayElement([
        "female",
        "male",
        "female",
        "other",
        "unknown",
      ]),
      birthDate: faker.date.birthdate().toISOString(),
    },
    search: {
      mode: "match",
    },
  };
}
