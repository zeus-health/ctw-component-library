import fhir4 from "fhir/r4";
import {
  faker,
  fakerCreateUid,
  fakerFakeBundleLinks,
  fakerFakeMockSourceId,
} from "@/components/content/story-helpers/faker";
import {
  FAKE_UNIVERSAL_ID_EXTENSION,
  LENS_BUILDER_TAG,
} from "@/components/content/story-helpers/ids";

const LATEST_DATE = new Date();
const PATIENT = {
  reference: `Patient/${faker.datatype.uuid()}`,
  type: "Patient",
  display: faker.name.fullName(),
};

const observations = [
  { display: "4.4 g/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "109 U/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "25 U/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "25 U/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "0.3 mg/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "18 mg/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "9.7 mg/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "109 mmol/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "25.8 meq/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "Mucho 60", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "1.03 mg/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "7.2 mmol/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "163 mg/dL", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "3.5 mmol/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "142 mmol/L", reference: `Observation/${faker.datatype.uuid()}` },
  { display: "7.9 g/dL", reference: `Observation/${faker.datatype.uuid()}` },
];

export const createDiagnosticReportsBundle = () => ({
  resourceType: "Bundle",
  id: "diagnostic-report-bundle-1",
  meta: {
    lastUpdated: LATEST_DATE.toISOString(),
  },
  type: "searchset",
  link: fakerFakeBundleLinks("DiagnosticReport", {
    "_tag:not": [
      "https://zusapi.com/lens/ActiveMedications",
      "https://zusapi.com/lens/ChronicConditions",
      "https://zusapi.com/summary/Common",
      "https://zusapi.com/fhir%2Ftag%2Fupi-record-type%7Cuniversal",
    ],
    "patient.identifier": "https://zusapi.com/fhir/identifier/universal-id|u12345",
  }),
  entry: [
    createMockDiagnosticReportBundleEntry({
      status: "preliminary",
      result: undefined,
      code: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
            code: "NI",
          },
        ],
      },
    }),
    createMockDiagnosticReportBundleEntry({
      performer: [{ display: "Pharma John | Digital Labs", type: "Organization" }],
    }),
    ...getObservationsForBundle(),
  ],
});

function createMockDiagnosticReportBundleEntry(
  partialResource: Partial<fhir4.DiagnosticReport>
): fhir4.BundleEntry<fhir4.DiagnosticReport> {
  const resourceId = faker.datatype.uuid();
  const created = faker.date.recent(10).toISOString();
  return {
    search: {
      mode: "match",
    },
    fullUrl: `https://api.storybook.zusapi.com/fhir/DiagnosticReport/${resourceId}`,
    id: faker.datatype.uuid(),
    resource: {
      id: faker.datatype.uuid(),
      resourceType: "DiagnosticReport",
      meta: {
        extension: [
          {
            url: "https://zusapi.com/data-acquisition/extension/id",
            valueString: faker.datatype.uuid(),
          },
          {
            url: "https://zusapi.com/created-at",
            valueInstant: created,
          },
        ],
        versionId: "1",
        lastUpdated: created,
        source: fakerFakeMockSourceId(),
        tag: [
          {
            system: "https://zusapi.com/thirdparty/source",
            code: "commonwell",
          },
          LENS_BUILDER_TAG,
        ],
      },
      extension: [FAKE_UNIVERSAL_ID_EXTENSION],
      identifier: [
        {
          use: "usual",
          system: fakerCreateUid(),
          value: "L17165719_CHEM20",
        },
      ],
      status: "final",
      code: {
        coding: [
          {
            display: "COMPREHENSIVE METABOLIC PANEL",
          },
        ],
        text: "COMPREHENSIVE METABOLIC PANEL",
      },
      subject: PATIENT,
      effectivePeriod: {
        start: created,
        end: created,
      },
      result: observations.map((observation) => ({
        ...observation,
        type: "Observation",
      })),
      ...partialResource,
    },
  };
}

function getObservationsForBundle() {
  return observations.map((observation): fhir4.BundleEntry<fhir4.Observation> => {
    const value = faker.datatype.float({
      min: 1.0,
      max: 16.5,
      precision: 0.1,
    });
    const interpretationText = value > 10 ? "(Normal)" : "(High)";
    const interpretation = {
      coding: [
        {
          system: "urn:oid:2.16.840.1.113883.5.83",
          code: value > 10 ? "H" : "N",
          display: value > 10 ? "(Normal)" : "(High)",
        },
      ],
      text: interpretationText,
    };
    const code = faker.helpers.arrayElement([
      {
        system: "http://loinc.org",
        code: "1751-7",
        display: "ALBUMIN",
      },
      {
        system: "http://loinc.org",
        code: "2823-3",
        display: "POTASSIUM",
      },
      {
        system: "http://loinc.org",
        code: "2345-7",
        display: "GLUCOSE",
      },
      {
        system: "http://loinc.org",
        code: "33037-3",
        display: "ANION GAP",
      },
      {
        system: "http://loinc.org",
        code: "2160-0",
        display: "CREATININE",
      },
      {
        system: "http://loinc.org",
        code: "33914-3",
        display: "CREATININE ESTIMATED GFR",
      },
      {
        system: "http://loinc.org",
        code: "2028-9",
        display: "CARBON DIOXIDE",
      },
      {
        system: "http://loinc.org",
        code: "2075-0",
        display: "CHLORIDE",
      },
      {
        system: "http://loinc.org",
        code: "17861-6",
        display: "CALCIUM",
      },
    ]);

    return {
      search: {
        mode: "include",
      },
      fullUrl: "",
      resource: {
        resourceType: "Observation",
        id: observation.reference.split("/")[1],
        meta: {
          extension: [
            {
              url: "https://zusapi.com/data-acquisition/extension/id",
              valueString: faker.datatype.uuid(),
            },
            {
              url: "https://zusapi.com/created-at",
              valueInstant: "2023-03-07T14:32:09.402+00:00",
            },
          ],
          versionId: "1",
          lastUpdated: "2023-03-07T14:32:09.402+00:00",
          source: fakerFakeMockSourceId(),
          tag: [
            {
              system: "https://zusapi.com/thirdparty/source",
              code: "commonwell",
            },
            LENS_BUILDER_TAG,
          ],
        },
        extension: [FAKE_UNIVERSAL_ID_EXTENSION],
        identifier: [
          {
            use: "usual",
            system: "urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",
            value: "ALB_L17165719_CHEM20_1",
          },
        ],
        status: "final",
        code: {
          coding: [code],
          // sometimes we will not get a code text here
          text: Math.random() > 0.8 ? undefined : code.display,
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "laboratory",
                display: "Laboratory",
              },
            ],
            text: "Laboratory",
          },
        ],
        subject: PATIENT,
        effectiveDateTime: "2023-03-07T14:32:09.402+00:00",
        valueQuantity: {
          value,
          unit: "g/dL",
        },
        interpretation: [interpretation],
        note: [
          {
            text: `${faker.lorem.sentence(
              7
            )} FAKE:FAKE ${value} g/dL (${interpretationText})Range: 1.0 g/dL - 10.0 g/dL`,
          },
        ],
        referenceRange: [
          {
            low: {
              value: 1.0,
              unit: "g/dL",
            },
            high: {
              value: 10.0,
              unit: "g/dL",
            },
          },
        ],
      },
    };
  });
}
