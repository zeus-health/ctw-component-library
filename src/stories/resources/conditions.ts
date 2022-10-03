import { ConditionModel } from "@/models/conditions";

// Attention deficit
export const Condition1: fhir4.Condition = {
  resourceType: "Condition",
  id: "3ffc83c4-e136-491b-b3e2-08b8d56df9a9",
  meta: {
    versionId: "1",
    lastUpdated: "2022-09-07T02:35:20.165+00:00",
    source: "#t49IJMG4GV8ROTEc",
    tag: [
      {
        system: "https://zusapi.com/accesscontrol/owner",
        code: "builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",
        display: "CTW Health",
      },
      {
        system: "https://zusapi.com/lens",
        code: "ChronicConditions",
      },
      {
        system: "https://zusapi.com/lens/upid",
        code: "2f0d1b24-b012-403f-b24c-8bf741484783",
      },
    ],
  },
  extension: [
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/968727f5-3425-46c4-a27e-9f09eb51ca97",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/fdeef13a-c168-4832-9274-4815c7255877",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/e0028989-d2e9-4ee1-833c-0bebd714184f",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/06a18603-0a9b-4cdc-8530-eb79b8ab80e6",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/a1d691af-b62f-4882-955a-c357bc83394d",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/a1d691af-b62f-4882-955a-c357bc83394d",
        type: "Condition",
      },
    },
  ],
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  code: {
    coding: [
      {
        system: "http://hl7.org/fhir/sid/icd-10",
        code: "F900",
        display:
          "Attention-deficit hyperactivity disorder, predominantly inattentive type",
      },
      {
        extension: [
          {
            url: "https://zusapi.com/terminology/enrichment",
            valueString: "Unknown HCC",
          },
        ],
        system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
        code: "UNK",
        display: "unknown",
        userSelected: false,
      },
    ],
    text: "Attention-deficit hyperactivity disorder, predominantly inattentive type",
  },
  subject: {
    reference: "Patient/f7b4cb9d-824f-498a-994d-7b3b85d8ef29",
    type: "Patient",
  },
};

// Knee pain
export const Condition2: fhir4.Condition = {
  resourceType: "Condition",
  id: "dc3f47b0-9b80-4c1c-80e1-1ab0ea7df66e",
  meta: {
    versionId: "1",
    lastUpdated: "2022-09-08T19:22:46.511+00:00",
    source: "#ZgLQod6hYHck9zPc",
    tag: [
      {
        system: "https://zusapi.com/accesscontrol/owner",
        code: "builder/c768d16f-571f-4d21-89da-af19478ef570",
      },
      {
        system: "https://zusapi.com/lens",
        code: "ChronicConditions",
      },
      {
        system: "https://zusapi.com/lens/upid",
        code: "73f98c4e-1b5c-4b6a-99ec-0fda2b72e512",
      },
    ],
  },
  extension: [
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/0dd45ccf-e24e-49c4-bbad-2df5846e398e",
        type: "Condition",
      },
    },
    {
      url: "http://zusapi.com/lens/aggregated-from",
      valueReference: {
        reference: "Condition/0dd45ccf-e24e-49c4-bbad-2df5846e398e",
        type: "Condition",
      },
    },
  ],
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  code: {
    coding: [
      {
        system: "http://hl7.org/fhir/sid/icd-10",
        code: "M25.562",
        display: "Pain in left knee",
      },
      {
        extension: [
          {
            url: "https://zusapi.com/terminology/enrichment",
            valueString: "CCI",
          },
        ],
        system:
          "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
        code: "A",
        display: "Acute",
        userSelected: false,
      },
      {
        extension: [
          {
            url: "https://zusapi.com/terminology/enrichment",
            valueString: "Unknown HCC",
          },
        ],
        system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
        code: "UNK",
        display: "unknown",
        userSelected: false,
      },
    ],
    text: "Pain in left knee",
  },
  subject: {
    reference: "Patient/f7f4fa57-1890-44cd-b375-e7980ca0d7dc",
    type: "Patient",
  },
};

