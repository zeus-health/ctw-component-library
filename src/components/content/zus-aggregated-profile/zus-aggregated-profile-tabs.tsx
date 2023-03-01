import {
  PatientAllergies,
  PatientAllergiesProps,
} from "@/components/content/allergies/patient-allergies";
import {
  PatientCareTeam,
  PatientCareTeamProps,
} from "@/components/content/care-team/patient-careteam";
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
import { OtherProviderMedsTableTab } from "@/components/content/medications/patient-medications";
import {
  ProviderMedsTable,
  ProviderMedsTableProps,
} from "@/components/content/medications/provider-meds-table";
import {
  PatientTimeline,
  PatientTimelineProps,
} from "@/components/content/timeline/patient-timeline";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";

export type ZusAggregatedProfileTabs = Record<
  ZAPResourceName,
  (props: object) => TabGroupItem
>;

export const zusAggregatedProfileTabs: ZusAggregatedProfileTabs = {
  allergies: (props: PatientAllergiesProps = {}) => ({
    key: "allergies-builder-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "allergy list",
    render: () => <PatientAllergies {...props} />,
  }),

  "care-team": (props: PatientCareTeamProps = {}) => ({
    key: "care-team",
    display: () => "care team",
    render: () => <PatientCareTeam {...props} />,
  }),

  conditions: (
    props: PatientConditionsProps = {
      hideRequestRecords: true,
    }
  ) => ({
    key: "condition-provider-records",
    display: () => "conditions list",
    render: () => <PatientConditions hideOutsideOwnedRecords {...props} />,
  }),

  "conditions-outside": (
    props: PatientConditionsProps = {
      hideRequestRecords: false,
    }
  ) => ({
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

  timelines: (props: PatientTimelineProps = {}) => ({
    key: "timelines",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "encounter timeline",
    render: () => <PatientTimeline {...props} />,
  }),
};
