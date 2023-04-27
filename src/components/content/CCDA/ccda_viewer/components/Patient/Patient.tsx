import { getPatientData } from "./data";
import { DocumentOnlyProps, TableInfo } from "../../types";
import { Table } from "../Table/Table";
import { isArray, isEmpty } from "@/utils/nodash";

export const Patient = ({ document }: DocumentOnlyProps): JSX.Element | null => {
  const patients = getPatientData(document);

  if (!patients || isEmpty(patients)) return null;

  return (
    <>
      {patients.map((patient) => {
        const finalData: ([TableInfo, TableInfo] | TableInfo)[] = [
          { label: "Patient", value: patient.name },
          { label: "Contact Details", value: patient.contactDetails },

          { label: "Date Of Birth", value: patient.dateOfBirth },
          { label: "Gender", value: patient.gender },

          { label: "Race", value: patient.race },
          { label: "Ethnicity", value: patient.ethnicity },

          { label: "Patient ID", value: patient.patientId },
          { label: "Language", value: patient.language },

          { label: "Marital Status", value: patient.maritalStatus },
          { label: "Religion", value: patient.religion },

          { label: "Birth Place", value: patient.birthPlace },

          ...(patient.guardian.map((guardian) => [
            { label: "Guardian", value: guardian.name },
            { label: "Contact Details", value: guardian.contactDetails },
          ]) as [TableInfo, TableInfo][]), // ts does not understand, we must explicitly state it is ok

          [
            {
              label: "Provider Organization",
              value: patient.providerOrganization,
            },
            {
              label: "Contact Details (Organization)",
              value: patient.providerOrganizationContactDetails,
            },
          ],
        ];

        return (
          <Table
            key={`${patient.patientId}-${patient.name}-${patient.dateOfBirth}`}
            data={finalData.filter((d) => isArray(d) || d.value)}
          />
        );
      })}
    </>
  );
};
