export const THIRD_PARTY_SOURCE_SYSTEM = "https://zusapi.com/thirdparty/source";

export const isRenderableBinary = (doc: fhir4.Resource): boolean => {
  const thirdPartyTag = doc.meta?.tag?.find((tag) => tag.system === THIRD_PARTY_SOURCE_SYSTEM);
  const isSupportedThirdParty = ["commonwell", "carequality"].includes(thirdPartyTag?.code || "");
  return isSupportedThirdParty;
};
