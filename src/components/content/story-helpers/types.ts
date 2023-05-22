export type BundleCaches = {
  builder: fhir4.Bundle;
  outside: fhir4.Bundle;
};

export function newBundleCaches(): BundleCaches {
  return {
    builder: DummyBundle,
    outside: DummyBundle,
  };
}

const DummyBundle: fhir4.Bundle = {
  resourceType: "Bundle",
  type: "searchset",
};
