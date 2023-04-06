import { SearchIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useBuilderPatientHistoryList } from "./use-builder-patient-history-list";
import { TableOptionProps } from "../patients/patients-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Pagination } from "@/components/core/pagination/pagination";
import { Table } from "@/components/core/table/table";
import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { PatientHistorytModel } from "@/fhir/models/patient-history";
import { CTWBox } from "@/index";
import "./patient-history-table.scss";

export type PatientsHistoryTableProps = {
  className?: cx.Argument;
  pageSize?: number;
  title?: string;
} & TableOptionProps<PatientModel>;

export const PatientHistoryTable = withErrorBoundary(
  ({
    className,

    pageSize = 30,
    title = "Patient History Request",
  }: PatientsHistoryTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [patients, setPatients] = useState<PatientHistorytModel[]>([]);

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
  "PatientsHistoryTable"
);

const columns: TableColumn<PatientHistorytModel>[] = [
  {
    title: "Name",
    render: (data) => <PatientNameColumn data={data} />,
  },
  {
    title: "Initiated",
    render: (data) => <div>{data.createdAt}</div>,
  },
  {
    title: "Status",
    render: (data) => (
      <>
        {data.messages?.map((message) => (
          <div
            className="ctw-status-column"
            key={`${data.historyInfo?.messageUuid}-${message.service}`}
          >
            <div className="ctw-capitalize">{message.service}</div>
            <div>-</div>
            <div>{message.status}</div>
          </div>
        ))}
      </>
    ),
  },
];

const PatientNameColumn = ({ data }: { data: PatientHistorytModel }) => (
  <div className="ctw-flex ctw-items-center">
    <div className="ctw-ml-4">
      <div className="ctw-flex ctw-font-medium">
        <div className="ctw-max-w-xs">{data.patient.fullName}</div>
        {data.patient.resource.gender && (
          <div className="ctw-uppercase">
            ({data.patient.resource.gender[0]})
          </div>
        )}
      </div>
      <div className="ctw-text-content-lighter">
        {data.patient.dob} ({data.patient.age})
      </div>
    </div>
  </div>
);
