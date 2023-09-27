import cx from "classnames";
import { useRef } from "react";
import { patientCareTeamColumns } from "./helpers/columns";
import { careTeamSortOptions, defaultCareTeamSort } from "./helpers/sorts";
import { getDateRangeView } from "../resource/helpers/view-date-range";
import { PatientResourceTable } from "../resource/patient-resource-table";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { EmptyPatientTable } from "@/components/core/empty-table";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { usePatientCareTeamMembers } from "@/fhir/care-team";
import { CareTeamPractitionerModel } from "@/fhir/models/careteam-practitioner";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";

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

  const patientCareTeamQuery = usePatientCareTeamMembers();
  const { viewOptions, allTime } =
    getDateRangeView<CareTeamPractitionerModel>("effectiveStartDate");
  const { data, setViewOption, setSort } = useFilteredSortedData({
    defaultSort: defaultCareTeamSort,
    defaultView: allTime,
    records: patientCareTeamQuery.data,
  });

  const openDetails = useResourceDetailsDrawer({
    header: (m) => m.practitionerName,
    details: careTeamData,
  });

  const isEmptyQuery = patientCareTeamQuery.data && patientCareTeamQuery.data.length === 0;
  const hasZeroFilteredRecords = !isEmptyQuery && data.length === 0;

  return (
    <AnalyticsProvider componentName="PatientCareTeam">
      <div ref={containerRef} className={cx(className, "ctw-scrollable-pass-through-height")}>
        <ResourceTableActions
          sortOptions={{
            defaultSort: defaultCareTeamSort,
            options: careTeamSortOptions,
            onChange: setSort,
          }}
          viewOptions={{
            onChange: setViewOption,
            options: viewOptions,
            defaultView: allTime,
          }}
        />
        <PatientResourceTable
          isLoading={patientCareTeamQuery.isLoading}
          data={data}
          emptyMessage={
            <EmptyPatientTable
              hasZeroFilteredRecords={hasZeroFilteredRecords}
              resourceName="documents"
            />
          }
          columns={patientCareTeamColumns}
          onRowClick={openDetails}
        />
      </div>
    </AnalyticsProvider>
  );
}

export const careTeamData = (careTeamPractitioner: CareTeamPractitionerModel) => [
  { label: "Organization", value: careTeamPractitioner.managingOrganization },
  { label: "Care Team", value: careTeamPractitioner.careTeam.categoryDisplay },
  { label: "Phone", value: careTeamPractitioner.careTeam.phone },
  { label: "Role", value: careTeamPractitioner.role },
  { label: "Specialty", value: careTeamPractitioner.specialty },
  { label: "Member Since", value: careTeamPractitioner.effectiveStartDate },
];
