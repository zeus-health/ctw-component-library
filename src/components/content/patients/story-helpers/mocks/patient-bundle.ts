import {
  faker,
  fakerFakeBundleLinks,
  fakerFakeMockSourceId,
} from "@/components/content/story-helpers/faker";

const EARLIEST_DATE = new Date("2020-11-11");
const LATEST_DATE = new Date();
const BUILDER_UUID = faker.datatype.uuid();
const SOURCE_IDS = Array.from({ length: 5 }).map(fakerFakeMockSourceId);

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
    link: fakerFakeBundleLinks("Patient", {
      _tag: `https://zusapi.com/accesscontrol/owner|builder/${BUILDER_UUID}`,
      "_tag:not": [
        "https://zusapi.com/thirdparty/source|surescripts",
        "https://zusapi.com/thirdparty/source|commonwell",
        "https://zusapi.com/thirdparty/source|elation",
        "https://zusapi.com/lens|ActiveMedications",
        "https://zusapi.com/lens|ChronicConditions",
        "https://zusapi.com/summary|Common",
        "https://zusapi.com/fhir/tag/upi-record-type|universal",
      ],
    }),
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
            faker.helpers.arrayElement(["!# 555 ####!", "!1-555-####!", "!555-####!"])
          ),
          use: faker.helpers.arrayElement(["home", "work", "mobile"]),
        },
      ],
      gender: faker.helpers.arrayElement(["female", "male", "female", "other", "unknown"]),
      birthDate: faker.date.birthdate().toISOString(),
    },
    search: {
      mode: "match",
    },
  };
}
