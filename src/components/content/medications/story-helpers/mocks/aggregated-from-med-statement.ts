export const aggregatedFromMedStatement = {
  resourceType: "MedicationStatement",
  id: "8dc0812d",
  extension: [
    {
      url: "https://zusapi.com/lens/extension/aggregatedFrom",
      extension: [
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationDispense/d88a5a54-8a45-4027-ab9e-233e80fc8899",
            type: "MedicationDispense",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationDispense/4c19932e-500f-4738-8600-54dec77f343d",
            type: "MedicationDispense",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationDispense/99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",
            type: "MedicationDispense",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationDispense/fa20f4e2-8a10-4555-952c-07d622fdcb50",
            type: "MedicationDispense",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationDispense/6b16e363-662e-401f-9f3f-5323f81f2149",
            type: "MedicationDispense",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference: "MedicationRequest/6a16eba4-7d86-4e4a-8005-34367553ca05",
            type: "MedicationRequest",
          },
        },
        {
          url: "https://zusapi.com/lens/extension/aggregatedFrom",
          valueReference: {
            reference:
              "MedicationStatement/0e1e097b-eed6-4c1f-b508-314f2fd8ee96",
            type: "MedicationStatement",
          },
        },
      ],
    },
    {
      url: "https://zusapi.com/lens/extension/medicationLastFillDate",
      valueDateTime: "2022-11-07",
    },
    {
      url: "https://zusapi.com/lens/extension/medicationLastPrescribedDate",
      valueDateTime: "2021-08-01",
    },
    {
      url: "https://zusapi.com/lens/extension/medicationQuantity",
      valueQuantity: {
        value: 90,
        unit: "days",
      },
    },
    {
      url: "https://zusapi.com/lens/extension/medicationDaysSupply",
      valueQuantity: {
        value: 90,
      },
    },
    {
      url: "https://zusapi.com/lens/extension/medicationRefills",
      valueUnsignedInt: 4,
    },
    {
      url: "https://zusapi.com/lens/extension/medicationLastPrescriber",
      valueReference: {
        reference: "Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",
        type: "Practitioner",
        display: "Sally McCann",
      },
    },
    {
      url: "https://zusapi.com/fhir/identifier/universal-id",
      valueString: "f5ba64c5-4f66-45cf-b07d-84ed828138e0",
    },
  ],
  status: "active",
  subject: {
    reference: "Patient/0790b2c2-b8ca-4697-a541-f4486c6e89f8",
    type: "Patient",
  },
} as fhir4.MedicationStatement;
