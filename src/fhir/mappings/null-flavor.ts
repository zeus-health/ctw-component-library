import type { Coding } from "fhir/r4";
import { SYSTEM_NULL_FLAVOR } from "@/fhir/system-urls";

export const isNullFlavorSystem = (coding: Coding | string | undefined) => {
  if (typeof coding === "string") return coding === SYSTEM_NULL_FLAVOR;
  return coding?.system === SYSTEM_NULL_FLAVOR;
};

export const NullFlavorSystem = {
  NI: { display: "NoInformation", level: 1 },
  INV: { display: "invalid", level: 2 },
  DER: { display: "derived", level: 3 },
  OTH: { display: "other", level: 3 },
  NINF: { display: "negative infinity", level: 4 },
  PINF: { display: "positive infinity", level: 4 },
  UNC: { display: "un-encoded", level: 3 },
  MSK: { display: "masked", level: 2 },
  NA: { display: "not applicable", level: 2 },
  UNK: { display: "unknown", level: 2 },
  ASKU: { display: "asked but unknown", level: 3 },
  NAV: { display: "temporarily unavailable", level: 4 },
  NASK: { display: "not asked", level: 3 },
  NAVU: { display: "Not available", level: 3 },
  QS: { display: "Sufficient Quantity", level: 3 },
  TRC: { display: "trace", level: 3 },
  NP: { display: "not present", level: 1 },
};
