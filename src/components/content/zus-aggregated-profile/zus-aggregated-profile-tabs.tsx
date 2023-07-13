import { UnreadAllergiesNotification } from "../allergies/unread-allergies-notification";
import {
  PatientConditionsAll,
  PatientConditionsAllProps,
} from "../conditions/patient-conditions-all";
import {
  PatientConditionsOutside,
  PatientConditionsOutsideProps,
} from "../conditions/patient-conditions-outside";
import { PatientConditionsOutsideBadge } from "../conditions/patient-conditions-outside-badge";
import { UnreadConditionsNotification } from "../conditions/unread-conditions-notification";
import {
  PatientDiagnosticReports,
  PatientDiagnosticReportsProps,
} from "../diagnostic-reports/patient-diagnostic-reports";
import { UnreadDiagnosticReportsNotification } from "../diagnostic-reports/unread-diagnostic-reports-notification";
import { UnreadDocumentsNotification } from "../document/unread-documents-notification";
import { UnreadImmunizationsNotification } from "../immunizations/unread-immunizations-notification";
import { PatientMedications, PatientMedicationsProps } from "../medications/patient-medications";
import {
  PatientMedicationsAll,
  PatientMedicationsAllProps,
} from "../medications/patient-medications-all";
import {
  PatientMedicationsOutside,
  PatientMedicationsOutsideProps,
} from "../medications/patient-medications-outside";
import { PatientMedicationsOutsideBadge } from "../medications/patient-medications-outside-badge";
import { UnreadMedicationsNotification } from "../medications/unread-medications-notification";
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
  conditions: (props: PatientConditionsProps = {}) => ({
    key: "conditions",
    display: () => i18next.t("zap.tabs.conditions"),
    render: () => <PatientConditions {...props} />,
  }),

  "conditions-outside": (props: PatientConditionsOutsideProps = {}) => ({
    key: "conditions-outside",
    display: () => (
      <TabHelper
        notification={<PatientConditionsOutsideBadge />}
        name={i18next.t("zap.tabs.conditionsOutside")}
      />
    ),
    render: () => <PatientConditionsOutside {...props} />,
  }),

  "conditions-all": (props: PatientConditionsAllProps = {}) => ({
    key: "conditions-all",
    display: () => (
      <TabHelper
        notification={<UnreadConditionsNotification />}
        name={i18next.t("zap.tabs.conditionsAll")}
      />
    ),
    render: () => <PatientConditionsAll {...props} />,
  }),

  medications: (props: PatientMedicationsProps = {}) => ({
    key: "medications",
    display: () => "medication list",
    render: () => <PatientMedications {...props} />,
  }),

  "medications-outside": (props: PatientMedicationsOutsideProps = {}) => ({
    key: "medications-outside",
    display: () => (
      <TabHelper
        notification={<PatientMedicationsOutsideBadge />}
        name={i18next.t("zap.tabs.medicationsOutside")}
      />
    ),
    render: () => <PatientMedicationsOutside {...props} />,
  }),

  "medications-all": (props: PatientMedicationsAllProps = {}) => ({
    key: "medications-all",
    display: () => (
      <TabHelper notification={<UnreadMedicationsNotification />} name="Medications" />
    ),
    render: () => <PatientMedicationsAll {...props} />,
  }),

  "diagnostic-reports": (props: PatientDiagnosticReportsProps = {}) => ({
    key: "diagnostic-reports",
    display: () => (
      <TabHelper notification={<UnreadDiagnosticReportsNotification />} name="diagnostics" beta />
    ),
    render: () => <PatientDiagnosticReports {...props} />,
  }),

  timeline: (props: PatientTimelineProps = {}) => ({
    key: "timeline",
    display: () => <TabHelper name="timeline" beta />,
    render: () => <PatientTimeline {...props} />,
  }),

  documents: (props: PatientDocumentsProps = {}) => ({
    key: "documents",
    display: () => (
      <TabHelper notification={<UnreadDocumentsNotification />} name="documents" beta />
    ),
    render: () => <PatientDocuments {...props} />,
  }),

  allergies: (props: PatientAllergiesProps = {}) => ({
    key: "allergies",
    display: () => <TabHelper notification={<UnreadAllergiesNotification />} name="allergies" />,
    render: () => <PatientAllergies {...props} />,
  }),

  immunizations: (props: PatientImmunizationsProps = {}) => ({
    key: "immunizations",
    display: () => (
      <TabHelper notification={<UnreadImmunizationsNotification />} name="immunizations" beta />
    ),
    render: () => <PatientImmunizations {...props} />,
  }),

  "care-team": (props: PatientCareTeamProps = {}) => ({
    key: "care-team",
    display: () => <TabHelper name="care team" beta />,
    render: () => <PatientCareTeam {...props} />,
  }),
};

type TabHelperProps = {
  beta?: boolean;
  name: string;
  notification?: React.ReactNode;
};

function TabHelper({ beta, name, notification }: TabHelperProps) {
  return (
    <div className="ctw-flex ctw-items-center ctw-space-x-2">
      {notification}
      <div className="ctw-flex ctw-items-center ctw-space-x-1">
        <span className="ctw-capitalize">{name}</span>
        {beta && <BetaLabel />}
      </div>
    </div>
  );
}
