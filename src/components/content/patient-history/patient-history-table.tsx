import { SearchIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useEffect, useState } from "react";
import { TableOptionProps } from "../patients/patients-table";
import { useBuilderPatientHistoryList } from "./use-builder-patient-history-list";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { Table } from "@/components/core/table/table";
import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { PatientHistoryPatient } from "@/fhir/models/patient-history";
import { CTWBox } from "@/index";

export type PatientsHistoryTableProps = {
  className?: cx.Argument;
  pageSize?: number;
  title?: string;
} & TableOptionProps<PatientModel>;

export const PatientHistoryTable = withErrorBoundary(
  ({
    className,

    pageSize = 5,
    title = "Patient History Request",
  }: PatientsHistoryTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [patients, setPatients] = useState<PatientHistoryPatient[]>([]);

    const {
      data: { patients: responsePatients, total: responseTotal } = {},
      isFetching,
      isError,
    } = useBuilderPatientHistoryList(pageSize, currentPage - 1);

    // Here we are setting the total and patients only when we know that useQuery
    // isn't fetching. This will prevent empty intermediate states where there
    // is no data because the value of `usePatientsTable()` hasn't settled yet.
    useEffect(() => {
      if (!isFetching && responsePatients) {
        setTotal(responseTotal ?? 0);
        setPatients(responsePatients);
      }
    }, [responsePatients, responseTotal, isError, isFetching]);

    // This resets our state when there is an error fetching patients from ODS.
    useEffect(() => {
      if (isError) {
        setTotal(0);
        setPatients([]);
      }
    }, [isError, isFetching]);

    return (
      <CTWBox.StackedWrapper
        className={cx("ctw-patients-table", className)}
        data-zus-telemetry-namespace="PatientsTable"
      >
        <CTWBox.Heading title={title}>
          <div className="ctw-relative">
            <div className="ctw-search-icon-wrapper">
              <SearchIcon className="ctw-search-icon" />
            </div>
            <input
              type="text"
              className="ctw-patients-table-search"
              placeholder="Search"
              name="searchPatientName"
            />
          </div>
        </CTWBox.Heading>
        <div className="ctw-overflow-hidden">
          <Table
            records={patients}
            columns={columns}
            pageSize={pageSize}
            hidePagination
          >
            <Pagination
              setCurrentPage={setCurrentPage}
              total={total}
              currentPage={currentPage}
              pageSize={pageSize}
              isLoading={isFetching}
            />
          </Table>
        </div>
      </CTWBox.StackedWrapper>
    );
  },
  "PatientsTable"
);

const columns: TableColumn<PatientHistoryPatient>[] = [
  {
    title: "Name",
    render: (patient) => <PatientNameColumn patient={patient} />,
  },
  {
    title: "Last Retrieved",
    render: (patient) => <div>{patient.lastRetrievedAt}</div>,
  },
];

const PatientNameColumn = ({ patient }: { patient: PatientHistoryPatient }) => (
  <div className="ctw-flex ctw-items-center">
    <div className="ctw-ml-4">
      <div className="ctw-flex ctw-font-medium">
        <div className="ctw-max-w-xs">{patient.resource.fullName}</div>
        {patient.resource.gender && (
          <div className="ctw-uppercase"> ({patient.resource.gender[0]})</div>
        )}
      </div>
      <div className="ctw-text-content-lighter">
        {patient.resource.dob} ({patient.resource.age})
      </div>
    </div>
  </div>
);
