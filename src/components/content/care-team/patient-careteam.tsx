import cx from "classnames";
import { useRef } from "react";
import { patientCareTeamColumns } from "./helpers/columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { EmptyTable } from "@/components/core/empty-table";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { useFQSFeatureToggle } from "@/hooks/use-feature-toggle";

export type PatientCareTeamProps = {
  className?: string;
};

export type CareTeamDetailsDrawerProps = {
  className?: string;
  careteam: CareTeamPractitionerModel;
  isOpen: boolean;
  onClose: () => void;
};

export function PatientCareTeam({ className }: PatientCareTeamProps) {
  const { enabled } = useFQSFeatureToggle("careTeams");
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientCareTeamQuery = usePatientCareTeam();

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.practitionerName,
    subHeader: (m) => m.qualification,
    details: careTeamData,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  return (
    <div
      ref={containerRef}
      className={cx(
        "ctw-scrollable-pass-through-height ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",
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
        columns={patientCareTeamColumns}
        handleRowClick={openDetails}
        emptyMessage={<EmptyTable hasZeroFilteredRecords={false} resourceName="care team" />}
      />
    </div>
  );
}

export const careTeamData = (careTeamPractitioner: CareTeamPractitionerModel) => [
  { label: "Organization", value: careTeamPractitioner.managingOrganization },
  {
    label: "CareTeam Telecom",
    value: careTeamPractitioner.telecom && (
      <div>
        {careTeamPractitioner.telecom.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{item.value}</div>
        ))}
      </div>
    ),
  },
  { label: "Role", value: careTeamPractitioner.role },
  { label: "Status", value: careTeamPractitioner.status },
];
