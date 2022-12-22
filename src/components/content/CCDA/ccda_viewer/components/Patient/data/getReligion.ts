import xpath from "xpath";

export const getReligion = (patient: Document): string =>
  String(
    xpath.select1(
      "string(*[name()='religiousAffiliationCode']/@displayName)",
      patient
    )
  );
