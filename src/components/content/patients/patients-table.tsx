import "./patients-table.scss";

import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { SearchIcon } from "@heroicons/react/solid";
import type { Argument } from "classnames";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { SimplePagination } from "@/components/core/pagination/simple-pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useQueryWithCTW } from "@/components/core/providers/use-query-with-ctw";
import { Table } from "@/components/core/table/table";
import { MinRecordItem } from "@/components/core/table/table-helpers";
import { getBuilderPatientsList } from "@/fhir/patient-helper";
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

export function usePatientsList(pageSize: number, pageOffset: number, searchNameValue?: string) {
  return useQueryWithCTW(
    QUERY_KEY_PATIENTS_LIST,
    [pageSize, pageOffset, searchNameValue],
    getBuilderPatientsList
  );
}

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
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [searchNameValue, setSearchNameValue] = useState<string | undefined>();
    const {
      data: { patients: responsePatients, total: responseTotal } = {},
      isFetching,
      isError
    } = usePatientsList(pageSize, currentPage - 1, searchNameValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((value) => {
        setSearchNameValue(value);
        setCurrentPage(1);
        setPatients([]);
      }, 100),
      []
    );

    // Here we are setting the total and patients only when we know that useQuery
    // isn't fetching. This will prevent empty intermediate states where there
    // is no data because the value of `usePatientsTable()` hasn't settled yet.
    useEffect(() => {
      if (!isFetching && responsePatients) {
        setPatients(responsePatients);
      }
    }, [responsePatients, responseTotal, isError, isFetching]);

    // This resets our state when there is an error fetching patients from ODS.
    useEffect(() => {
      if (isError) {
        setPatients([]);
      }
    }, [isError, isFetching]);

    return (
      <AnalyticsProvider componentName="PatientsTable">
        <CTWBox.StackedWrapper
          className={cx("ctw-patients-border ctw-patients-table-inputs", className)}
        >
          <CTWBox.Heading title={title}>
            <div className="ctw-relative">
              <div className="ctw-search-icon-wrapper">
                <SearchIcon className="ctw-search-icon" />
              </div>
              <input
                type="text"
                className="ctw-patients-table-inputs-search"
                placeholder="Search"
                name="searchPatientName"
                onChange={(e) => debouncedSearch(e.currentTarget.value)}
              />
            </div>
          </CTWBox.Heading>
          <div className="ctw-overflow-hidden">
            <Table
              records={patients}
              columns={columns}
              handleRowClick={handleRowClick}
              pageSize={pageSize}
              hidePagination
            >
              <SimplePagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                hasNext={connection.pageInfo.hasNextPage}
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
    render: (patient) => <PatientNameColumn patient={patient} />
  },
  {
    title: "Contact",
    render: ({ email, phoneNumber }) => (
      <>
        <div className="ctw-patients-table-inputs-email">{email}</div>
        <div className="ctw-patients-table-inputs-phone">{phoneNumber}</div>
      </>
    )
  }
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
