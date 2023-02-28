import cx from "classnames";
import { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import { Heading } from "@/components/core/ctw-box";
import { useCTW } from "@/components/core/providers/ctw-provider";
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
  const { featureFlags } = useCTW();
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
      <Heading title="CareTeam" />
      <Table
        stacked={breakpoints.sm}
        className="-ctw-mx-px !ctw-rounded-none"
        isLoading={patientCareTeamQuery.isLoading}
        records={patientCareTeamQuery.data ?? []}
        columns={patientCareTeamColumns(
          featureFlags?.enablePatientCareTeamFhirButton
        )}
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
