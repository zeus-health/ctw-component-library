import { TableColumn } from "@/components/core/table/table-helpers";
import { ViewFHIR } from "@/components/core/view-fhir";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";

export const patientCareTeamColumns = (includeViewFhirResource = true) => {
  const careTeamColumns: TableColumn<CareTeamPractitionerModel>[] = [
    // {
    //   widthPercent: 20,
    //   minWidth: 150,
    //   title: "Start Date",
    //   render: (careTeam) => <div>{careTeam.periodStart}</div>,
    // },
    {
      widthPercent: 20,
      minWidth: 150,
      title: "Practitioner",
      render: (careTeam) => <div>{careTeam.PractitionerName}</div>,
    },
    // {
    //   widthPercent: 20,
    //   minWidth: 150,
    //   title: "Role",
    //   render: (careTeam) => <div>{careTeam.role}</div>,
    // },
    // {
    //   widthPercent: 20,
    //   minWidth: 150,
    //   title: "Qualification",
    //   render: (careTeam) => <div>{careTeam.practitionerQualification}</div>,
    // },
  ];

  if (includeViewFhirResource) {
    careTeamColumns.push({
      widthPercent: 20,
      minWidth: 150,
      render: (careTeam: CareTeamPractitionerModel) => (
        <ViewFHIR name="CareTeam Resource" resource={careTeam.careTeam} />
      ),
    });
  }

  return careTeamColumns;
};
