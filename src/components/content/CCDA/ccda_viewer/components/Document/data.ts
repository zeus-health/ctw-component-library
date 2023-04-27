import xpath from "xpath";
import { formatDate, getId, parseToISOString } from "../../helpers";

const confidentialityCodeMap: Record<string, string> = {
  N: "normal",
  R: "restricted",
  V: "very restricted",
};
export const getDocumentData = (document: Document) => {
  const id = getId(
    xpath.select1("*[name()='ClinicalDocument']/*[name()='id']", document) as Document
  );

  const effectiveTimeValue = parseToISOString(
    String(
      xpath.select1(
        "string(*[name()='ClinicalDocument']/*[name()='effectiveTime']/@value)",
        document
      )
    )
  );

  const createdOn = formatDate(effectiveTimeValue);

  const version = String(
    xpath.select1("string(*[name()='ClinicalDocument']/*[name()='versionNumber']/@value)", document)
  );
  const setId = getId(
    xpath.select1("*[name()='ClinicalDocument']/*[name()='setId']", document) as Document
  );
  const confidentialityCode =
    confidentialityCodeMap[
      String(
        xpath.select1(
          "string(*[name()='ClinicalDocument']/*[name()='confidentialityCode']/@code)",
          document
        )
      )
    ];
  const code = String(
    xpath.select1("string(*[name()='ClinicalDocument']/*[name()='code']/@displayName)", document)
  );
  const languageCode = String(
    xpath.select1("string(*[name()='ClinicalDocument']/*[name()='languageCode']/@code)", document)
  );
  return {
    id,
    createdOn,
    version,
    setId,
    confidentialityCode,
    code,
    languageCode,
  };
};
