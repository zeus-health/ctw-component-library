import "./patient-history-table.scss";

import cx from "classnames";
import { useEffect, useState } from "react";
import { defaultPatientHistoryFilters, patientHistoryFilters } from "./helpers/filters";
import { useBuilderPatientHistoryList } from "./use-builder-patient-history-list";
import { TableOptionProps } from "../patients/patients-table-helper";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { FilterChangeEvent } from "@/components/core/filter-bar/filter-bar-types";
import { SimplePagination } from "@/components/core/pagination/simple-pagination";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { Table } from "@/components/core/table/table";
import { TableColumn } from "@/components/core/table/table-helpers";
import { PatientModel } from "@/fhir/models";
import { PatientHistoryRequestModel } from "@/fhir/models/patient-history";
import { CTWBox } from "@/index";
import { PatientRefreshHistoryMessageStatus } from "@/services/patient-history/patient-history-types";

export type PatientsHistoryTableProps = {
  className?: cx.Argument;
  handleRowClick?: (row: PatientHistoryRequestModel) => void;
  pageSize?: number;
  title?: string;
  includeBorder?: boolean;
} & TableOptionProps<PatientModel>;

export type ServiceName = "commonwell" | "surescripts";

export const PatientHistoryTable = withErrorBoundary(
  ({
    className,
    handleRowClick,
    pageSize = 10,
    title = "Patient History Request",
    includeBorder = true,
  }: PatientsHistoryTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [patients, setPatients] = useState<PatientHistoryRequestModel[]>([]);
    const [status, setStatus] = useState<string>();
    const [excludeFutureJobs, setExcludeFutureJobs] = useState<boolean>(true);

    const {
      data: { patients: responsePatients, total: responseTotal, hasNext } = {},
      isLoading,
      isFetching,
      isError,
    } = useBuilderPatientHistoryList(pageSize, currentPage - 1, status, excludeFutureJobs);

    const onFilterChange = (e: FilterChangeEvent) => {
      setExcludeFutureJobs(!!e.future_jobs?.selected);
      if (e.status?.selected && typeof e.status.selected === "string") {
        setStatus(e.status.selected.split(" ").join("_"));
      } else {
        setStatus(undefined);
      }
    };

    // Here we are setting the total and patients only when we know that useQuery
    // isn't fetching. This will prevent empty intermediate states where there
    // is no data because the value of `usePatientsTable()` hasn't settled yet.
    useEffect(() => {
      if (!isFetching && responsePatients) {
        // filter out records where a patient was not found (eg. the patient was deleted after the history request was made)
        setPatients(responsePatients.filter((patient) => patient.patient));
      }
    }, [responsePatients, responseTotal, isError, isFetching]);

    // This resets our state when there is an error fetching patients from ODS.
    useEffect(() => {
      if (isError) {
        setPatients([]);
      }
    }, [isError, isFetching]);

    return (
      <AnalyticsProvider componentName="PatientHistoryTable">
        <CTWBox.StackedWrapper
          className={cx(
            "ctw-patients-table-inputs",
            { "ctw-patients-border": includeBorder },
            className
          )}
        >
          {title && <CTWBox.Heading title={title} />}
          <ResourceTableActions
            filterOptions={{
              onChange: onFilterChange,
              filters: patientHistoryFilters(),
              defaultState: defaultPatientHistoryFilters,
            }}
            className="ctw-ml-2"
          />
          <div className="ctw-overflow-hidden">
            <Table
              records={patients}
              columns={columns}
              pageSize={pageSize}
              handleRowClick={handleRowClick}
              isLoading={isLoading}
              hidePagination
            >
              <SimplePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                hasNext={hasNext}
              />
            </Table>
          </div>
        </CTWBox.StackedWrapper>
      </AnalyticsProvider>
    );
  },
  "PatientsHistoryTable"
);

const columns: TableColumn<PatientHistoryRequestModel>[] = [
  {
    title: "Last Queried",
    render: (data) => <div>{data.lastUpdatedAt}</div>,
  },
  {
    title: "Target Date",
    render: (data) => <div>{data.targetDate}</div>,
  },
  {
    title: "Name",
    render: (data) => <PatientNameColumn data={data} />,
  },
  {
    title: "Source",
    render: (data) => (
      <div className="ctw-space-y-2">
        {data.providers?.map((provider) => (
          <div key={`${data.historyInfo?.id}-${provider.service}`}>
            <div className="ctw-w-fit  ctw-py-1	ctw-capitalize">
              {mapSourceToSourceLabel(provider.service as ServiceName)}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Status",
    render: (data) => (
      <div className="ctw-space-y-2">
        {data.providers?.map((provider) => (
          <div key={`${data.key}-${provider.service}`}>
            <div className="ctw-capitalize">
              <RenderCorrectStatusLabel status={provider.status} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const PatientNameColumn = ({ data }: { data: PatientHistoryRequestModel }) => (
  <div className="ctw-flex ctw-items-center">
    <div>
      <div className="ctw-flex ctw-space-x-1 ctw-font-medium">
        <div className="ctw-max-w-xs">{data.patient?.fullName}</div>
        {data.patient?.resource.gender && (
          <div className="ctw-uppercase">({data.patient.resource.gender[0]})</div>
        )}
      </div>
      <div className="ctw-text-content-lighter">
        {data.patient?.dob} ({data.patient?.age})
      </div>
    </div>
  </div>
);

const mapSourceToSourceLabel = (serviceName: ServiceName) => {
  switch (serviceName.toLowerCase()) {
    case "commonwell":
      return "EHR Network";
    case "surescripts":
      return "Medication History";
    default:
      return serviceName;
  }
};

const RenderCorrectStatusLabel = ({ status }: { status: PatientRefreshHistoryMessageStatus }) => {
  switch (status) {
    case "initialize":
    case "in_progress":
      return (
        <StatusLabel status={status} className="ctw-bg-caution-light ctw-text-caution-heading" />
      );
    case "done":
      return <StatusLabel status={status} className="ctw-bg-success-light ctw-text-success-dark" />;
    case "error":
    case "done_with_errors":
      return <StatusLabel status={status} className="ctw-bg-error-light ctw-text-error-text" />;
    default:
      return <StatusLabel status={status} />;
  }
};

const StatusLabel = ({ status, className }: { status: string; className?: cx.Argument }) => (
  <div className={cx("ctw-w-fit ctw-rounded-2xl ctw-px-3 ctw-py-1 ctw-font-medium", className)}>
    {status.split("_").join(" ")}
  </div>
);
