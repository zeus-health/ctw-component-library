import xpath from "xpath";

export const getMaritalStatus = (patient: Document): string =>
  String(xpath.select1("string(*[name()='maritalStatusCode']/@displayName)", patient));
