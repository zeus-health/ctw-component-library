import { UnreadAllergiesNotification } from "../allergies/unread-allergies-notification";
import {
  PatientConditionsAll,
  PatientConditionsAllProps,
} from "../conditions/patient-conditions-all";
import {
  PatientConditionsOutside,
  PatientConditionsOutsideProps,
} from "../conditions/patient-conditions-outside";
import { UnreadConditionsNotification } from "../conditions/unread-conditions-notification";
import { UnreadImmunizationsNotification } from "../immunizations/unread-immunizations-notification";
import { PatientMedications, PatientMedicationsProps } from "../medications/patient-medications";
import {
  PatientMedicationsOutside,
  PatientMedicationsOutsideProps,
} from "../medications/patient-medications-outside";
import { PatientMedicationsOutsideBadge } from "../medications/patient-medications-outside-badge";
import {
  PatientObservations,
  PatientObservationsProps,
} from "../observations/patient-observations";
import {
  PatientObservationsOutside,
  PatientObservationsOutsideProps,
} from "../observations/patient-observations-outside";
import { PatientObservationsOutsideBadge } from "../observations/patient-observations-outside-badge";
import { PatientTimeline, PatientTimelineProps } from "../timeline/patient-timeline";
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
  PatientDocuments,
  PatientDocumentsProps,
} from "@/components/content/document/patient-documents";
import {
  PatientImmunizations,
  PatientImmunizationsProps,
} from "@/components/content/immunizations/patient-immunizations";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { BetaLabel } from "@/components/core/beta-label";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";
import i18next from "@/i18n";

export type ZusAggregatedProfileTabs = Record<ZAPResourceName, (props: object) => TabGroupItem>;

export const zusAggregatedProfileTabs: ZusAggregatedProfileTabs = {
  allergies: (props: PatientAllergiesProps = {}) => ({
    key: "allergies",
    getPanelClassName: () => "ctw-pt-5",
    display: () => (
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <UnreadAllergiesNotification />
        <span className="ctw-capitalize">allergies</span>
      </div>
    ),
    render: () => <PatientAllergies {...props} />,
  }),

  "care-team": (props: PatientCareTeamProps = {}) => ({
    key: "care-team",
    display: () => (
      <div className="ctw-space-x-1">
        <span className="ctw-capitalize">care team</span>
        <BetaLabel />
      </div>
    ),
    render: () => <PatientCareTeam {...props} />,
  }),

  conditions: (props: PatientConditionsProps = {}) => ({
    key: "conditions",
    display: () => "Builder Conditions",
    render: () => <PatientConditions {...props} />,
  }),

  "conditions-outside": (props: PatientConditionsOutsideProps = {}) => ({
    key: "conditions-outside",
    display: () => (
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <UnreadConditionsNotification />
        <span className="ctw-capitalize">Outside Conditions</span>
      </div>
    ),
    render: () => <PatientConditionsOutside {...props} />,
  }),

  "conditions-all": (props: PatientConditionsAllProps = {}) => ({
    key: "conditions-all",
    display: () => (
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <UnreadConditionsNotification />
        <span className="ctw-capitalize">All Conditions</span>
      </div>
    ),
    render: () => <PatientConditionsAll {...props} />,
  }),

  documents: (props: PatientDocumentsProps = {}) => ({
    key: "documents",
    getPanelClassName: () => "ctw-pt-5",
    display: () => (
      <div className="ctw-space-x-1">
        <span className="ctw-capitalize">documents</span>
        <BetaLabel />
      </div>
    ),
    render: () => <PatientDocuments {...props} />,
  }),

  immunizations: (props: PatientImmunizationsProps = {}) => ({
    key: "immunizations",
    getPanelClassName: () => "ctw-pt-5",
    display: () => (
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <UnreadImmunizationsNotification />
        <span className="ctw-capitalize">immunizations</span>
        <BetaLabel />
      </div>
    ),
    render: () => <PatientImmunizations {...props} />,
  }),

  medications: (props: PatientMedicationsProps = {}) => ({
    key: "medications",
    display: () => "medication list",
    render: () => <PatientMedications {...props} />,
  }),

  "medications-outside": (props: PatientMedicationsOutsideProps = {}) => ({
    key: "medications-outside",
    display: () => (
      <div className="ctw-flex ctw-items-center ctw-space-x-2">
        <PatientMedicationsOutsideBadge />
        <span className="ctw-capitalize">{i18next.t("zap.tabs.medicationsOutside")}</span>
      </div>
    ),
    render: () => <PatientMedicationsOutside {...props} />,
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

  timeline: (props: PatientTimelineProps = {}) => ({
    key: "timeline",
    getPanelClassName: () => "ctw-pt-5",
    display: () => (
      <div className="ctw-space-x-1">
        <span className="ctw-capitalize">Timeline</span>
        <BetaLabel />
      </div>
    ),
    render: () => <PatientTimeline {...props} />,
  }),
};
