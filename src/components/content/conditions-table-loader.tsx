import { ConditionModel } from "@/models/conditions";
import { useCTW } from "../core/ctw-provider";
import { ConditionsTable } from "./conditions-table";

const condition1: fhir4.Condition = {
  resourceType: "Condition",
  id: "111",
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/condition-category",
          code: "encounter-diagnosis",
          display: "Encounter Diagnosis",
        },
        {
          system: "http://snomed.info/sct",
          code: "439401001",
          display: "Diagnosis",
        },
      ],
    },
  ],
  code: {
    coding: [
      {
        system: "http://hl7.org/fhir/sid/icd-10",
        code: "T20.31",
        display: "Burn of third degree of ear",
      },
      {
        system: "http://snomed.info/sct",
        code: "39065001",
        display: "Burn of ear",
      },
    ],
    text: "Burnt Ear",
  },
  bodySite: [
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "49521004",
          display: "Left external ear structure",
        },
      ],
      text: "Left Ear",
    },
  ],
  onsetDateTime: "2022-02-04",
  recordedDate: "2022-02-04",
  recorder: {
    reference: "Practitioner/9f319348-00f7-4563-870e-358569e64d33",
    type: "Practitioner",
    display: "Carlos Mendoza",
  },
  asserter: {
    reference: "Practitioner/9f319348-00f7-4563-870e-358569e64d33",
    type: "Practitioner",
    display: "Carlos Mendoza",
  },
  stage: [
    {
      summary: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "273533008",
            display: "ISS - Injury severity score",
          },
        ],
        text: "ISS - Injury severity score",
      },
      type: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "273848006",
            display: "Stycar hearing test",
          },
        ],
        text: "Stycar hearing test",
      },
    },
  ],
  evidence: [
    {
      code: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "404684003",
              display: "Clinical finding",
            },
          ],
          text: "Clinical finding",
        },
      ],
    },
  ],
  subject: { reference: "12345" },
};

const condition2: fhir4.Condition = {
  resourceType: "Condition",
  id: "222",
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  category: [
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "439401001",
          display: "Diagnosis",
        },
      ],
    },
  ],
  code: {
    coding: [
      {
        system: "http://hl7.org/fhir/sid/icd-10",
        code: "F411",
        display: "Generalized anxiety disorder",
      },
    ],
    text: "Generalized anxiety disorder",
  },
  onsetDateTime: "2022-01-13",
  recordedDate: "2022-01-15",
  recorder: {
    display: "Carlos Mendoza",
  },
  subject: { reference: "12345" },
};

const conditions: ConditionModel[] = [
  new ConditionModel(condition1),
  new ConditionModel(condition2),
];

export function ConditionsTableLoader() {
  const { url, bearerToken } = useCTW();
  console.log("foo", url, bearerToken);
  return <ConditionsTable conditions={conditions} />;
}
