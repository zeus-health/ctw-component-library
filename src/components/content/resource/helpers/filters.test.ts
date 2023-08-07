import { Reference } from "fhir/r4";
import { isRenderableBinary, THIRD_PARTY_SOURCE_SYSTEM } from "./filters";
import { ZUS_CREATION_DATE_URL } from "../../document/helpers/filters";
import { createMockDocRef } from "../../document/helpers/filters.test";

interface MockProvenanceProps {
  id: string;
  zusCreationDate?: string;
  thirdPartyOwner?: string;
  docRefDate?: string;
  target: Reference[];
}

export const createMockProvenance = (props: MockProvenanceProps): fhir4.Provenance => ({
  id: props.id,
  resourceType: "Provenance",
  agent: [],
  recorded: props.docRefDate || "",
  meta: {
    extension: [
      {
        url: ZUS_CREATION_DATE_URL,
        valueInstant: props.zusCreationDate,
      },
    ],
    tag: props.thirdPartyOwner
      ? [
          {
            system: THIRD_PARTY_SOURCE_SYSTEM,
            code: props.thirdPartyOwner,
          },
        ]
      : undefined,
  },
  target: props.target,
});

describe("isRenderableBinary tests", () => {
  describe("Test on DocumentReferences", () => {
    const commonwellDoc = createMockDocRef({
      id: "1",
      title: "commonwell doc",
      thirdPartyOwner: "commonwell",
      postRainbowCategories: true,
    });
    const carequalityDoc = createMockDocRef({
      id: "2",
      title: "carequality doc",
      thirdPartyOwner: "carequality",
      postRainbowCategories: true,
    });
    const bambooDoc = createMockDocRef({
      id: "3",
      title: "bamboo doc",
      thirdPartyOwner: "bamboo",
      postRainbowCategories: true,
    });
    const randomDoc = createMockDocRef({
      id: "3",
      title: "random doc",
      thirdPartyOwner: "random",
      postRainbowCategories: true,
    });

    test("commonwell docs are renderable", () => {
      expect(isRenderableBinary(commonwellDoc)).toBeTruthy();
    });
    test("carequality docs are renderable", () => {
      expect(isRenderableBinary(carequalityDoc)).toBeTruthy();
    });
    test("other docs are unrenderable", () => {
      expect(isRenderableBinary(bambooDoc)).toBeFalsy();
      expect(isRenderableBinary(randomDoc)).toBeFalsy();
    });
  });

  describe("Test on Provenances", () => {
    const commonwellProvenance = createMockProvenance({
      id: "1",
      thirdPartyOwner: "commonwell",
      target: [{}],
    });
    const carequalityProvenance = createMockProvenance({
      id: "2",
      thirdPartyOwner: "carequality",
      target: [{}],
    });
    const bambooProvenance = createMockProvenance({
      id: "3",
      thirdPartyOwner: "bamboo",
      target: [{}],
    });
    const randomProvenance = createMockProvenance({
      id: "4",
      thirdPartyOwner: "random",
      target: [{}],
    });

    test("commonwell provenances are renderable", () => {
      expect(isRenderableBinary(commonwellProvenance)).toBeTruthy();
    });
    test("carequality provenances are renderable", () => {
      expect(isRenderableBinary(carequalityProvenance)).toBeTruthy();
    });
    test("other provenances are unrenderable", () => {
      expect(isRenderableBinary(bambooProvenance)).toBeFalsy();
      expect(isRenderableBinary(randomProvenance)).toBeFalsy();
    });
  });
});
