import cx from "classnames";
import React, { useRef } from "react";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { patientCareTeamColumns } from "./patient-careteam-columns";
import {
  ScrollableContainer,
  ScrollingContainerProps,
} from "@/components/core/ctw-box";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { Table } from "@/components/core/table/table";
import { usePatientCareTeam } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useBreakpoints } from "@/hooks/use-breakpoints";

export type PatientCareTeamProps = {
  className?: string;
} & ScrollingContainerProps;

export type CareTeamDetailsDrawerProps = {
  className?: string;
  careteam: CareTeamPractitionerModel;
  isOpen: boolean;
  onClose: () => void;
};

export function PatientCareTeam({
  className,
  scrollingEnabled = false,
  height,
}: PatientCareTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const { featureFlags } = useCTW();
  const patientCareTeamQuery = usePatientCareTeam();

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.practitionerName,
    subHeader: (m) => m.qualification,
    details: careTeamData,
  });

  return (
    <ScrollableContainer
      height={height}
      scrollingEnabled={scrollingEnabled}
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
        handleRowClick={openDetails}
        scrollingEnabled={scrollingEnabled || !!height}
      />
    </ScrollableContainer>
  );
}

export const careTeamData = (
  careTeamPractitioner: CareTeamPractitionerModel
) => [
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
