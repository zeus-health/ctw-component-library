import { TableColumn } from "@/components/core/table/table";
import { ConditionModel } from "@/models/conditions";

export const CONDITION_COLUMNS: TableColumn<ConditionModel>[] = [
  {
    title: "Condition",
    dataIndex: "display",
    className: "ctw-w-[50%]",
  },
  {
    title: "Status",
    dataIndex: "clinicalStatus",
    className: "ctw-w-[20%]",
  },
  {
    title: "Recorded Date",
    dataIndex: "recordedDate",
    className: "ctw-w-[30%]",
  },
];

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

export const CONDITIONS_RESPONSE_HEADER = {
  "access-control-allow-origin": "*",
  "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
  "content-encoding": "gzip",
  "content-type": "application/fhir+json;charset=utf-8",
  date: "Fri, 09 Sep 2022 18:03:06 GMT",
  expires: "0",
  "last-modified": "Fri, 09 Sep 2022 18:03:06 GMT",
  pragma: "no-cache",
  "strict-transport-security": "max-age=31536000 ; includeSubDomains",
  vary: "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-powered-by":
    "Smile CDR 2022.05.R05 FHIR REST Endpoint (R4) (FHIR Server; FHIR 4.0.1/R4; HAPI FHIR 6.0.3)",
  "x-request-id": "jtHitDYMP9EWU4YR",
  "x-xss-protection": "1; mode=block",
};

