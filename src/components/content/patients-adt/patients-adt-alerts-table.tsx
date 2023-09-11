import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { TableOptionProps } from "../patients/patients-table";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { SimpleMoreList } from "@/components/core/simple-more-list";
import { Table } from "@/components/core/table/table";
import { EncounterModel } from "@/fhir/models/encounter";

export type ADTTableProps = {
  className?: cx.Argument;
  handleRowClick?: (row: EncounterModel) => void;
  pageSize?: number;
  title?: string;
  data: EncounterModel[];
} & TableOptionProps<EncounterModel>;

export const ADTAlertsTable = withErrorBoundary(
  ({
    className,
    handleRowClick,
    pageSize = 5,
    title = "Patients ADT Alerts",
    data,
  }: ADTTableProps) => (
    // This resets our state when there is an error fetching data from ODS.

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

const columns: TableColumn<EncounterModel>[] = [
  {
    title: "Patient",
    render: (e) => e.patient && <PatientColumn patient={e.patient} />,
  },
  {
    title: "Date",
    render: (e) => e.periodStart,
  },
  {
    title: "Status",
    render: (e) => (
      <>
        <div>{e.periodEnd ? "Discharged" : "Active"}</div>
        <div>{e.typeDisplay}</div>
      </>
    ),
  },
  {
    title: "Location",
    render: (e) => e.location,
  },
  {
    title: "Diagnosis",
    render: (e) => (
      <SimpleMoreList items={e.diagnoses ?? []} limit={3} total={e.diagnoses?.length ?? 0} />
    ),
  },
];

type PatientColumnProps = {
  patient: PatientModel;
};

const PatientColumn = ({ patient }: PatientColumnProps) => (
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
