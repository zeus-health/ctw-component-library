import { TableColumn } from "@/components/core/table/table-helpers";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";

export const patientCareTeamColumns: TableColumn<CareTeamPractitionerModel>[] = [
  {
    widthPercent: 30,
    minWidth: 150,
    title: "Provider",
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
    widthPercent: 30,
    minWidth: 150,
    title: "Specialty",
    render: (careTeam) => <div>{careTeam.specialty}</div>,
  },
  {
    widthPercent: 20,
    minWidth: 150,
    title: "Last Updated",
    render: (careTeam) => <div>{careTeam.effectiveEndDate}</div>,
  },
];
