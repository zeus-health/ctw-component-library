import "./patients-table.scss";

import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import { SearchIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import { PatientNameColumn, TableOptionProps } from "./patients-table-helper";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { Table } from "@/components/core/table/table";
import { usePatientsListODS } from "@/fhir/patient-helper";
import { debounce } from "@/utils/nodash";

export type PatientsTableProps = {
  className?: cx.Argument;
  handleRowClick: (row: PatientModel) => void;
  pageSize?: number;
  title?: string;
} & TableOptionProps<PatientModel>;

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
    const [total, setTotal] = useState(0);
    const [patients, setPatients] = useState<PatientModel[]>([]);
    const [searchNameValue, setSearchNameValue] = useState<string | undefined>();
    const {
      data: { patients: responsePatients, total: responseTotal } = {},
      isFetching,
      isError,
    } = usePatientsListODS(pageSize, currentPage - 1, searchNameValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((value) => {
        setSearchNameValue(value);
        setCurrentPage(1);
        setTotal(0);
        setPatients([]);
      }, 100),
      []
    );

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
