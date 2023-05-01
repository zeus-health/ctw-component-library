export const patientHistoryMessage = {
  data: [
    {
      type: "patient-history/jobs",
      id: "2ffbe3f8-817e-44a5-b2dd-09aee727501e",
      attributes: {
        createdAt: "1682695506",
        requestConsent: true,
        practitioner: {
          npi: "1568511573",
          name: "Test",
          role: "doctor",
        },
        providers: [
          {
            service: "commonwell",
            status: "done",
          },
          {
            service: "surescripts",
            status: "done",
          },
        ],
      },
      relationships: {
        patient: {
          data: { type: "fhir/Patient", id: "168a6cf7-8fc2-4b85-8323-6d9828a534e9" },
        },
      },
    },
  ],
};
