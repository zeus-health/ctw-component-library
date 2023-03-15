import {
  PatientConditionsOutside,
  PatientConditionsOutsideProps,
} from "../conditions/patient-conditions-outside";
import { PatientConditionsOutsideBadge } from "../conditions/patient-conditions-outside-badge";
import {
  PatientMedications,
  PatientMedicationsProps,
} from "../medications/patient-medications";
import {
  PatientMedicationsOutside,
  PatientMedicationsOutsideProps,
} from "../medications/patient-medications-outside";
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
  PatientTimeline,
  PatientTimelineProps,
} from "@/components/content/timeline/patient-timeline";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";
import i18next from "@/i18n";
import { PatientMedicationsOutsideBadge } from "../medications/patient-medications-outside-badge";

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

  conditions: (props: PatientConditionsProps = {}) => ({
    key: "condition-provider-records",
    display: () => i18next.t("zap.tabs.conditions"),
    render: () => <PatientConditions {...props} />,
  }),

  "conditions-outside": (props: PatientConditionsOutsideProps = {}) => ({
    key: "condition-outside-records",
    display: () => (
      <div className="ctw-space-x-2">
        <span className="ctw-capitalize">
          {i18next.t("zap.tabs.conditionsOutside")}
        </span>
        <PatientConditionsOutsideBadge />
      </div>
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
    key: "immunization-outside-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "immunizations",
    render: () => <PatientImmunizations {...props} />,
  }),

  medications: (props: PatientMedicationsProps = {}) => ({
    key: "medication-builder-records",
    display: () => "medication list",
    render: () => <PatientMedications {...props} />,
  }),

  "medications-outside": (props: PatientMedicationsOutsideProps = {}) => ({
    key: "other-provider-records",
    display: () => (
      <div className="ctw-space-x-2">
        <span className="ctw-capitalize">outside medications</span>
        <PatientMedicationsOutsideBadge />
      </div>
    ),
    render: () => <PatientMedicationsOutside {...props} />,
  }),

  timelines: (props: PatientTimelineProps = {}) => ({
    key: "timelines",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "encounter timeline",
    render: () => <PatientTimeline {...props} />,
  }),
};
