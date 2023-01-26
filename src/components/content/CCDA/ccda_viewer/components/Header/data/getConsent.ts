import xpath from "xpath";
import { getId } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { isEmpty } from "@/utils/nodash";

export const getConsent = (
  document: Document
): Record<string, LabelValueType[]> | undefined => {
  const consents = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='authorization']/*[name()='consent']",
    document
  ) as Document[];

  if (isEmpty(consents)) return undefined;

  const result = consents.map((consent) => {
    const id = getId(xpath.select1("*[name()='id']", consent) as Document);
    const code = String(
      xpath.select1("string(*[name()='code']/@displayName)", consent)
    );
    const status = String(
      xpath.select1("string(*[name()='statusCode']/@code)", consent)
    );
    return [
      { label: "ID:", value: id },
      { label: "Code:", value: code },
      { label: "Status:", value: status },
    ];
  });

  return result.reduce(
    (acc, order, index) => ({ ...acc, [`consent${index + 1}`]: order }),
    {}
  );
};
