import { getInFulfillmentOfData } from "./data";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { isEmpty } from "@/utils/nodash";

export const InFulfillmentOf = ({ document }: DocumentOnlyProps) => {
  const inFulfillmentOfs = getInFulfillmentOfData(document);

  if (isEmpty(inFulfillmentOfs)) return null;

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
