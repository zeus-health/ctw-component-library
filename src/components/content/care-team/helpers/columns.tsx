import { TableColumn } from "@/components/core/table/table-helpers";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";

export const patientCareTeamColumns: TableColumn<CareTeamPractitionerModel>[] = [
  {
    widthPercent: 20,
    minWidth: 150,
    title: "Practitioner",
    render: (careTeam) => (
      <>
        <div>{careTeam.practitionerName}</div>
        <div>{careTeam.managingOrganization}</div>
      </>
    ),
  },
  {
    widthPercent: 20,
    minWidth: 150,
    title: "Role",
    render: (careTeam) => <div>{careTeam.role}</div>,
  },
  {
    widthPercent: 20,
    minWidth: 150,
    title: "Specialty",
    render: (careTeam) => <div>{careTeam.qualification}</div>,
  },
  {
    widthPercent: 20,
    minWidth: 150,
    title: "Noted On",
    render: (careTeam) => <div>{careTeam.effectiveStartDate}</div>,
  },
];
