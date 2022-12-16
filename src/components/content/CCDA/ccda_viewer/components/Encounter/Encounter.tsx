import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getEncounterData } from "./data";

export const Encounter = ({ document }: DocumentOnlyProps) => {
  const encounter = getEncounterData(document);

  if (!encounter) return null;

  const { dischargeDisposition, encounterLocation, id, type, dateTime } =
    encounter;

  const finalData = [
    {
      label: "Encounter",
      value:
        dateTime.value ||
        dischargeDisposition ||
        encounterLocation ||
        id.value ? (
          <>
            <b>ID: </b>
            {id.value || "Unknown"}
            {type.value && (
              <>
                <br />
                <b>Type: </b>
                {type.value}
              </>
            )}
          </>
        ) : null,
    },
    {
      label: "Date/Time",
      value: dateTime.value,
    },
    {
      label: "Discharge Disposition",
      value: dischargeDisposition,
    },
    {
      label: "Encounter Location",
      value: encounterLocation,
    },
  ];

  return <Table data={finalData} />;
};
