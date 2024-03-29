import { differenceInYears, format, isValid, parseISO } from "date-fns";
import xpath from "xpath";
import { getGuardian } from "./getGuardian";
import { getHumanName, getId, parseToISOString } from "../../../helpers";
import { LabelValueType } from "../../../types";
import { map } from "@/utils/nodash";

export const getPatient = (document: Document): Record<string, LabelValueType[] | undefined> => {
  const patientRoles = xpath.select(
    "*[name()='ClinicalDocument']/*[name()='recordTarget']/*[name()='patientRole']",
    document
  ) as Document[];

  const result = patientRoles.map(
    (
      patientRole
    ): {
      patient: LabelValueType[];
      guardian: LabelValueType[] | undefined;
    } => {
      const patient = xpath.select1("*[name()='patient']", patientRole) as Document;

      const patientName = getHumanName(xpath.select1("*[name()='name']", patient) as Document);

      const patientIds = (xpath.select("*[name()='id']", patientRole) as Document[])
        .map(getId)
        .join(", ");

      const administrativeGenderCode = String(
        xpath.select1("string(*[name()='administrativeGenderCode']/@displayName)", patient)
      );

      const birthTime = parseISO(
        parseToISOString(String(xpath.select1("string(*[name()='birthTime']/@value)", patient)))
      );

      const deceasedTime = parseISO(
        parseToISOString(
          String(xpath.select1("string(*[name()='sdtc:deceasedTime']/@value)", patient))
        )
      );

      const deceasedInd =
        String(xpath.select1("string(*[name()='sdtc:deceasedInd']/@value)", patient)) === "true";

      const withDeceased = deceasedInd
        ? "deceased"
        : differenceInYears(isValid(deceasedTime) ? deceasedTime : new Date(), birthTime);
      const dateOfBirth = `${format(birthTime, "MMMM dd, yyyy")} (${withDeceased}${
        deceasedInd ? "" : " yr"
      }${isValid(deceasedTime) ? " - deceased" : ""})`;

      const guardian = getGuardian(patientRole);

      return {
        patient: [
          { label: "Name:", value: patientName },
          {
            label: "ID:",
            value: patientIds,
          },
          {
            label: "Date of birth:",
            value: dateOfBirth,
          },
          { label: "Gender:", value: administrativeGenderCode },
        ],
        guardian,
      };
    }
  );

  return map(result, (res) => [res.patient, res.guardian]).reduce(
    (acc, val, index) => ({
      ...acc,
      [`patient${index + 1}`]: val[0],
      [`guardian${index + 1}`]: val[1],
    }),
    {}
  );
};
