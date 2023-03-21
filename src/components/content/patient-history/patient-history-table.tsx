import { SearchIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useState } from "react";
import { Table } from "../CCDA/ccda_viewer/components/Table/Table";
import { TableOptionProps } from "../patients/patients-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { CTWBox, useBuilderPatientHistoryList } from "@/index";

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
    const [patients, setPatients] = useState<PatientModel[]>([]);

    const { data, isFetching, isError } = useBuilderPatientHistoryList(
      pageSize,
      currentPage - 1
    );
    console.log("hello");

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

const columns: TableColumn<PatientModel>[] = [
  {
    title: "Name",
    render: (patient) => <PatientNameColumn patient={patient} />,
  },
];

const PatientNameColumn = ({ patient }) => (
  <div className="ctw-flex ctw-items-center">
    <div className="ctw-ml-4">
      <div className="ctw-flex ctw-font-medium">
        <div className="ctw-max-w-xs">{patient.fullName}</div>
        {patient.gender && (
          <div className="ctw-uppercase"> ({patient.gender[0]})</div>
        )}
      </div>
      <div className="ctw-text-content-lighter">
        {patient.dob} ({patient.age})
      </div>
    </div>
  </div>
);
