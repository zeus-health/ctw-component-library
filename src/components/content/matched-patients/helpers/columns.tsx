import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { capitalize } from "@/utils/nodash";
import { render } from "react-dom";

const differingDataClass = "ctw-font-medium ctw-text-error-main";

export const getMatchedPatientsColumns = (
  builderPatient: PatientModel
): TableColumn<PatientModel>[] => [
  {
    widthPercent: 30,
    title: "Name/DOB/Gender",
    render: (matchedPatient) => (
      <div className="ctw-stacked-concat">
        <div>{matchedPatient.display}</div>
        <div>
          <span>
            {matchedPatient.dob} ({matchedPatient.age})
          </span>
          <span> {capitalize(matchedPatient.gender)}</span>
        </div>
        <div></div>
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
  {
    widthPercent: 30,
    title: "Data Source",
    render: (matchedPatient) => (
      <div className="ctw-stacked-concat">
        <div>{capitalize(matchedPatient.organizationDisplayName)}</div>
        <div>Created {matchedPatient.createdAtDisplay}</div>
      </div>
    ),
  },
];
