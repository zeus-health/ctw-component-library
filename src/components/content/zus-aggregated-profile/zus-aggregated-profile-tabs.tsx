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
  PatientDocumentProps,
  PatientDocuments,
} from "@/components/content/document/patient-documents";
import {
  PatientImmunizations,
  PatientImmunizationsProps,
} from "@/components/content/immunizations/patient-immunizations";
import {
  BadgeOtherProviderMedCount,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { OtherProviderMedsTableTab } from "@/components/content/medications/patient-medications-tabbed";
import {
  ProviderMedsTable,
  ProviderMedsTableProps,
} from "@/components/content/medications/provider-meds-table";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";

export type ZusAggregatedProfileTabs = Record<
  ZAPResourceName,
  (props: object) => TabGroupItem<unknown>
>;

export const zusAggregatedProfileTabs: ZusAggregatedProfileTabs = {
  allergies: (props: PatientAllergiesProps = {}) => ({
    key: "allergies-builder-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "allergy list",
    render: () => <PatientAllergies {...props} />,
  }),

  conditions: (props: PatientConditionsProps = {}) => ({
    key: "condition-provider-records",
    display: () => "conditions list",
    render: () => <PatientConditions hideOutsideOwnedRecords {...props} />,
  }),

  "conditions-outside": (props: PatientConditionsProps = {}) => ({
    key: "condition-outside-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside conditions</span>
        <BadgeOtherProviderConditionsCount />
      </>
    ),
    render: () => <PatientConditions hideBuilderOwnedRecords {...props} />,
  }),

  documents: (props: PatientDocumentProps = {}) => ({
    key: "documents",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "documents",
    render: () => <PatientDocuments {...props} />,
  }),

  immunizations: (props: PatientImmunizationsProps = {}) => ({
    key: "immunization-outside-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "immunizations",
    render: () => <PatientImmunizations {...props} />,
  }),

  medications: (props: ProviderMedsTableProps = {}) => ({
    key: "medication-builder-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "medication list",
    render: () => <ProviderMedsTable {...props} />,
  }),

  "medications-outside": (props: OtherProviderMedsTableProps = {}) => ({
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside medications</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab {...props} />,
  }),
};
