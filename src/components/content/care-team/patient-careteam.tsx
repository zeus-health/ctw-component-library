import cx from "classnames";
import { useEffect, useRef } from "react";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { Telemetry } from "@/utils/telemetry";

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
  const { featureFlags } = useCTW();
  const patientCareTeamQuery = usePatientCareTeam();

  useEffect(() => {
    if (!patientCareTeamQuery.isLoading) {
      Telemetry.reportZAPRecordCount("care_team", patientCareTeamQuery.data?.length);
    }
  }, [patientCareTeamQuery.isLoading, patientCareTeamQuery.data]);

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.practitionerName,
    subHeader: (m) => m.qualification,
    details: careTeamData,
    getSourceDocument: true,
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
        columns={patientCareTeamColumns(featureFlags?.enableViewFhirButton)}
        handleRowClick={openDetails}
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
