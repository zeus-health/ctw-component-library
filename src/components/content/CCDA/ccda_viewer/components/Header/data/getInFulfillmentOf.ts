import xpath from "xpath";
import { getId } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { isEmpty } from "@/utils/nodash";

export const getInFulfillmentOf = (
  document: Document
): Record<string, LabelValueType[]> | undefined => {
  const orderXmls = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='inFulfillmentOf']/*[name()='order']",
    document
  ) as Document[];

  if (isEmpty(orderXmls)) return undefined;

  const orders = orderXmls.map((orderXml) => {
    const id = getId(xpath.select1("*[name()='id']", orderXml) as Document);
    const code = String(
      xpath.select1("string(*[name()='code']/@displayName)", orderXml)
    );

    return [
      { label: "Order ID:", value: id },
      { label: "Code:", value: code },
    ];
  });

  return orders.reduce(
    (acc, order, index) => ({ ...acc, [`inFulfillmentOf${index + 1}`]: order }),
    {}
  );
};
