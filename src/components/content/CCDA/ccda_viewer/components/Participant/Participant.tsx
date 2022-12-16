import { isEmpty } from "lodash";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { getParticipantData } from "./data";

export const Participant = ({ document }: DocumentOnlyProps) => {
  const participants = getParticipantData(document);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!participants || isEmpty(participants)) return null;

  const finalData = participants.flatMap((participant) => [
    {
      label: "Participant",
      value: `${participant.name}${
        participant.relationship ? ` - ${participant.relationship}` : ""
      }`,
    },
    {
      label: "Contact Details",
      value: participant.contactDetails,
    },
  ]);

  return <Table data={finalData} />;
};
