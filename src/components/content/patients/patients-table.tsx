import "./patients-table.scss";

import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { SearchIcon } from "@heroicons/react/solid";
import type { Argument } from "classnames";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useQueryWithCTW } from "@/components/core/providers/use-query-with-ctw";
import { Table } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { getBuilderPatientsList, usePatientsList } from "@/fhir/patient-helper";
import { debounce } from "@/utils/nodash";
import { QUERY_KEY_PATIENTS_LIST } from "@/utils/query-keys";

export type PatientsTableProps = {
  className?: cx.Argument;
  handleRowClick: (row: PatientModel) => void;
  pageSize?: number;
  title?: string;
} & TableOptionProps<PatientModel>;

// Set of props that are optional configurations for the table.
export type TableOptionProps<T extends MinRecordItem> = {
  getRowClasses?: (row: T) => Argument; // Adds a row hover effect and calls onClick.
  onRowClick?: (row: T) => void;
};

/**
 * PatientsTable displays a paginated list of all patients for a builder. In
 * addition to having configurable page size, lazy loading and name search, the
 * component accepts an `onRowClick` prop so developers can add their own
 * logic when a row is clicked. The `onRowClick` receives the targeted
 * `PatientModel` as its sole argument, which contains the underlying FHIR
 * object as `.resource`.
 *
 */
export const PatientsTable = withErrorBoundary(
  ({ className, handleRowClick, pageSize = 5, title = "Patients" }: PatientsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isFetching, isError } = usePatientsList(pageSize, currentPage - 1);

    return (
      <AnalyticsProvider componentName="PatientsTable">
        <CTWBox.StackedWrapper
          className={cx("ctw-patients-border ctw-patients-table-inputs", className)}
        >
          <CTWBox.Heading title={title} />
          <div className="ctw-overflow-hidden">
            <Table
              records={data?.patients || []}
              columns={columns}
              handleRowClick={handleRowClick}
              pageSize={pageSize}
              hidePagination
            >
              <Pagination
                setCurrentPage={setCurrentPage}
                total={0}
                currentPage={currentPage}
                pageSize={pageSize}
                isLoading={isFetching}
              />
            </Table>
          </div>
        </CTWBox.StackedWrapper>
      </AnalyticsProvider>
    );
  },
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
