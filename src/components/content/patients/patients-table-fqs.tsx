import "./patients-table.scss";
import type { TableColumn } from "@/components/core/table/table-helpers";
import type { PatientModel } from "@/fhir/models/patient";
import cx from "classnames";
import { useState } from "react";
import { PatientNameColumn, TableOptionProps } from "./patients-table-helper";
import { ErrorAlert } from "@/components/core/alert";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { SimplePagination } from "@/components/core/pagination/simple-pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { Table } from "@/components/core/table/table";
import { formatISODateStringToDate } from "@/fhir/formatters";
import { usePatientsListFQS } from "@/fhir/patient-helper";
import { applySorts } from "@/utils/sort";

export type PatientsTableFQSProps = {
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
export const PatientsTableFQS = withErrorBoundary(
  ({ className, handleRowClick, pageSize = 5, title = "Patients" }: PatientsTableFQSProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cursors] = useState<string[]>([""]);
    const { data, isLoading, isError } = usePatientsListFQS(pageSize, cursors[currentPage - 1]);
    cursors[currentPage] = data?.pageInfo.endCursor ?? "";
    const dataOnPage = applySorts(data?.patients || [], [
      { key: "lastUpdated", dir: "desc", isDate: true },
    ]);

    return isError ? (
      <ErrorAlert header="Error">Could not load list of patients.</ErrorAlert>
    ) : (
      <AnalyticsProvider componentName="PatientsTable">
        <CTWBox.StackedWrapper
          className={cx("ctw-patients-border ctw-patients-table-inputs", className)}
        >
          <CTWBox.Heading title={title} />
          <div className="ctw-overflow-hidden">
            <Table
              records={dataOnPage}
              isLoading={isLoading}
              columns={columns}
              handleRowClick={handleRowClick}
              pageSize={pageSize}
              hidePagination
            >
              <SimplePagination
                setCurrentPage={(p) => setCurrentPage(p)}
                currentPage={currentPage}
                hasNext={data?.pageInfo.hasNextPage}
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
  {
    title: "Last Updated",
    render: (p) => formatISODateStringToDate(p.lastUpdated),
  },
];
