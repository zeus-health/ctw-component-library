import { isEmpty } from "lodash";
import { Table } from "../Table/Table";
import { DocumentOnlyProps } from "../../types";
import { getInFulfillmentOfData } from "./data";

export const InFulfillmentOf = ({ document }: DocumentOnlyProps) => {
  const inFulfillmentOfs = getInFulfillmentOfData(document);

  if (!inFulfillmentOfs || isEmpty(inFulfillmentOfs)) return null;

  const finalData = inFulfillmentOfs.flatMap((inFulfillmentOf) => [
    {
      label: "In Fulfillment Of",
      value: `Order: ${inFulfillmentOf[0].value || "Unknown"}, ${
        // [0] is id
        inFulfillmentOf[1].value || "Unknown" // [1] is code
      }`,
    },
    { label: "", value: "" },
  ]);

  return <Table data={finalData} />;
};
