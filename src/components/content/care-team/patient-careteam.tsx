import cx from "classnames";
import { useRef } from "react";
import { useCareTeamDetailDrawer } from "./careteam-details-drawer";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import { Heading } from "@/components/core/ctw-box";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamModel } from "@/fhir/models/careteam";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientCareTeamProps = {
  className?: string;
  includeViewFhirResource?: boolean;
};

export function PatientCareTeam({
  className,
  includeViewFhirResource,
}: PatientCareTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientCareTeamQuery = usePatientCareTeam();
  const openDetails = useCareTeamDetailDrawer();

  function handleRowClick(careTeam: CareTeamModel) {
    openDetails(careTeam);
  }

  return (
    <div
      ref={containerRef}
      className={cx(
        "ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
        className,
        {
          "ctw-stacked": breakpoints.sm,
        }
      )}
    >
      <Heading title="CareTeam" />
      <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={patientCareTeamQuery.isLoading}
        records={patientCareTeamQuery.data ?? []}
        columns={patientCareTeamColumns(includeViewFhirResource)}
        handleRowClick={handleRowClick}
      />
    </div>
  );
}
