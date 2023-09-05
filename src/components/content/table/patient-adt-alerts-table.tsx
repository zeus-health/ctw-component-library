import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { TableOptionProps } from "../patients/patients-table";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { Table } from "@/components/core/table/table";

export type PatientsADTTableProps = {
  className?: cx.Argument;
  handleRowClick?: (row: PatientModel) => void;
  pageSize?: number;
  title?: string;
  data: PatientModel[];
} & TableOptionProps<PatientModel>;

export const PatientsADTAlertsTable = withErrorBoundary(
  ({
    className,
    handleRowClick,
    pageSize = 5,
    title = "Patients ADT Alerts",
    data,
  }: PatientsADTTableProps) => (
    // This resets our state when there is an error fetching patients from ODS.

    <AnalyticsProvider componentName="PatientsTable">
      <CTWBox.StackedWrapper
        className={cx("ctw-patients-border ctw-patients-table-inputs", className)}
      >
        <CTWBox.Heading title={title}>
          <div className="ctw-relative">
            <div className="ctw-search-icon-wrapper">
              <SearchIcon className="ctw-search-icon" />
            </div>
          </div>
        </CTWBox.Heading>
        <div className="ctw-overflow-hidden">
          <Table
            records={data}
            columns={columns}
            handleRowClick={handleRowClick}
            pageSize={pageSize}
            hidePagination
          />
        </div>
      </CTWBox.StackedWrapper>
    </AnalyticsProvider>
  ),
  "PatientsTable"
);

const columns: TableColumn<PatientModel>[] = [
  {
    title: "Name",
    render: (patient) => <PatientNameColumn patient={patient} />,
  },
  {
    title: "Contact",
    render: ({ email, phoneNumber }) => (
      <>
        <div className="ctw-patients-table-inputs-email">{email}</div>
        <div className="ctw-patients-table-inputs-phone">{phoneNumber}</div>
      </>
    ),
  },
];

type PatientNameColumnProps = {
  patient: PatientModel;
};

const PatientNameColumn = ({ patient }: PatientNameColumnProps) => (
  <div className="ctw-flex ctw-items-center">
    <div className="ctw-ml-4">
      <div className="ctw-flex ctw-font-medium">
        <div className="ctw-max-w-xs">{patient.fullName}</div>
        {patient.gender && <div className="ctw-uppercase"> ({patient.gender[0]})</div>}
      </div>
      <div className="ctw-text-content-lighter">
        {patient.dob} ({patient.age})
      </div>
    </div>
  </div>
);
