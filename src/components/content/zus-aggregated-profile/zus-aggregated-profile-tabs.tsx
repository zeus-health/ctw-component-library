import {
  PatientConditionsOutside,
  PatientConditionsOutsideProps,
} from "../conditions/patient-conditions-outside";
import { PatientConditionsOutsideBadge } from "../conditions/patient-conditions-outside-badge";
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
  PatientObservations,
  PatientObservationsProps,
} from "@/components/content/observations/patient-observations";
import {
  PatientObservationsOutside,
  PatientObservationsOutsideBadge,
  PatientObservationsOutsideProps,
} from "@/components/content/observations/patient-observations-outside";
import {
  PatientTimeline,
  PatientTimelineProps,
} from "@/components/content/timeline/patient-timeline";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";
import i18next from "@/i18n";

export type ZusAggregatedProfileTabs = Record<
  ZAPResourceName,
  (props: object) => TabGroupItem
>;

export const zusAggregatedProfileTabs: ZusAggregatedProfileTabs = {
  allergies: (props: PatientAllergiesProps = {}) => ({
    key: "allergies",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "allergy",
    render: () => <PatientAllergies {...props} />,
  }),

  "care-team": (props: PatientCareTeamProps = {}) => ({
    key: "care-team",
    display: () => "care team",
    render: () => <PatientCareTeam {...props} />,
  }),

  conditions: (props: PatientConditionsProps = {}) => ({
    key: "conditions",
    display: () => i18next.t("zap.tabs.conditions"),
    render: () => <PatientConditions {...props} />,
  }),

  "conditions-outside": (props: PatientConditionsOutsideProps = {}) => ({
    key: "conditions-outside",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">
          {i18next.t("zap.tabs.conditionsOutside")}
        </span>
        <PatientConditionsOutsideBadge />
      </>
    ),
    render: () => <PatientConditionsOutside {...props} />,
  }),

  documents: (props: PatientDocumentProps = {}) => ({
    key: "documents",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "documents",
    render: () => <PatientDocuments {...props} />,
  }),

  immunizations: (props: PatientImmunizationsProps = {}) => ({
    key: "immunizations",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "immunizations",
    render: () => <PatientImmunizations {...props} />,
  }),

  medications: (props: ProviderMedsTableProps = {}) => ({
    key: "medications",
    display: () => "medication list",
    render: () => <ProviderMedsTable {...props} />,
  }),

  "medications-outside": (props: OtherProviderMedsTableProps = {}) => ({
    key: "medications-outside",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside medications</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab {...props} />,
  }),

  observations: (props: PatientObservationsProps = {}) => ({
    key: "observations",
    display: () => "observations",
    render: () => <PatientObservations {...props} />,
  }),

  "observations-outside": (props: PatientObservationsOutsideProps = {}) => ({
    key: "observations-outside",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside observations</span>
        <PatientObservationsOutsideBadge />
      </>
    ),
    render: () => <PatientObservationsOutside {...props} />,
  }),

  timelines: (props: PatientTimelineProps = {}) => ({
    key: "timelines",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "encounter timeline",
    render: () => <PatientTimeline {...props} />,
  }),
};
