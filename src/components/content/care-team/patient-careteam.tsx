import cx from "classnames";
import { useRef } from "react";
import { patientCareTeamColumns } from "./helpers/columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam, usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useBreakpoints } from "@/hooks/use-breakpoints";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const patientCareTeamQuery = usePatientCareTeam();
  const { trackInteraction } = useAnalytics();

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.practitionerName,
    subHeader: (m) => m.qualification,
    details: careTeamData,
    getSourceDocument: true,
  });

  return (
    <AnalyticsProvider componentName="PatientCareTeam">
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
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={false}
              resourceName="care team"
              trackInteraction={trackInteraction}
            />
          }
        />
      </div>
    </AnalyticsProvider>
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
