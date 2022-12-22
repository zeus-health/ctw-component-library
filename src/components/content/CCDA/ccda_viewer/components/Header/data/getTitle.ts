import xpath from "xpath";
import { ccdaDatetimeToISO, displayDateTimeasString } from "@/fhir/formatters";

export const getTitle = (document: Document): string => {
  const title = String(
    xpath.select1(
      "string(*[name()='ClinicalDocument']/*[name()='title']/text())",
      document
    )
  );

  const effectiveTime = ccdaDatetimeToISO(
    String(
      xpath.select1(
        "string(*[name()='ClinicalDocument']/*[name()='effectiveTime']/@value)",
        document
      )
    )
  );

  return `${title} (${displayDateTimeasString(effectiveTime)})`;
};
