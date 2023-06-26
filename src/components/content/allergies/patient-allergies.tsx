import cx from "classnames";
import { useRef } from "react";
import { allergyFilter, defaultAllergyFilters } from "./helpers/filters";
import { useAllergiesHistory } from "./helpers/history";
import { allergySortOptions, defaultAllergySort } from "./helpers/sort";
import { useToggleArchive } from "../hooks/use-toggle-archive";
import { useResourceDetailsDrawer } from "../resource/resource-details-drawer";
import { ResourceTable } from "../resource/resource-table";
import { ResourceTableActions } from "../resource/resource-table-actions";
import { patientAllergiesColumns } from "@/components/content/allergies/helpers/column";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/use-ctw";
import { Spinner } from "@/components/core/spinner";
import { RowActionsProps } from "@/components/core/table/table";
import { usePatientAllergies } from "@/fhir/allergies";
import { AllergyModel } from "@/fhir/models/allergies";
import { useFilteredSortedData } from "@/hooks/use-filtered-sorted-data";
import { useFQSFeatureToggle } from "@/hooks/use-fqs-feature-toggle";
import { useBaseTranslations } from "@/i18n";
import { capitalize } from "@/utils/nodash";
import { QUERY_KEY_BASIC, QUERY_KEY_PATIENT_ALLERGIES } from "@/utils/query-keys";

export type PatientAllergiesProps = {
  className?: string;
};

function PatientAllergiesComponent({ className }: PatientAllergiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { featureFlags, getRequestContext } = useCTW();
  const { enabled } = useFQSFeatureToggle("allergies");
  const patientAllergiesQuery = usePatientAllergies();
  const { data, setFilters, setSort } = useFilteredSortedData({
    defaultFilters: defaultAllergyFilters,
    defaultSort: defaultAllergySort,
    records: patientAllergiesQuery.data,
  });

  // const [userBuilderId, setUserBuilderId] = useState<string>("");
  const userBuilderId = "69290920-44af-4585-96b0-aa8ebec5f2a2";

  // useEffect(() => {
  //   async function load() {
  //     const requestContext = await getRequestContext();
  //     setUserBuilderId(requestContext.builderId);
  //   }

  //   void load();
  // }, [getRequestContext]);

  const openDetails = useResourceDetailsDrawer({
    header: (m) => capitalize(m.display),
    details: allergyData,
    getHistory: useAllergiesHistory,
    getSourceDocument: true,
    enableFQS: enabled,
  });

  // Get our allergies.
  const { isLoading } = patientAllergiesQuery;

  return (
    <div
      className={cx(className, "ctw-scrollable-pass-through-height")}
      ref={containerRef}
      data-zus-telemetry-namespace="Allergies"
    >
      <ResourceTableActions
        filterOptions={{
          onChange: setFilters,
          defaultState: defaultAllergyFilters,
          filters: allergyFilter(),
        }}
        sortOptions={{
          defaultSort: defaultAllergySort,
          options: allergySortOptions,
          onChange: setSort,
        }}
      />
      <div className="ctw-scrollable-pass-through-height">
        <ResourceTable
          showTableHead
          isLoading={isLoading}
          data={data}
          columns={patientAllergiesColumns(userBuilderId, featureFlags?.enableViewFhirButton)}
          onRowClick={openDetails}
          // rowActions={getRowActions(userBuilderId)}
          rowActions={RowActions}
        />
      </div>
    </div>
  );
}

export const PatientAllergies = withErrorBoundary(PatientAllergiesComponent, "PatientAllergies");

const allergyData = (allergy: AllergyModel) => [
  { label: "Recorded Date", value: allergy.recordedDate },
  { label: "Recording Organization", value: allergy.managingOrganization },
  { label: "Status", value: allergy.clinicalStatus },
  { label: "Type", value: capitalize(allergy.type) },
  { label: "Onset", value: allergy.onset },
  { label: "Reaction", value: capitalize(allergy.manifestations) },
  { label: "Severity", value: capitalize(allergy.severity) },
  { label: "Note", value: allergy.note },
];

// Having getRowActions as a function was causing an error when re-rendering the table
// so I'm making it like this temporarily to better match the conditions/meds tables
// while I troubleshoot the issue with the table not updating when dismissing a record.
// const getRowActions =
//   (userBuilderId: string) =>
const RowActions = ({ record }: RowActionsProps<AllergyModel>) => {
  const userBuilderId = "69290920-44af-4585-96b0-aa8ebec5f2a2";

  const { t } = useBaseTranslations();
  const { isLoading, toggleArchive } = useToggleArchive(
    record,
    QUERY_KEY_PATIENT_ALLERGIES,
    QUERY_KEY_BASIC
  );
  const archiveLabel = record.isArchived ? t("resourceTable.restore") : t("resourceTable.dismiss");

  return record.ownedByBuilder(userBuilderId) ? (
    <></>
  ) : (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        disabled={isLoading}
        onClick={toggleArchive}
      >
        {isLoading ? (
          <div className="ctw-flex">
            <Spinner className="ctw-mx-4 ctw-align-middle" />
          </div>
        ) : (
          archiveLabel
        )}
      </button>
    </div>
  );
};
