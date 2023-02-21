import {
  PatientAllergies,
  PatientAllergiesProps,
} from "@/components/content/allergies/patient-allergies";
import {
  PatientConditions,
  PatientConditionsProps,
} from "@/components/content/conditions/patient-conditions";
import { BadgeOtherProviderConditionsCount } from "@/components/content/conditions/patient-conditions-tabs";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { OtherProviderMedsTableTab } from "@/components/content/medications/patient-medications-tabbed";
import {
  ProviderMedsTable,
  ProviderMedsTableProps,
} from "@/components/content/medications/provider-meds-table";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { TabGroup, TabGroupItem } from "@/components/core/tab-group/tab-group";
import { ConditionModel, MedicationStatementModel } from "@/fhir/models";

type TabName =
  | "allergies"
  | "conditions"
  | "outside-conditions"
  | "medications"
  | "outside-medications";

export type ZusAggregatedProfileProps = {
  conditions?: Omit<
    PatientConditionsProps,
    "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords"
  >;
  medications?: ProviderMedsTableProps;
  outsideConditions?: Omit<
    PatientConditionsProps,
    "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords"
  >;
  outsideMedications?: OtherProviderMedsTableProps;
  allergies?: PatientAllergiesProps;
  tabs: TabName[];
};

const tabbedContentMap: Record<
  TabName,
  TabGroupItem<ConditionModel | MedicationStatementModel>
> = {
  allergies: {
    key: "builder-allergies-records",
    display: () => "allergy list",
    render: () => <PatientAllergies />,
  },

  medications: {
    key: "builder-medication-records",
    display: () => "medication list",
    render: () => <ProviderMedsTable />,
  },

  "outside-medications": {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside medications</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab />,
  },

  conditions: {
    key: "provider-condition-records",
    display: () => "conditions list",
    render: () => <PatientConditions hideOutsideOwnedRecords />,
  },

  "outside-conditions": {
    key: "outside-condition-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside conditions</span>
        <BadgeOtherProviderConditionsCount />
      </>
    ),
    render: () => <PatientConditions hideBuilderOwnedRecords />,
  },
};

const zusAggregatedProfile = (props: ZusAggregatedProfileProps) => {
  const { tabs } = props;
  const tabbedContent = tabs.map((tabName) => tabbedContentMap[tabName]);
  return (
    <div className="ctw-zus-aggregated-profile">
      <TabGroup content={tabbedContent} />
    </div>
  );
};
export const ZusAggregatedProfile = withErrorBoundary(
  zusAggregatedProfile,
  "ZusAggregatedProfile"
);
