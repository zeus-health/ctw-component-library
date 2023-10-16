import cx from "classnames";
import { useRef } from "react";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useMatchedPatients } from "@/fhir/patient-helper";
import { sort } from "@/utils/sort";
import { getMatchedPatientsColumns } from "./helpers/columns";
import { usePatient } from "@/index";
import { Loading } from "@/components/core/loading";

export type MatchedPatientsProps = {
  className?: string;
};

function MatchedPatientsComponent({ className }: MatchedPatientsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const patient = usePatient();
  const matchedPatientsQuery = useMatchedPatients();
  const hasNoData = matchedPatientsQuery.data?.length === 0;

  const sortedData = sort(matchedPatientsQuery.data ?? [], "createdAt", "desc");

  if (!patient.data) {
    return <Loading />;
  }

  return (
    <AnalyticsProvider componentName="MatchedPatients">
      <div ref={containerRef} className={cx(className, "ctw-scrollable-pass-through-height")}>
        <PatientResourceTable
          isLoading={matchedPatientsQuery.isLoading}
          data={sortedData}
          emptyMessage={
            <EmptyPatientTable hasZeroFilteredRecords={hasNoData} resourceName="patients" />
          }
          columns={getMatchedPatientsColumns(patient.data)}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const MatchedPatients = withErrorBoundary(MatchedPatientsComponent, "MatchedPatients");
