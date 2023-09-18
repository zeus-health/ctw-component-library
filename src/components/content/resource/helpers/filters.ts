export const THIRD_PARTY_SOURCE_SYSTEM = "https://zusapi.com/thirdparty/source";

const isFromThirdParties = (doc: fhir4.Resource, thirdParties: string[]): boolean => {
  const thirdPartyTag = doc.meta?.tag?.find((tag) => tag.system === THIRD_PARTY_SOURCE_SYSTEM);
  return thirdParties.includes(thirdPartyTag?.code || "");
};

export const isRenderableBinary = (doc: fhir4.Resource): boolean =>
  isFromThirdParties(doc, ["commonwell", "carequality"]);
export const isADT = (doc: fhir4.Resource): boolean =>
  isFromThirdParties(doc, ["bamboohealth", "collective-medical"]);
