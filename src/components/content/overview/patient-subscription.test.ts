import { getDataSources } from "./patient-subscription";
import { PatientSubscription } from "@/services/subscriptions/subscriptions";

describe("getDataSources", () => {
  // Define test data
  const mockPatientSubscription: PatientSubscription = {
    patientId: "123",
    package: {
      id: "123",
      name: "Test",
      description: "Test",
      meta: {
        freshmakerProviders: ["commonwell"],
        initialProviders: ["bamboo"],
        subscriptionProviders: ["test", "bamboo"],
        recurringProvidersWithInterval: [{ provider: "commonwell", intervalDays: 7 }],
      },
    },
  };

  it("should return an array of translated data sources with details", () => {
    const result = getDataSources(mockPatientSubscription);

    const expectedOutput = [
      {
        name: "EHR Network",
        details: ["intelligent refresh"],
      },
      {
        name: "ADT",
        details: ["initial history pull", "new data alerts"],
      },
      {
        name: "test",
        details: ["new data alerts"],
      },
    ];

    expect(result).toEqual(expectedOutput);
  });
});
