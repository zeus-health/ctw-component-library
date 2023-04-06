import { getParticipantData } from "./data";
import { DocumentOnlyProps } from "../../types";
import { Table } from "../Table/Table";
import { isEmpty } from "@/utils/nodash";

export const Participant = ({ document }: DocumentOnlyProps) => {
  const participants = getParticipantData(document);

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