// No display
export const ConditionUnconfirmed1: fhir4.Condition = {
  resourceType: "Condition",
  id: "a585519f-3f56-40d1-b144-15f14b85402f",
  meta: {
    versionId: "2",
    lastUpdated: "2022-01-27T04:23:41.399+00:00",
    source: "#efvzTWTe6l0roLo6",
    tag: [
      {
        system: "https://zusapi.com/accesscontrol",
        code: "builder/c768d16f-571f-4d21-89da-af19478ef570:owner",
      },
      {
        system: "https://zusapi.com/accesscontrol/owner",
        code: "builder/c768d16f-571f-4d21-89da-af19478ef570",
      },
    ],
  },
  identifier: [
    {
      use: "usual",
      system: "urn:ietf:rfc:3986",
      value: "urn:oid:189E6E20-D11A-434B-A11B-3AA27F9771E4",
    },
    {
      use: "secondary",
      system: "urn:ietf:rfc:3986",
      value: "urn:oid:9A08DFFB-3879-4DF4-8FE0-507BC49EF93C",
    },
  ],
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
        display: "Active",
      },
    ],
    text: "Inactive",
  },
  category: [
    {
      coding: [
        {
          code: "NI",
        },
      ],
    },
  ],
  subject: {
    reference: "Patient/94070c25-39ba-4b54-bd78-bdb65ff97bbe",
    type: "Patient",
  },
};

// Cholera
export const ConditionUnconfirmed2: fhir4.Condition = {
  resourceType: "Condition",
  id: "45982af4-4265-4359-a23b-c1d96d72c077",
  meta: {
    extension: [
      {
        url: "https://zusapi.com/terminology/enrichment/sha256sum",
        valueBase64Binary: "4rHunucCzo00jdyi/LantwBEgyt55oEAqkYBJXl5h6E=",
      },
    ],
    versionId: "3",
    lastUpdated: "2022-09-08T19:22:44.515+00:00",
    source: "#xA2o3amrQIvWEneb",
    tag: [
      {
        system: "https://zusapi.com/accesscontrol/owner",
        code: "builder/c768d16f-571f-4d21-89da-af19478ef570",
      },
    ],
  },
  clinicalStatus: {
    coding: [
      {
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active",
      },
    ],
  },
  code: {
    coding: [
      {
        system: "http://hl7.org/fhir/sid/icd-10",
        code: "A00.0",
        display: "Cholera due to Vibrio cholerae 01, biovar cholerae",
      },
      {
        extension: [
          {
            url: "https://zusapi.com/terminology/enrichment",
            valueString: "CCI",
          },
        ],
        system:
          "http://www.hcup-us.ahrq.gov/toolssoftware/chronic_icd10/chronic_icd10.jsp",
        code: "A",
        display: "Acute",
        userSelected: false,
      },
      {
        extension: [
          {
            url: "https://zusapi.com/terminology/enrichment",
            valueString: "Unknown HCC",
          },
        ],
        system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
        code: "UNK",
        display: "unknown",
        userSelected: false,
      },
    ],
    text: "Cholera due to Vibrio cholerae 01, biovar cholerae",
  },
  subject: {
    reference: "Patient/625ef612-b803-459a-aa81-d28fbb1a4970",
    type: "Patient",
  },
  asserter: {
    reference: "Practitioner/0140846a-767f-4768-908a-b19ba21a0fce",
    type: "Practitioner",
  },
  note: [
    {
      text: "Prescriber/Prescriber Supplied - The diagnosis was given or supplied by the prescriber.",
    },
  ],
};

export const ConditionRecords: ConditionModel[] = [
  new ConditionModel(Condition1),
  new ConditionModel(Condition2),
  new ConditionModel(ConditionUnconfirmed1),
  new ConditionModel(ConditionUnconfirmed2),
];
