import xpath from "xpath";
import { getHumanName } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { isEmpty } from "@/utils/nodash";

export const getGuardian = (
  patientRole: Document
): LabelValueType[] | undefined => {
  const guardians = xpath.select(
    "*[name()='patient']/*[name()='guardian']",
    patientRole
  ) as Document[];

  if (isEmpty(guardians)) return undefined;

  return guardians.map((guardian) => {
    const guardianPerson = xpath.select1(
      "*[name()='guardianPerson']",
      guardian
    ) as Document;

    const relationship = String(
      xpath.select1("string(*[name()='code']/@displayName)", guardian)
    );
    const name = getHumanName(
      xpath.select("*[name()='name']", guardianPerson) as Document[]
    );

    const withRelationship = relationship ? ` - ${relationship}` : "";
    return {
      label: "",
      value: `${name}${withRelationship}`,
    };
  });
};