export const CONDITIONS_BUNDLE_BUILDER = {
  resourceType: "Bundle",
  id: "1b161b89-472c-4d97-9420-31ee353a5183",
  meta: {
    lastUpdated: "2022-09-09T17:45:09.139+00:00",
  },
  type: "searchset",
  link: [
    {
      relation: "self",
      url: "https://api.dev.zusapi.com/fhir/Condition?_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&clinical-status=active%2C%20recurrence%2C%20relapse",
    },
    {
      relation: "next",
      url: "https://api.dev.zusapi.com/fhir/Condition?_count=50&_offset=50&_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&clinical-status=active%2C%20recurrence%2C%20relapse",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/1d96bc58-92d4-44e5-a4b6-7bc611f43627",
      resource: {
        resourceType: "Condition",
        id: "1d96bc58-92d4-44e5-a4b6-7bc611f43627",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:21:43.787+00:00",
          source: "#oveeeCtZ3N5wEV2x",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol",
              code: "builder/ab8f62f9-b03f-4c73-bb68-2efa568f52d0:owner",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/ab8f62f9-b03f-4c73-bb68-2efa568f52d0",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml">Severe burn of left ear (Date: 24-May 2012)</div>',
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis",
              },
              {
                system: "http://loinc.org",
                code: "439401001",
                display: "Diagnosis",
              },
            ],
          },
        ],
        severity: {
          coding: [
            {
              system: "http://loinc.org",
              code: "24484000",
              display: "Severe",
            },
          ],
        },
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "39065001",
              display: "Burn of ear",
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
          text: "Burnt Ear",
        },
        bodySite: [
          {
            coding: [
              {
                system: "http://loinc.org",
                code: "49521004",
                display: "Left external ear structure",
              },
            ],
            text: "Left Ear",
          },
        ],
        subject: {
          reference: "Patient/d4578c63-09c6-4812-84c3-98328bb8444f",
        },
        onsetDateTime: "2012-05-24",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/ee7d767a-499e-4d47-837a-77e90fb7a107",
      resource: {
        resourceType: "Condition",
        id: "ee7d767a-499e-4d47-837a-77e90fb7a107",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:57.411+00:00",
          source: "#1cSvOOK9eX3eU5G9",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/31c3b052-a2c8-41ff-aa25-888965510efb",
      resource: {
        resourceType: "Condition",
        id: "31c3b052-a2c8-41ff-aa25-888965510efb",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:15:24.649+00:00",
          source: "#u6PoqBtX2GvkbzYN",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/8fe2882e-3f22-4f83-8ca7-a5f710e1dc63",
      resource: {
        resourceType: "Condition",
        id: "8fe2882e-3f22-4f83-8ca7-a5f710e1dc63",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:20:23.379+00:00",
          source: "#7G1a8hAUIGpq7dtH",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/03e2f676-4b0f-44fb-a9d9-86d1799fac86",
      resource: {
        resourceType: "Condition",
        id: "03e2f676-4b0f-44fb-a9d9-86d1799fac86",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:21.249+00:00",
          source: "#tAtJmlGfZryCg1Mq",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/a5b381c4-2017-4008-bf5d-94b3219db910",
      resource: {
        resourceType: "Condition",
        id: "a5b381c4-2017-4008-bf5d-94b3219db910",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:56.285+00:00",
          source: "#QzIn8gNeP9nSWifb",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/bbdad617-9454-4add-9426-a5dec6b89b9c",
      resource: {
        resourceType: "Condition",
        id: "bbdad617-9454-4add-9426-a5dec6b89b9c",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:17:39.496+00:00",
          source: "#wBxHU7Awc7byEk7z",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4538f4d6-1e0a-4f07-9ad9-5ac24acf6679",
      resource: {
        resourceType: "Condition",
        id: "4538f4d6-1e0a-4f07-9ad9-5ac24acf6679",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:56.230+00:00",
          source: "#hZG0hQpr0SgizWKT",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/d5c8a64b-cf38-4881-80b8-edec274981b3",
      resource: {
        resourceType: "Condition",
        id: "d5c8a64b-cf38-4881-80b8-edec274981b3",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:39.839+00:00",
          source: "#ZFIq09Xd788cdsxg",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/d1604909-987e-4b11-8045-89008a119aab",
      resource: {
        resourceType: "Condition",
        id: "d1604909-987e-4b11-8045-89008a119aab",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:23:09.885+00:00",
          source: "#sUQMWgbimVFPRFQp",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/afcb7361-fcda-4334-97af-91e93a792ef4",
      resource: {
        resourceType: "Condition",
        id: "afcb7361-fcda-4334-97af-91e93a792ef4",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:16:39.775+00:00",
          source: "#Ir49zlVnuoDnpozI",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/9d9d7bb7-8e2e-4312-90ad-b9b7804e4840",
      resource: {
        resourceType: "Condition",
        id: "9d9d7bb7-8e2e-4312-90ad-b9b7804e4840",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:17.796+00:00",
          source: "#9hJX41svm1eUlq8o",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/13b90870-a58c-4e70-aa8e-79e6da8b3ac1",
      resource: {
        resourceType: "Condition",
        id: "13b90870-a58c-4e70-aa8e-79e6da8b3ac1",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:26.011+00:00",
          source: "#fzkbu9Yuntr5niup",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/aa0fda02-1233-4ca0-8905-9e33277b5cd9",
      resource: {
        resourceType: "Condition",
        id: "aa0fda02-1233-4ca0-8905-9e33277b5cd9",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:20.129+00:00",
          source: "#UsfIFgMn35EGYXM6",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/76fe8399-66fd-4660-81d7-77d52b8f4c0f",
      resource: {
        resourceType: "Condition",
        id: "76fe8399-66fd-4660-81d7-77d52b8f4c0f",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:20.195+00:00",
          source: "#qXqWr3BfD2hp3Ird",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/f205da88-d428-40d8-97ba-60689be4ea42",
      resource: {
        resourceType: "Condition",
        id: "f205da88-d428-40d8-97ba-60689be4ea42",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:37.997+00:00",
          source: "#Rx1Oszgq7rs7BBRQ",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/aecb5f4b-2568-428c-82fa-da10ef0effc5",
      resource: {
        resourceType: "Condition",
        id: "aecb5f4b-2568-428c-82fa-da10ef0effc5",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:13.766+00:00",
          source: "#zjj3mxaYZvdiTbwg",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/e9dd4988-c3f1-4d20-94d1-5cb92aade32b",
      resource: {
        resourceType: "Condition",
        id: "e9dd4988-c3f1-4d20-94d1-5cb92aade32b",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:10.276+00:00",
          source: "#7TIOwSrcisKjLJBB",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/111d0fe7-8c24-480d-8c98-9530a802f1fc",
      resource: {
        resourceType: "Condition",
        id: "111d0fe7-8c24-480d-8c98-9530a802f1fc",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:21.925+00:00",
          source: "#unr0vk1DLs5dVSjb",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/66ef20e2-e475-42f6-b45e-208fac110fff",
      resource: {
        resourceType: "Condition",
        id: "66ef20e2-e475-42f6-b45e-208fac110fff",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:23:14.944+00:00",
          source: "#DtyfiXgTj4hrHEwT",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4701f70f-9ead-4aea-b1ab-957d16155ae4",
      resource: {
        resourceType: "Condition",
        id: "4701f70f-9ead-4aea-b1ab-957d16155ae4",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:54.504+00:00",
          source: "#outGEEzqK4CbuyU1",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/f93c7c33-d4ed-4a2e-bf8c-523ea970d20a",
      resource: {
        resourceType: "Condition",
        id: "f93c7c33-d4ed-4a2e-bf8c-523ea970d20a",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:36.238+00:00",
          source: "#TiGmbQs24w5IQVvW",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/29dc658b-e0a8-4c3f-aa7a-06bdeae5b92c",
      resource: {
        resourceType: "Condition",
        id: "29dc658b-e0a8-4c3f-aa7a-06bdeae5b92c",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:20.832+00:00",
          source: "#NmW3dzx4Y2k4QNGc",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/51c36a4c-b139-42f3-86e6-1ab5ff81d16b",
      resource: {
        resourceType: "Condition",
        id: "51c36a4c-b139-42f3-86e6-1ab5ff81d16b",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:23:08.462+00:00",
          source: "#dXrIfZGEitCtjnXq",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/ded69485-2786-442a-9baf-f76386c229b9",
      resource: {
        resourceType: "Condition",
        id: "ded69485-2786-442a-9baf-f76386c229b9",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:16:47.006+00:00",
          source: "#UR1aGN6KdrYoF3W4",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/76c973d8-7c68-43a3-b60e-8d81ccd65be1",
      resource: {
        resourceType: "Condition",
        id: "76c973d8-7c68-43a3-b60e-8d81ccd65be1",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:15.457+00:00",
          source: "#fREv0S4hkUSPxD5f",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/142384d1-30d6-4bfd-a8cf-26b415e9f9b2",
      resource: {
        resourceType: "Condition",
        id: "142384d1-30d6-4bfd-a8cf-26b415e9f9b2",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:28.162+00:00",
          source: "#9MFVxsVzKKOdESvP",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/bb083065-948c-4b77-8ce4-3047b1aa23e6",
      resource: {
        resourceType: "Condition",
        id: "bb083065-948c-4b77-8ce4-3047b1aa23e6",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:17:55.171+00:00",
          source: "#45sFmajuA6qeHmit",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/6986d6a1-ce02-4562-8955-bd2d057387e0",
      resource: {
        resourceType: "Condition",
        id: "6986d6a1-ce02-4562-8955-bd2d057387e0",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:18:54.212+00:00",
          source: "#TjKOEUUciStIxxMW",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c186aa86-242e-4928-b4d2-93b2024a5b30",
      resource: {
        resourceType: "Condition",
        id: "c186aa86-242e-4928-b4d2-93b2024a5b30",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:18:34.141+00:00",
          source: "#oYxHunA029QvUHHq",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/ce8a7c65-5bf6-4b70-ac71-248fb7bd5d2c",
      resource: {
        resourceType: "Condition",
        id: "ce8a7c65-5bf6-4b70-ac71-248fb7bd5d2c",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:53.806+00:00",
          source: "#2Oa1fh5b0yXTnwCg",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/b234f80a-2c3c-4777-9ac7-74c9b03ba2bd",
      resource: {
        resourceType: "Condition",
        id: "b234f80a-2c3c-4777-9ac7-74c9b03ba2bd",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:19:23.884+00:00",
          source: "#p8wuQ9oJI9j07Ptj",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/af71650d-54bb-4fb6-8910-b99c163fc1b1",
      resource: {
        resourceType: "Condition",
        id: "af71650d-54bb-4fb6-8910-b99c163fc1b1",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:20:38.246+00:00",
          source: "#erMaWtl58emLiOIC",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/59f0fc01-5928-4cc0-8921-b3c8ca6ac43f",
      resource: {
        resourceType: "Condition",
        id: "59f0fc01-5928-4cc0-8921-b3c8ca6ac43f",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:17:51.660+00:00",
          source: "#mJaf4ySStGiITb3j",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/0d55dc6c-bdc7-41d1-bb35-c752d148b678",
      resource: {
        resourceType: "Condition",
        id: "0d55dc6c-bdc7-41d1-bb35-c752d148b678",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:25:00.865+00:00",
          source: "#x6IUSKoKZWADEGnK",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/9ee110c8-ef79-45b3-96a0-38300c4affa8",
      resource: {
        resourceType: "Condition",
        id: "9ee110c8-ef79-45b3-96a0-38300c4affa8",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:21:24.977+00:00",
          source: "#fY2Yb9FEW5JzTIPK",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/afe5cf2a-377f-4856-a632-b0fe4aebc045",
      resource: {
        resourceType: "Condition",
        id: "afe5cf2a-377f-4856-a632-b0fe4aebc045",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:17:16.927+00:00",
          source: "#Ef7oa271zqWXSIPv",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/7670a68a-66e5-400a-8ba1-fef0b35d1758",
      resource: {
        resourceType: "Condition",
        id: "7670a68a-66e5-400a-8ba1-fef0b35d1758",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:02.962+00:00",
          source: "#zEowHDBevaSLgUaS",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/3b93b3e4-7585-4be0-bf06-744d9d25c93b",
      resource: {
        resourceType: "Condition",
        id: "3b93b3e4-7585-4be0-bf06-744d9d25c93b",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:16:15.153+00:00",
          source: "#H31XoDZPzFkVlbs4",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c16f4bd8-bdc6-495c-91d4-4c95c488ff31",
      resource: {
        resourceType: "Condition",
        id: "c16f4bd8-bdc6-495c-91d4-4c95c488ff31",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:09.921+00:00",
          source: "#uRVu4AescmgWisT3",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c00c3785-bd53-4a23-ab1c-e9925db8a40f",
      resource: {
        resourceType: "Condition",
        id: "c00c3785-bd53-4a23-ab1c-e9925db8a40f",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:18:03.452+00:00",
          source: "#Qqlt64d61jUfF0k1",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/bd9edd80-ba65-47fb-9ee1-458e2c096e5f",
      resource: {
        resourceType: "Condition",
        id: "bd9edd80-ba65-47fb-9ee1-458e2c096e5f",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:20:51.262+00:00",
          source: "#9ggm7uwM1eE10Psz",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/aac24536-031f-43ce-9901-a97a770f7433",
      resource: {
        resourceType: "Condition",
        id: "aac24536-031f-43ce-9901-a97a770f7433",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:24:13.350+00:00",
          source: "#OZqDpR4X8kaVFMzL",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/04f61c58-8a2c-437e-80f1-45fd66c0711f",
      resource: {
        resourceType: "Condition",
        id: "04f61c58-8a2c-437e-80f1-45fd66c0711f",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:18:27.586+00:00",
          source: "#AwO8ve81Vr0KwUDS",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/2adaba08-0949-48d5-a561-d508a6f04d15",
      resource: {
        resourceType: "Condition",
        id: "2adaba08-0949-48d5-a561-d508a6f04d15",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:16:09.007+00:00",
          source: "#n4lmrFXdyIiL29yS",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/533eb9a7-d57f-4a82-aa59-78c5a6b66b37",
      resource: {
        resourceType: "Condition",
        id: "533eb9a7-d57f-4a82-aa59-78c5a6b66b37",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:15:40.764+00:00",
          source: "#xdhDmIbBoX9GThhe",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/22b06177-6b4c-4911-8150-5f7ef85b4f5b",
      resource: {
        resourceType: "Condition",
        id: "22b06177-6b4c-4911-8150-5f7ef85b4f5b",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:25.163+00:00",
          source: "#sNIBjVOIgwx8giDR",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/50d743b5-dd14-4bec-b031-50a08263d998",
      resource: {
        resourceType: "Condition",
        id: "50d743b5-dd14-4bec-b031-50a08263d998",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:40.254+00:00",
          source: "#0hJ03j4zeOdw1svY",
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
            value: "urn:oid:ID3o4b-17j65jbko",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4b-17j65jbko",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "40930008",
              display: "Hypothyroidism",
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
          text: "Hypothyroidism",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20100415",
        recordedDate: "2010-04-15",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/fe25e531-fa2b-4abf-b27d-e7895df8e243",
      resource: {
        resourceType: "Condition",
        id: "fe25e531-fa2b-4abf-b27d-e7895df8e243",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:22:56.201+00:00",
          source: "#0AR4IHQxhlVnvyP2",
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
            value: "urn:oid:ID3o4a-17j65frb0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o4a-17j65frb0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "35489007",
              display: "Depressive disorder",
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
          text: "Depressive disorder",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20111110",
        recordedDate: "2011-11-10",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/9563087e-1de6-42f6-8944-df9fc87a90f6",
      resource: {
        resourceType: "Condition",
        id: "9563087e-1de6-42f6-8944-df9fc87a90f6",
        meta: {
          versionId: "5",
          lastUpdated: "2022-09-06T20:21:16.358+00:00",
          source: "#tsRrDXJieKdYRQlJ",
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
            value: "urn:oid:ID3o49-17j65ecf0",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:ID3o49-17j65ecf0",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "36971009",
              display: "Sinusitis",
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
          text: "Sinusitis",
        },
        subject: {
          reference: "Patient/ae6c5bfc-c082-47f0-a605-792d7c5958ad",
          type: "Patient",
        },
        onsetString: "20120920",
        recordedDate: "2012-09-20",
      },
      search: {
        mode: "match",
      },
    },
  ],
};

export const CONDITIONS_BUNDLE_LENS = {
  resourceType: "Bundle",
  id: "39b4aa85-a5ed-4c87-91e1-7883c7c477b8",
  meta: {
    lastUpdated: "2022-09-09T17:45:08.341+00:00",
  },
  type: "searchset",
  link: [
    {
      relation: "self",
      url: "https://api.dev.zusapi.com/fhir/Condition?_tag=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions",
    },
    {
      relation: "next",
      url: "https://api.dev.zusapi.com/fhir/Condition?_count=50&_offset=50&_tag=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions",
    },
  ],
  entry: [
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4f693cb5-a0ff-4201-aae8-64b38fe90fd5",
      resource: {
        resourceType: "Condition",
        id: "4f693cb5-a0ff-4201-aae8-64b38fe90fd5",
        meta: {
          versionId: "2",
          lastUpdated: "2022-08-11T12:09:20.296+00:00",
          source: "#ZZzZqMFNzIEbbA2P",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/c768d16f-571f-4d21-89da-af19478ef570",
            },
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        severity: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "24484000",
              display: "Severe",
            },
          ],
        },
        code: {
          text: "New ICD10 CM Code",
        },
        subject: {
          reference: "Patient/7ccce223-a6fa-419c-b492-bd27be718d9f",
        },
        onsetDateTime: "2022-05-24",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4764c2ad-966f-46fe-9ebc-b2151599f65e",
      resource: {
        resourceType: "Condition",
        id: "4764c2ad-966f-46fe-9ebc-b2151599f65e",
        meta: {
          versionId: "2",
          lastUpdated: "2022-08-11T12:09:20.382+00:00",
          source: "#rWodBxOlTFJAXRGz",
          tag: [
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/123banana",
            },
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
            },
          ],
        },
        severity: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "24484000",
              display: "Severe",
            },
          ],
        },
        code: {
          text: "New ICD10 CM Code",
        },
        subject: {
          reference: "Patient/7ccce223-a6fa-419c-b492-bd27be718d9f",
        },
        onsetDateTime: "2022-05-24",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/850a15da-a53b-48f8-b799-fd201b64110a",
      resource: {
        resourceType: "Condition",
        id: "850a15da-a53b-48f8-b799-fd201b64110a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:56:36.678+00:00",
          source: "#ebOGTUpyDyunI0Qw",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-2">Strep throat</td><td/><td id="problemstatus-2"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:9f3880d0-86ea-48e1-c1aa-7ce3b669dddf",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:1c1193c9-21f1-474c-5b9c-19d90d6c0e15",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "J02.0",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "034.0",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:56:36.631929 -0400 EDT m=+390.902704168",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/382b4c12-2469-4f6a-9ac7-a449352bf073",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/670713c5-604d-4ea8-bce6-813815231fb8",
      resource: {
        resourceType: "Condition",
        id: "670713c5-604d-4ea8-bce6-813815231fb8",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:08:11.521+00:00",
          source: "#Rog6xm8jyuqp3AZI",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Contraception management</td><td/><td id="problemstatus-1"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2fb7d0ad-dfe0-48a6-b094-6ec383dd917e",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:fbd88136-8994-43e6-e9a2-1e42a2ec32ec",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "305058001",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "Z30.9",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "V25.9",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:08:11.474735 -0400 EDT m=+1085.732136543",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/382b4c12-2469-4f6a-9ac7-a449352bf073",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/7881205a-fe8c-4941-bb34-aad203d35f2a",
      resource: {
        resourceType: "Condition",
        id: "7881205a-fe8c-4941-bb34-aad203d35f2a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:53:31.684+00:00",
          source: "#SQc80gI1UsHHuc6x",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-2">Strep throat</td><td/><td id="problemstatus-2"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:9f3880d0-86ea-48e1-c1aa-7ce3b669dddf",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:1c1193c9-21f1-474c-5b9c-19d90d6c0e15",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "J02.0",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "034.0",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:53:31.637987 -0400 EDT m=+205.912323709",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/382b4c12-2469-4f6a-9ac7-a449352bf073",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/329619c0-d03e-4531-82c0-0bb462fe8226",
      resource: {
        resourceType: "Condition",
        id: "329619c0-d03e-4531-82c0-0bb462fe8226",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:10:19.404+00:00",
          source: "#PavpVA8lgkpdgLis",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Contraception management</td><td/><td id="problemstatus-1"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2fb7d0ad-dfe0-48a6-b094-6ec383dd917e",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:fbd88136-8994-43e6-e9a2-1e42a2ec32ec",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "305058001",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "Z30.9",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "V25.9",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:10:19.355048 -0400 EDT m=+1213.609988584",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/382b4c12-2469-4f6a-9ac7-a449352bf073",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/3506cf55-4d37-4970-8f6d-58b77c71fd6a",
      resource: {
        resourceType: "Condition",
        id: "3506cf55-4d37-4970-8f6d-58b77c71fd6a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:14:19.752+00:00",
          source: "#qPhA6zTrPbJrzjE5",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:a59a7ae7-2d6b-46ff-9152-780ac4061245",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:b04d3f0d-8b73-470d-89e5-70be69b8577a",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55607006",
              display: "Problem",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:14:19.697664 -0400 EDT m=+1453.947977876",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Problem",
        },
        subject: {
          reference: "Patient/32c166e1-22e9-4461-9d2f-274c313db1a5",
          type: "Patient",
        },
        onsetString: "20191218",
        recordedDate: "2019-12-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/e1ad8949-cd43-44d4-b18d-b3779238dea1",
      resource: {
        resourceType: "Condition",
        id: "e1ad8949-cd43-44d4-b18d-b3779238dea1",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:02:10.309+00:00",
          source: "#7aWIFbRxh1u0HPEp",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:a59a7ae7-2d6b-46ff-9152-780ac4061245",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:b04d3f0d-8b73-470d-89e5-70be69b8577a",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55607006",
              display: "Problem",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:02:10.267641 -0400 EDT m=+724.531994668",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Problem",
        },
        subject: {
          reference: "Patient/32c166e1-22e9-4461-9d2f-274c313db1a5",
          type: "Patient",
        },
        onsetString: "20191218",
        recordedDate: "2019-12-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/1f84d7d2-9d7c-48af-b440-eb2ada282adb",
      resource: {
        resourceType: "Condition",
        id: "1f84d7d2-9d7c-48af-b440-eb2ada282adb",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:05:55.416+00:00",
          source: "#fPyEKxNeHZhMpYdt",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:a59a7ae7-2d6b-46ff-9152-780ac4061245",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:b04d3f0d-8b73-470d-89e5-70be69b8577a",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55607006",
              display: "Problem",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:05:55.368569 -0400 EDT m=+949.628590751",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Problem",
        },
        subject: {
          reference: "Patient/32c166e1-22e9-4461-9d2f-274c313db1a5",
          type: "Patient",
        },
        onsetString: "20191218",
        recordedDate: "2019-12-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/97dffc42-cd1c-4ff2-a71c-82bf09b65fb8",
      resource: {
        resourceType: "Condition",
        id: "97dffc42-cd1c-4ff2-a71c-82bf09b65fb8",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:09:52.091+00:00",
          source: "#kP7u8o2NpgUiDEbS",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:a59a7ae7-2d6b-46ff-9152-780ac4061245",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:oid:b04d3f0d-8b73-470d-89e5-70be69b8577a",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55607006",
              display: "Problem",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:09:52.044532 -0400 EDT m=+1186.299997876",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Problem",
        },
        subject: {
          reference: "Patient/32c166e1-22e9-4461-9d2f-274c313db1a5",
          type: "Patient",
        },
        onsetString: "20191218",
        recordedDate: "2019-12-18",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/bb9c2c16-8448-4cd6-8d89-310c87c38bc2",
      resource: {
        resourceType: "Condition",
        id: "bb9c2c16-8448-4cd6-8d89-310c87c38bc2",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:10:48.093+00:00",
          source: "#TZSGvYdmfZE5b5C8",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761199">Osteoporosis(<div id="CON7761199">Confirmed</div>)</div></td><td/><td><div id="PROBST7761199">Active</div></td><td><div id="PROBHST7761199"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:c1a516a7-419a-42ad-9f98-6f979c69bb33",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:4595fb8e-f7e9-497e-8ed9-206923856186",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "64859006",
              display: "Osteoporosis (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:10:48.039958 -0400 EDT m=+1242.294345876",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Osteoporosis (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:21-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/5f7ede53-fba0-46b4-89c6-4877993630f3",
      resource: {
        resourceType: "Condition",
        id: "5f7ede53-fba0-46b4-89c6-4877993630f3",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:04:49.749+00:00",
          source: "#rP4hli3lpQA7WmwK",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:52a6b5a0-e32c-48e0-87bd-e498c26b735b",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "282291009",
                display: "Diagnosis",
              },
              {
                system: "http://loinc.org",
                code: "29308-4",
                display: "Diagnosis",
              },
            ],
            text: "Diagnosis",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "278516003",
              display: "Lobar pneumonia (disorder)",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.90",
              code: "J18.1",
              display: "Lobar pneumonia, unspecified organism",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:04:49.696354 -0400 EDT m=+883.957639793",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/cmshcc",
              code: "115",
              display: "Typhoid pneumonia",
              userSelected: false,
            },
          ],
          text: "Lobar pneumonia (disorder)",
        },
        subject: {
          reference: "Patient/b1888dd9-8841-45e4-8a64-e324e8b68cf4",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        onsetDateTime: "2022-01-27T09:59:00-06:00",
        recordedDate: "2022-01-27T09:47:54-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/b0998e97-7d17-4c5b-9c01-88fa5a1aa962",
      resource: {
        resourceType: "Condition",
        id: "b0998e97-7d17-4c5b-9c01-88fa5a1aa962",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:57:43.977+00:00",
          source: "#wBV6wmx8YXlXNoyo",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Permanent atrial fibrillation</td><td/><td id="problemstatus-1">Active</td></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:694492d2-8845-4b37-2b94-f1d671662966",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a80d686b-1d8b-4ab5-43b8-f991c3e53fb6",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "440028005",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "I48.21",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "427.31",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:57:43.94124 -0400 EDT m=+458.210719751",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/8c1a8f5a-e867-40fd-8b86-ac515d6e1e38",
          type: "Patient",
          display: "Addington Barnaby Winston",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/907f4cf5-ff74-46ba-bec4-cfa0ddf14bd3",
      resource: {
        resourceType: "Condition",
        id: "907f4cf5-ff74-46ba-bec4-cfa0ddf14bd3",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:13:07.861+00:00",
          source: "#xDeukhP3KbUHuEpm",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761279">Atrial fibrillation(<div id="CON7761279">Confirmed</div>)</div></td><td/><td><div id="PROBST7761279">Active</div></td><td><div id="PROBHST7761279"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:62286bcb-9411-4373-a3be-01e1583d7955",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:16efdc1f-6a23-4f3f-9108-a0775caf0b64",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "15964901000119107",
              display: "Atypical atrial flutter (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:13:07.813328 -0400 EDT m=+1382.065025626",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Atypical atrial flutter (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:12:41-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4d5de50b-f877-4cfa-9338-b65fa982958c",
      resource: {
        resourceType: "Condition",
        id: "4d5de50b-f877-4cfa-9338-b65fa982958c",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:10:00.709+00:00",
          source: "#n0NKEQ2RyZfDAsp2",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761219">Diabetes mellitus, type 2(<div id="CON7761219">Confirmed</div>)</div></td><td/><td><div id="PROBST7761219">Active</div></td><td><div id="PROBHST7761219"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:f633bede-ab03-475b-a5f3-58d44b845655",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dc69eb59-05c6-4a1c-8784-c00b702f0caa",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "44054006",
              display: "Diabetes mellitus type 2 (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:10:00.66106 -0400 EDT m=+1194.916360584",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetes mellitus type 2 (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/19a57761-3f37-43ea-b3fc-ae217e514263",
      resource: {
        resourceType: "Condition",
        id: "19a57761-3f37-43ea-b3fc-ae217e514263",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:00:29.493+00:00",
          source: "#NOQ7O9NCvKsMzox3",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761233">Hyperlipemia(<div id="CON7761233">Confirmed</div>)</div></td><td/><td><div id="PROBST7761233">Active</div></td><td><div id="PROBHST7761233"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a8e96558-f9f8-40b0-abfa-3fa33f2812c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:34613795-7a16-4b12-b5d7-890edc93c7e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55822004",
              display: "Hyperlipidemia (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:00:29.450953 -0400 EDT m=+623.717247543",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hyperlipidemia (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:42-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/9630b7e0-1a21-4339-9505-295b382d5d2b",
      resource: {
        resourceType: "Condition",
        id: "9630b7e0-1a21-4339-9505-295b382d5d2b",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:10:02.580+00:00",
          source: "#9TAxoQwawpvFTYvk",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761209">Hypertension(<div id="CON7761209">Confirmed</div>)</div></td><td/><td><div id="PROBST7761209">Active</div></td><td><div id="PROBHST7761209"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2ecee151-a0f1-4155-a637-7e49ccd1b5c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:6521f566-336a-43df-912d-4f5b407d21e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "38341003",
              display: "Hypertensive disorder, systemic arterial (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:10:02.530684 -0400 EDT m=+1196.785948001",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hypertensive disorder, systemic arterial (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/eb5fa9f3-adf7-4187-add0-99539eea6dc0",
      resource: {
        resourceType: "Condition",
        id: "eb5fa9f3-adf7-4187-add0-99539eea6dc0",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:00:20.705+00:00",
          source: "#pmeAN5lDRWdMKrVx",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761293">Diabetic neuropathy, painful(<div id="CON7761293">Confirmed</div>)</div></td><td/><td><div id="PROBST7761293">Active</div></td><td><div id="PROBHST7761293"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:954f1c00-def6-4e6e-83ec-e9023d886895",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:886cfc62-a042-4d7f-b048-b13467a8fe1e",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "230572002",
              display: "Diabetic neuropathy (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:00:20.65848 -0400 EDT m=+614.924943709",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetic neuropathy (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:17:35-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/92cd1909-9319-4ce2-90da-3abebe58bc6c",
      resource: {
        resourceType: "Condition",
        id: "92cd1909-9319-4ce2-90da-3abebe58bc6c",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:02:25.411+00:00",
          source: "#BmyzFEWAjia9mvMy",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761199">Osteoporosis(<div id="CON7761199">Confirmed</div>)</div></td><td/><td><div id="PROBST7761199">Active</div></td><td><div id="PROBHST7761199"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:c1a516a7-419a-42ad-9f98-6f979c69bb33",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:4595fb8e-f7e9-497e-8ed9-206923856186",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "64859006",
              display: "Osteoporosis (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:02:25.363472 -0400 EDT m=+739.627535376",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Osteoporosis (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:21-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/055ab111-c7be-441c-8d61-facb62efcc3a",
      resource: {
        resourceType: "Condition",
        id: "055ab111-c7be-441c-8d61-facb62efcc3a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:07:19.072+00:00",
          source: "#5ao1n8wcPvQDPGMo",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:52a6b5a0-e32c-48e0-87bd-e498c26b735b",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "282291009",
                display: "Diagnosis",
              },
              {
                system: "http://loinc.org",
                code: "29308-4",
                display: "Diagnosis",
              },
            ],
            text: "Diagnosis",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "278516003",
              display: "Lobar pneumonia (disorder)",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.90",
              code: "J18.1",
              display: "Lobar pneumonia, unspecified organism",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:07:19.016448 -0400 EDT m=+1033.274859709",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/cmshcc",
              code: "115",
              display: "Typhoid pneumonia",
              userSelected: false,
            },
          ],
          text: "Lobar pneumonia (disorder)",
        },
        subject: {
          reference: "Patient/b1888dd9-8841-45e4-8a64-e324e8b68cf4",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        onsetDateTime: "2022-01-27T09:59:00-06:00",
        recordedDate: "2022-01-27T09:47:54-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/79bc8d77-c5a9-4280-85ee-d4daa52f5fd7",
      resource: {
        resourceType: "Condition",
        id: "79bc8d77-c5a9-4280-85ee-d4daa52f5fd7",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:12:39.276+00:00",
          source: "#KqbT2Z404V1MPRll",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Permanent atrial fibrillation</td><td/><td id="problemstatus-1">Active</td></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:694492d2-8845-4b37-2b94-f1d671662966",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a80d686b-1d8b-4ab5-43b8-f991c3e53fb6",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "440028005",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "I48.21",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "427.31",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:12:39.211139 -0400 EDT m=+1353.463387168",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/8c1a8f5a-e867-40fd-8b86-ac515d6e1e38",
          type: "Patient",
          display: "Addington Barnaby Winston",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/154571f4-3a3b-41e6-8bf5-13aab8ce1ada",
      resource: {
        resourceType: "Condition",
        id: "154571f4-3a3b-41e6-8bf5-13aab8ce1ada",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:55:51.287+00:00",
          source: "#4proxxvPdXSyITv7",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761279">Atrial fibrillation(<div id="CON7761279">Confirmed</div>)</div></td><td/><td><div id="PROBST7761279">Active</div></td><td><div id="PROBHST7761279"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:62286bcb-9411-4373-a3be-01e1583d7955",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:16efdc1f-6a23-4f3f-9108-a0775caf0b64",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "15964901000119107",
              display: "Atypical atrial flutter (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:55:51.245808 -0400 EDT m=+345.517457668",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Atypical atrial flutter (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:12:41-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c764b29e-db11-4b0c-b92e-64fbecdb8ff3",
      resource: {
        resourceType: "Condition",
        id: "c764b29e-db11-4b0c-b92e-64fbecdb8ff3",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:57:35.611+00:00",
          source: "#zDbBgiXV26a7fZHg",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761219">Diabetes mellitus, type 2(<div id="CON7761219">Confirmed</div>)</div></td><td/><td><div id="PROBST7761219">Active</div></td><td><div id="PROBHST7761219"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:f633bede-ab03-475b-a5f3-58d44b845655",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dc69eb59-05c6-4a1c-8784-c00b702f0caa",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "44054006",
              display: "Diabetes mellitus type 2 (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:57:35.571332 -0400 EDT m=+449.840973668",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetes mellitus type 2 (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/bd9155ae-9f8d-47af-bcad-2c9ec88a956a",
      resource: {
        resourceType: "Condition",
        id: "bd9155ae-9f8d-47af-bcad-2c9ec88a956a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:11:04.721+00:00",
          source: "#7fzt2rcArLokJg1U",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761233">Hyperlipemia(<div id="CON7761233">Confirmed</div>)</div></td><td/><td><div id="PROBST7761233">Active</div></td><td><div id="PROBHST7761233"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a8e96558-f9f8-40b0-abfa-3fa33f2812c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:34613795-7a16-4b12-b5d7-890edc93c7e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55822004",
              display: "Hyperlipidemia (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:11:04.662086 -0400 EDT m=+1258.916154001",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hyperlipidemia (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:42-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4f63175f-36a1-4841-b134-041f549a7e6a",
      resource: {
        resourceType: "Condition",
        id: "4f63175f-36a1-4841-b134-041f549a7e6a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:09:58.216+00:00",
          source: "#VrrSTeAwfnp5BXgd",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761209">Hypertension(<div id="CON7761209">Confirmed</div>)</div></td><td/><td><div id="PROBST7761209">Active</div></td><td><div id="PROBHST7761209"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2ecee151-a0f1-4155-a637-7e49ccd1b5c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:6521f566-336a-43df-912d-4f5b407d21e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "38341003",
              display: "Hypertensive disorder, systemic arterial (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:09:58.167114 -0400 EDT m=+1192.422462501",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hypertensive disorder, systemic arterial (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/fb460965-7dfd-47b1-a5b2-40d96643597b",
      resource: {
        resourceType: "Condition",
        id: "fb460965-7dfd-47b1-a5b2-40d96643597b",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:00:41.187+00:00",
          source: "#F7UkmqCYaK3WYjM3",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761199">Osteoporosis(<div id="CON7761199">Confirmed</div>)</div></td><td/><td><div id="PROBST7761199">Active</div></td><td><div id="PROBHST7761199"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:c1a516a7-419a-42ad-9f98-6f979c69bb33",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:4595fb8e-f7e9-497e-8ed9-206923856186",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "64859006",
              display: "Osteoporosis (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:00:41.148659 -0400 EDT m=+635.414728084",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Osteoporosis (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:21-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/1e5dda68-3f24-452e-85da-214665ca898e",
      resource: {
        resourceType: "Condition",
        id: "1e5dda68-3f24-452e-85da-214665ca898e",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:54:22.600+00:00",
          source: "#GqyeHLRGdMUVmiOt",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:52a6b5a0-e32c-48e0-87bd-e498c26b735b",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "282291009",
                display: "Diagnosis",
              },
              {
                system: "http://loinc.org",
                code: "29308-4",
                display: "Diagnosis",
              },
            ],
            text: "Diagnosis",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "278516003",
              display: "Lobar pneumonia (disorder)",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.90",
              code: "J18.1",
              display: "Lobar pneumonia, unspecified organism",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:54:22.560659 -0400 EDT m=+256.834015459",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/cmshcc",
              code: "115",
              display: "Typhoid pneumonia",
              userSelected: false,
            },
          ],
          text: "Lobar pneumonia (disorder)",
        },
        subject: {
          reference: "Patient/b1888dd9-8841-45e4-8a64-e324e8b68cf4",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        onsetDateTime: "2022-01-27T09:59:00-06:00",
        recordedDate: "2022-01-27T09:47:54-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/ff3def4d-7fad-4979-9627-65b51b48f71d",
      resource: {
        resourceType: "Condition",
        id: "ff3def4d-7fad-4979-9627-65b51b48f71d",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:56:52.019+00:00",
          source: "#6xijCawVQfDkauZJ",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Permanent atrial fibrillation</td><td/><td id="problemstatus-1">Active</td></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:694492d2-8845-4b37-2b94-f1d671662966",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a80d686b-1d8b-4ab5-43b8-f991c3e53fb6",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "440028005",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "I48.21",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "427.31",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:56:51.976228 -0400 EDT m=+406.246708209",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/8c1a8f5a-e867-40fd-8b86-ac515d6e1e38",
          type: "Patient",
          display: "Addington Barnaby Winston",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/42a08b5b-02a8-45d6-bc0e-e629a0f29be7",
      resource: {
        resourceType: "Condition",
        id: "42a08b5b-02a8-45d6-bc0e-e629a0f29be7",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:13:23.179+00:00",
          source: "#4mNh4tZqjGgQ4MhQ",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761279">Atrial fibrillation(<div id="CON7761279">Confirmed</div>)</div></td><td/><td><div id="PROBST7761279">Active</div></td><td><div id="PROBHST7761279"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:62286bcb-9411-4373-a3be-01e1583d7955",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:16efdc1f-6a23-4f3f-9108-a0775caf0b64",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "15964901000119107",
              display: "Atypical atrial flutter (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:13:23.100513 -0400 EDT m=+1397.351916834",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Atypical atrial flutter (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:12:41-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/9d2ff627-7d33-4e86-a09e-1c4df2de8599",
      resource: {
        resourceType: "Condition",
        id: "9d2ff627-7d33-4e86-a09e-1c4df2de8599",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:57:57.663+00:00",
          source: "#zdWMJ3zm92CXItTK",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761219">Diabetes mellitus, type 2(<div id="CON7761219">Confirmed</div>)</div></td><td/><td><div id="PROBST7761219">Active</div></td><td><div id="PROBHST7761219"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:f633bede-ab03-475b-a5f3-58d44b845655",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dc69eb59-05c6-4a1c-8784-c00b702f0caa",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "44054006",
              display: "Diabetes mellitus type 2 (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:57:57.621062 -0400 EDT m=+471.890278334",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetes mellitus type 2 (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/b1b9d6b1-6937-4f26-ba0d-c9dc3f3c160b",
      resource: {
        resourceType: "Condition",
        id: "b1b9d6b1-6937-4f26-ba0d-c9dc3f3c160b",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:00:31.171+00:00",
          source: "#ErGZ2evJ9XWrT6ru",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761233">Hyperlipemia(<div id="CON7761233">Confirmed</div>)</div></td><td/><td><div id="PROBST7761233">Active</div></td><td><div id="PROBHST7761233"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a8e96558-f9f8-40b0-abfa-3fa33f2812c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:34613795-7a16-4b12-b5d7-890edc93c7e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "55822004",
              display: "Hyperlipidemia (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:00:31.131108 -0400 EDT m=+625.397370251",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hyperlipidemia (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:42-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/41465acb-8a96-432e-bfc5-65923a77b610",
      resource: {
        resourceType: "Condition",
        id: "41465acb-8a96-432e-bfc5-65923a77b610",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:56:48.352+00:00",
          source: "#N4Kd1mGKvrjjbfOb",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761209">Hypertension(<div id="CON7761209">Confirmed</div>)</div></td><td/><td><div id="PROBST7761209">Active</div></td><td><div id="PROBHST7761209"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2ecee151-a0f1-4155-a637-7e49ccd1b5c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:6521f566-336a-43df-912d-4f5b407d21e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "38341003",
              display: "Hypertensive disorder, systemic arterial (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:56:48.312465 -0400 EDT m=+402.583016209",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hypertensive disorder, systemic arterial (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/4305778f-b608-4301-ab94-2b10b5ea78c3",
      resource: {
        resourceType: "Condition",
        id: "4305778f-b608-4301-ab94-2b10b5ea78c3",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:02:03.382+00:00",
          source: "#Dhudgqb4pRcM6m5m",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761293">Diabetic neuropathy, painful(<div id="CON7761293">Confirmed</div>)</div></td><td/><td><div id="PROBST7761293">Active</div></td><td><div id="PROBHST7761293"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:954f1c00-def6-4e6e-83ec-e9023d886895",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:886cfc62-a042-4d7f-b048-b13467a8fe1e",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "230572002",
              display: "Diabetic neuropathy (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:02:03.319952 -0400 EDT m=+717.584440043",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetic neuropathy (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:17:35-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/542f0f0f-bf24-4116-b71a-92c70a3e24f3",
      resource: {
        resourceType: "Condition",
        id: "542f0f0f-bf24-4116-b71a-92c70a3e24f3",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:01:39.637+00:00",
          source: "#lr5RTZhwC0HC9MJ0",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-2">Strep throat</td><td/><td id="problemstatus-2"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dad5ff94-1cc1-48c8-2aaa-904602caea90",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8501e8cd-3dfc-413b-2093-6f95c4125571",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "J02.0",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "034.0",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:01:39.542141 -0400 EDT m=+693.807086001",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/1c750b51-d2e3-4eb2-b035-2e3bdbc4d77a",
      resource: {
        resourceType: "Condition",
        id: "1c750b51-d2e3-4eb2-b035-2e3bdbc4d77a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:55:23.740+00:00",
          source: "#mfItzcyYHpdh4xm6",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Contraception management</td><td/><td id="problemstatus-1"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:cd7adf0b-d985-4165-36ab-9eb3f48a0e06",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8bd49a06-7b53-41a9-4abf-7b22bffbf424",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "305058001",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "Z30.9",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "V25.9",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:55:23.696248 -0400 EDT m=+317.968427168",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/29c2306c-236a-49ec-a69f-064b24a88dfb",
      resource: {
        resourceType: "Condition",
        id: "29c2306c-236a-49ec-a69f-064b24a88dfb",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:06:21.175+00:00",
          source: "#2yVTK29FzCxaRYAZ",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761293">Diabetic neuropathy, painful(<div id="CON7761293">Confirmed</div>)</div></td><td/><td><div id="PROBST7761293">Active</div></td><td><div id="PROBHST7761293"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:954f1c00-def6-4e6e-83ec-e9023d886895",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:886cfc62-a042-4d7f-b048-b13467a8fe1e",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "230572002",
              display: "Diabetic neuropathy (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:06:21.126606 -0400 EDT m=+975.386131334",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetic neuropathy (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:17:35-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/53e76a5e-f130-4439-a7a2-11b33d023f4f",
      resource: {
        resourceType: "Condition",
        id: "53e76a5e-f130-4439-a7a2-11b33d023f4f",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:55:20.659+00:00",
          source: "#qsa9M5NwGouU4nUY",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761199">Osteoporosis(<div id="CON7761199">Confirmed</div>)</div></td><td/><td><div id="PROBST7761199">Active</div></td><td><div id="PROBHST7761199"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:c1a516a7-419a-42ad-9f98-6f979c69bb33",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:4595fb8e-f7e9-497e-8ed9-206923856186",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "64859006",
              display: "Osteoporosis (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:55:20.621105 -0400 EDT m=+314.893343376",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Osteoporosis (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:21-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/ead5a83d-6639-4a47-b3b2-658c614b73b0",
      resource: {
        resourceType: "Condition",
        id: "ead5a83d-6639-4a47-b3b2-658c614b73b0",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:54:49.019+00:00",
          source: "#EWagXxuah7SYmpeu",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:52a6b5a0-e32c-48e0-87bd-e498c26b735b",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "282291009",
                display: "Diagnosis",
              },
              {
                system: "http://loinc.org",
                code: "29308-4",
                display: "Diagnosis",
              },
            ],
            text: "Diagnosis",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "278516003",
              display: "Lobar pneumonia (disorder)",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.90",
              code: "J18.1",
              display: "Lobar pneumonia, unspecified organism",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:54:48.981865 -0400 EDT m=+283.254712584",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/cmshcc",
              code: "115",
              display: "Typhoid pneumonia",
              userSelected: false,
            },
          ],
          text: "Lobar pneumonia (disorder)",
        },
        subject: {
          reference: "Patient/b1888dd9-8841-45e4-8a64-e324e8b68cf4",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        onsetDateTime: "2022-01-27T09:59:00-06:00",
        recordedDate: "2022-01-27T09:47:54-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/f47d9e0d-d913-4816-affc-2a09c3e99aa7",
      resource: {
        resourceType: "Condition",
        id: "f47d9e0d-d913-4816-affc-2a09c3e99aa7",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:55:48.018+00:00",
          source: "#cMZVgCjFxTSXnvZY",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Permanent atrial fibrillation</td><td/><td id="problemstatus-1">Active</td></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:694492d2-8845-4b37-2b94-f1d671662966",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:a80d686b-1d8b-4ab5-43b8-f991c3e53fb6",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "440028005",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "I48.21",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "427.31",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:55:47.969645 -0400 EDT m=+342.241357251",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/8c1a8f5a-e867-40fd-8b86-ac515d6e1e38",
          type: "Patient",
          display: "Addington Barnaby Winston",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/fbd659a0-e368-48bf-a2a5-cc922c015f3b",
      resource: {
        resourceType: "Condition",
        id: "fbd659a0-e368-48bf-a2a5-cc922c015f3b",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:55:36.144+00:00",
          source: "#axyMVX3158EPr7vf",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761279">Atrial fibrillation(<div id="CON7761279">Confirmed</div>)</div></td><td/><td><div id="PROBST7761279">Active</div></td><td><div id="PROBHST7761279"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:62286bcb-9411-4373-a3be-01e1583d7955",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:16efdc1f-6a23-4f3f-9108-a0775caf0b64",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "15964901000119107",
              display: "Atypical atrial flutter (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:55:36.104964 -0400 EDT m=+330.376904834",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Atypical atrial flutter (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:12:41-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/89070a71-b77f-4623-b833-8ad0339697a8",
      resource: {
        resourceType: "Condition",
        id: "89070a71-b77f-4623-b833-8ad0339697a8",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:03:23.864+00:00",
          source: "#p2YEBz1P4EGYAP1e",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761219">Diabetes mellitus, type 2(<div id="CON7761219">Confirmed</div>)</div></td><td/><td><div id="PROBST7761219">Active</div></td><td><div id="PROBHST7761219"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:f633bede-ab03-475b-a5f3-58d44b845655",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dc69eb59-05c6-4a1c-8784-c00b702f0caa",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "44054006",
              display: "Diabetes mellitus type 2 (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:03:23.81658 -0400 EDT m=+798.079518751",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetes mellitus type 2 (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/10ebb4f3-65aa-4b3e-89c1-5d21f1a8c66b",
      resource: {
        resourceType: "Condition",
        id: "10ebb4f3-65aa-4b3e-89c1-5d21f1a8c66b",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:01:13.933+00:00",
          source: "#5hPNSf2nyXsz1bkl",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761209">Hypertension(<div id="CON7761209">Confirmed</div>)</div></td><td/><td><div id="PROBST7761209">Active</div></td><td><div id="PROBHST7761209"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2ecee151-a0f1-4155-a637-7e49ccd1b5c9",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:6521f566-336a-43df-912d-4f5b407d21e0",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "38341003",
              display: "Hypertensive disorder, systemic arterial (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:01:13.891759 -0400 EDT m=+668.157198001",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Hypertensive disorder, systemic arterial (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:00:24-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/2e92ad5d-284b-4f84-8f25-510eb975668a",
      resource: {
        resourceType: "Condition",
        id: "2e92ad5d-284b-4f84-8f25-510eb975668a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:07:35.551+00:00",
          source: "#79JJcV1Lxp85nMye",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Condition</th><th>Effective Dates</th><th>Status</th><th>Health Status</th><th>Informant</th></tr></thead><tbody><tr><td><div id="PROBLEM7761293">Diabetic neuropathy, painful(<div id="CON7761293">Confirmed</div>)</div></td><td/><td><div id="PROBST7761293">Active</div></td><td><div id="PROBHST7761293"/></td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:954f1c00-def6-4e6e-83ec-e9023d886895",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:886cfc62-a042-4d7f-b048-b13467a8fe1e",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
              {
                system: "http://loinc.org",
                code: "75326-9",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "230572002",
              display: "Diabetic neuropathy (disorder)",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:07:35.504827 -0400 EDT m=+1049.762921334",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Diabetic neuropathy (disorder)",
        },
        subject: {
          reference: "Patient/88d97f4c-79de-4094-99c3-ae1ac97c3bd9",
          type: "Patient",
          display: "WINSTON BARNABY ADDINGTON",
        },
        recordedDate: "2022-01-27T10:17:35-06:00",
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/b94c3e42-a4e3-47ee-9ee3-55ecb00c3b59",
      resource: {
        resourceType: "Condition",
        id: "b94c3e42-a4e3-47ee-9ee3-55ecb00c3b59",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:01:55.028+00:00",
          source: "#t0cfjqHP2Pe8dAqw",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-2">Strep throat</td><td/><td id="problemstatus-2"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dad5ff94-1cc1-48c8-2aaa-904602caea90",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8501e8cd-3dfc-413b-2093-6f95c4125571",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "J02.0",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "034.0",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:01:54.984238 -0400 EDT m=+709.248885834",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/af7eb97a-ad8a-47a2-951a-defe39030586",
      resource: {
        resourceType: "Condition",
        id: "af7eb97a-ad8a-47a2-951a-defe39030586",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T17:54:13.796+00:00",
          source: "#rLhZNFYp9UnSnXmL",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Contraception management</td><td/><td id="problemstatus-1"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:cd7adf0b-d985-4165-36ab-9eb3f48a0e06",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8bd49a06-7b53-41a9-4abf-7b22bffbf424",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "305058001",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "Z30.9",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "V25.9",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 13:54:13.743723 -0400 EDT m=+248.017248918",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c10e5f09-3805-484d-b9fc-e52f35b7d44a",
      resource: {
        resourceType: "Condition",
        id: "c10e5f09-3805-484d-b9fc-e52f35b7d44a",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:12:41.852+00:00",
          source: "#qAwVsFkYbe3ocboC",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-2">Strep throat</td><td/><td id="problemstatus-2"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:dad5ff94-1cc1-48c8-2aaa-904602caea90",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8501e8cd-3dfc-413b-2093-6f95c4125571",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "J02.0",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "034.0",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:12:41.797491 -0400 EDT m=+1356.049689501",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/d54ae5b4-dea1-4a68-af9a-a1f1462c4311",
      resource: {
        resourceType: "Condition",
        id: "d54ae5b4-dea1-4a68-af9a-a1f1462c4311",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:06:51.913+00:00",
          source: "#9l5bpfIJmqPsTa7L",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="problem-1">Contraception management</td><td/><td id="problemstatus-1"/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:cd7adf0b-d985-4165-36ab-9eb3f48a0e06",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:8bd49a06-7b53-41a9-4abf-7b22bffbf424",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "404684003",
                display: "Finding",
              },
            ],
            text: "Finding",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "305058001",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.3",
              code: "Z30.9",
            },
            {
              system: "urn:oid:2.16.840.1.113883.6.103",
              code: "V25.9",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:06:51.87078 -0400 EDT m=+1006.129714209",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
        },
        subject: {
          reference: "Patient/3bf92eeb-6fc8-4790-8e8c-6d47ff1fcb39",
          type: "Patient",
          display: "Margaret Adelia B Devereaux",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/a26b31e8-29f7-4de3-b975-1cdaa542c7e2",
      resource: {
        resourceType: "Condition",
        id: "a26b31e8-29f7-4de3-b975-1cdaa542c7e2",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:07:05.458+00:00",
          source: "#ZkUlL80cO4GRNjjD",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "282291009",
                display: "Diagnosis",
              },
            ],
            text: "Diagnosis",
          },
        ],
        code: {
          coding: [
            {
              system: "urn:oid:2.16.840.1.113883.6.90",
              code: "L81.4",
              display: "- Other melanin hyperpigmentation L81.4",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:07:05.420036 -0400 EDT m=+1019.678709251",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "- Other melanin hyperpigmentation L81.4",
        },
        subject: {
          reference: "Patient/83069002-6e14-41d0-9b0d-f96af6f915aa",
          type: "Patient",
          display: "The Patient",
        },
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/c71aa766-0046-44e7-93c8-44b560a63312",
      resource: {
        resourceType: "Condition",
        id: "c71aa766-0046-44e7-93c8-44b560a63312",
        meta: {
          versionId: "4",
          lastUpdated: "2022-08-17T18:12:58.582+00:00",
          source: "#lra3HA01BQsBT27p",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
          ],
        },
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
            },
          ],
        },
        code: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "F411",
              display: "Generalized anxiety disorder",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:12:58.519832 -0400 EDT m=+1372.771708459",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Generalized anxiety disorder",
        },
        subject: {
          reference: "Patient/9e190a15-8265-403b-88f9-31e444560ef5",
          type: "Patient",
          display: "Wesley Marsden",
        },
        asserter: {
          reference: "Practitioner/386bb1d3-82bb-48f9-a80c-650374197e51",
          type: "Practitioner",
          display: "Carlos Mendoza",
        },
        note: [
          {
            text: "Prescriber/Prescriber Supplied - The diagnosis was given or supplied by the prescriber.",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
    {
      fullUrl:
        "https://api.dev.zusapi.com/fhir/Condition/0f32d94e-dce5-473d-8894-3db6fde5ad6c",
      resource: {
        resourceType: "Condition",
        id: "0f32d94e-dce5-473d-8894-3db6fde5ad6c",
        meta: {
          versionId: "1",
          lastUpdated: "2022-08-17T19:21:41.723+00:00",
          source: "#wtJwRrMTuGVLSZNu",
          tag: [
            {
              system: "https://zusapi.com/lens",
              code: "ChronicConditions",
            },
            {
              system: "https://zusapi.com/accesscontrol/owner",
              code: "builder/d957dd15-d34b-4054-9fda-01bf80b3d325",
              display: "devtest1208",
            },
          ],
        },
        text: {
          status: "generated",
          div: '<div xmlns="http://www.w3.org/1999/xhtml"><table><thead><tr><th>Medical Problem</th><th>Onset Date</th><th>Status</th></tr></thead><tbody><tr><td id="m-problem-1">Strep throat</td><td>Unknown</td><td/></tr></tbody></table></div>',
        },
        identifier: [
          {
            use: "usual",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:821b22d2-5199-42ba-09ba-5fcd5aa4ae74",
          },
          {
            use: "secondary",
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:0e168a02-5bd0-4421-9eb4-cb7ae03f24a7",
          },
          {
            system: "https://zushealth.com/system/commonwellconnectorservice",
            value: "dev-resource",
          },
        ],
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
          text: "Active",
        },
        category: [
          {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "55607006",
                display: "Problem",
              },
            ],
            text: "Problem",
          },
        ],
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "43878008",
              display: "Pharyngitis due to Streptococcus species",
            },
            {
              extension: [
                {
                  url: "https://zusapi.com/terminology/enrichment",
                  valueString:
                    "2022-08-17 14:06:05.911754 -0400 EDT m=+960.171572418",
                },
              ],
              system: "http://terminology.hl7.org/CodeSystem/v3-NullFlavor",
              code: "UNK",
              display: "unknown",
              userSelected: false,
            },
          ],
          text: "Pharyngitis due to Streptococcus species",
        },
        subject: {
          reference: "Patient/a120442b-58b8-4b39-bf42-1c85016de990",
          type: "Patient",
          display: "SOLOMAN BERGAMEL",
        },
        recordedDate: "2020-01-13",
        note: [
          {
            text: "Strep throat",
          },
        ],
      },
      search: {
        mode: "match",
      },
    },
  ],
};
