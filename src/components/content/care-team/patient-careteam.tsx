import cx from "classnames";
import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamModel } from "@/fhir/models/careteam";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientCareTeamProps = {
  className?: string;
  includeViewFhirResource?: boolean;
};

export type CareTeamDetailsDrawerProps = {
  className?: string;
  careteam: CareTeamModel;
  isOpen: boolean;
  onClose: () => void;
};

export function PatientCareTeam({
  className,
  includeViewFhirResource,
}: PatientCareTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientCareTeamQuery = usePatientCareTeam();

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.periodStart,
    details: careTeamData,
  });

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
      <Table
        stacked={breakpoints.sm}
        isLoading={patientCareTeamQuery.isLoading}
        records={patientCareTeamQuery.data ?? []}
        columns={patientCareTeamColumns(includeViewFhirResource)}
        handleRowClick={openDetails}
      />
    </div>
  );
}

export const careTeamData = (careTeam: CareTeamModel) => [
  { label: "Organization", value: careTeam.managingOrganization },
  { label: "Practitioner", value: careTeam.includedPerformer },
  { label: "CareTeam Telecom", value: careTeam.careTeamTelecom },
  { label: "Role", value: careTeam.role },
  { label: "Status", value: careTeam.status },
];
