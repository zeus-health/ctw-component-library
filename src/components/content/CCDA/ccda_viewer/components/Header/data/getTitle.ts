import xpath from "xpath";
import { formatDate, parseToISOString } from "../../../helpers";

export const getTitle = (document: Document): string => {
  const title = String(
    xpath.select1(
      "string(*[name()='ClinicalDocument']/*[name()='title']/text())",
      document
    )
  );

  const effectiveTime = parseToISOString(
    String(
      xpath.select1(
        "string(*[name()='ClinicalDocument']/*[name()='effectiveTime']/@value)",
        document
      )
    )
  );

  const date = formatDate(effectiveTime);

  return `${title} (${date})`;
};
