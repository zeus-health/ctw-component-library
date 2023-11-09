import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";

export const matchedPatientsColumns: TableColumn<PatientModel>[] = [
  {
    widthPercent: 30,
    title: "Source",
    render: (matchedPatient) => (
      <div className="ctw-stacked-concat">
        <div>{capitalize(matchedPatient.organizationDisplayName)}</div>
        <div>Created {matchedPatient.createdAtDisplay}</div>
      </div>
    ),
  },
  {
    widthPercent: 30,
    title: "Patient Details",
    render: (matchedPatient) => (
      <div className="ctw-stacked-concat">
        <div>{matchedPatient.display}</div>
        <div>
          <span>
            {matchedPatient.dob} ({matchedPatient.age})
          </span>
          <span> {capitalize(matchedPatient.gender)}</span>
        </div>
        <div />
      </div>
    ),
  },
  {
    widthPercent: 40,
    title: "Contact Info",
    render: (matchedPatient) => (
      <div className="ctw-stacked-concat">
        <div>{matchedPatient.phoneNumber}</div>
        <div>{matchedPatient.email}</div>
        <div>{matchedPatient.homeAddress?.line?.join(" ")}</div>
        <div>
          {matchedPatient.homeAddress?.city} {matchedPatient.homeAddress?.state},{" "}
          {matchedPatient.homeAddress?.postalCode}
        </div>
      </div>
    ),
  },
];
