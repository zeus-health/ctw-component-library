import cx from "classnames";
import { useRef } from "react";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientCareTeamProps = {
  className?: string;
  includeViewFhirResource?: boolean;
};

export type CareTeamDetailsDrawerProps = {
  className?: string;
  careteam: CareTeamPractitionerModel;
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

  // const openDetails = useResourceDetailsDrawer({
  //   header: (m) => m.id,
  //   details: careTeamData,
  // });

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
        columns={patientCareTeamColumns(featureFlags?.enableViewFhirButton)}
        // handleRowClick={openDetails}
      />
    </div>
  );
}

export const careTeamData = (
  careTeamPractitioner: CareTeamPractitionerModel
) => [
  // { label: "Organization", value: careTeamPractitioner.managingOrganization },
  { label: "Practitioner", value: careTeamPractitioner.PractitionerName },
  // { label: "CareTeam Telecom", value: careTeamPractitioner.careTeamTelecom },
  // { label: "Role", value: careTeamPractitioner.role },
  // { label: "Status", value: careTeamPractitioner.status },
];
