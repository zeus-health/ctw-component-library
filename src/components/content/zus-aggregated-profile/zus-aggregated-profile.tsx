import "./zus-aggregated-profile.scss";

import cx from "classnames";
import { PatientConditionsAllProps } from "../conditions/patient-conditions-all";
import { PatientConditionsOutsideProps } from "../conditions/patient-conditions-outside";
import { PatientDiagnosticReportsProps } from "../diagnostic-reports/patient-diagnostic-reports";
import { PatientEncountersProps } from "../encounters/patient-encounters";
import { PatientMedicationsProps } from "../medications/patient-medications";
import { PatientMedicationsAllProps } from "../medications/patient-medications-all";
import { PatientMedicationsOutsideProps } from "../medications/patient-medications-outside";
import { PatientTimelineProps } from "../timeline/patient-timeline";
import ZusSVG from "@/assets/zus.svg";
import { PatientAllergiesProps } from "@/components/content/allergies/patient-allergies";
import { PatientCareTeamProps } from "@/components/content/care-team/patient-careteam";
import { PatientConditionsProps } from "@/components/content/conditions/patient-conditions";
import { PatientDocumentsProps } from "@/components/content/document/patient-documents";
import { PatientImmunizationsProps } from "@/components/content/immunizations/patient-immunizations";
import { RequestRecordsButton } from "@/components/content/patient-history/request-records-button";
import {
  ZusAggregatedProfileTabs,
  zusAggregatedProfileTabs,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile-tabs";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { Loading } from "@/components/core/loading";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { RenderIf } from "@/components/core/render-if";
import { TabGroup } from "@/components/core/tab-group/tab-group";
import { useFeatureToggle } from "@/hooks/use-feature-toggle";
import { intersection } from "@/utils/nodash";

export const ZAP_TAB_NAMES = [
  "allergies",
  "care-team",
  "conditions",
  "conditions-outside",
  "conditions-all",
  "diagnostic-reports",
  "documents",
  "encounters",
  "immunizations",
  "medications",
  "medications-outside",
  "medications-all",
  "timeline",
  "overview",
] as const;

export type ZAPTabName = (typeof ZAP_TAB_NAMES)[number];

export const defaultZAPTabs: ZAPTabName[] = [
  "overview",
  "conditions-all",
  "medications-all",
  "diagnostic-reports",
  "encounters",
  "documents",
  "allergies",
  "immunizations",
  "care-team",
];

export type ZusAggregatedProfileProps = {
  resources?: ZAPTabName[]; // TODO - would prefer to rename this to tabs
  forceHorizontalTabs?: boolean;
  includePatientDemographicsForm?: boolean;
  title?: string;
  hideTitle?: boolean;
  removeBranding?: boolean;
  removeRequestRecords?: boolean;
} & ZusAggregatedProfileSubComponentProps;

export type ZusAggregatedProfileSubComponentProps = Partial<{
  allergiesProps: PatientAllergiesProps;
  careTeamProps: PatientCareTeamProps;
  conditionsProps: PatientConditionsProps;
  conditionsOutsideProps: PatientConditionsOutsideProps;
  conditionsAllProps: PatientConditionsAllProps;
  diagnosticReportsProps: PatientDiagnosticReportsProps;
  documentsProps: PatientDocumentsProps;
  immunizationsProps: PatientImmunizationsProps;
  medicationsProps: PatientMedicationsProps;
  medicationsOutsideProps: PatientMedicationsOutsideProps;
  medicationsAllProps: PatientMedicationsAllProps;
  timelineProps: PatientTimelineProps;
  encounterProps: PatientEncountersProps;
}>;

const ZusAggregatedProfileComponent = ({
  forceHorizontalTabs = false,
  includePatientDemographicsForm,
  allergiesProps,
  careTeamProps,
  conditionsProps,
  conditionsOutsideProps,
  conditionsAllProps,
  diagnosticReportsProps,
  documentsProps,
  immunizationsProps,
  medicationsProps,
  medicationsOutsideProps,
  medicationsAllProps,
  timelineProps,
  encounterProps,
  resources = defaultZAPTabs,
  hideTitle = false,
  title = "Outside Records",
  removeBranding = false,
  removeRequestRecords = false,
}: ZusAggregatedProfileProps) => {
  const isSearchEnabledToggle = useFeatureToggle("ctw-patient-record-search");
  const showRequestRecordsFormToggle = useFeatureToggle("ctw-patient-history-form").enabled;

  // Get the configuration for each tab group by resource type
  const subcomponentProps: Record<keyof ZusAggregatedProfileTabs, unknown> = {
    allergies: allergiesProps,
    "care-team": careTeamProps,
    conditions: conditionsProps,
    "conditions-outside": conditionsOutsideProps,
    "conditions-all": conditionsAllProps,
    "diagnostic-reports": diagnosticReportsProps,
    documents: documentsProps,
    encounters: encounterProps,
    immunizations: immunizationsProps,
    medications: medicationsProps,
    "medications-outside": medicationsOutsideProps,
    "medications-all": medicationsAllProps,
    timeline: timelineProps,
    overview: { includePatientDemographicsForm },
  };

  // Order provided resources by the specified order in zusAggregatedProfileTabs.
  // This way, the tabs will always be in the same order.
  const orderedResources = intersection(
    Object.keys(zusAggregatedProfileTabs) as ZAPTabName[],
    resources
  );

  const tabbedContent = orderedResources
    .filter((tabName) => tabName !== "overview" || isSearchEnabledToggle.enabled) // only allow overview tab if search is enabled
    .map((tabName) => {
      const props = subcomponentProps[tabName] ?? {};
      return zusAggregatedProfileTabs[tabName](props);
    });

  if (!isSearchEnabledToggle.ready) {
    return <Loading />;
  }

  const showRequestRecordsButton =
    !!showRequestRecordsFormToggle && !removeRequestRecords && !isSearchEnabledToggle.enabled;

  return (
    <AnalyticsProvider componentName="ZusAggregatedProfile">
      <div className="ctw-zus-aggregated-profile ctw-scrollable-pass-through-height">
        {!hideTitle && (
          <Title
            className={cx(
              `ctw-border-b-2 ctw-border-l-0 ctw-border-r-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light ctw-bg-zap-headerBg`
            )}
          >
            <div className="ctw-flex ctw-items-center ctw-space-x-1 ctw-py-3">
              <h3 className="ctw-m-0 ctw-inline-block ctw-p-0  ctw-font-medium">{title}</h3>
              {!removeBranding && (
                <div className="ctw-flex ctw-items-center ctw-space-x-2">
                  <span className="ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
                    Powered by
                  </span>
                  <img src={ZusSVG} alt="Zus" />
                </div>
              )}
            </div>
          </Title>
        )}

        <TabGroup
          content={tabbedContent}
          forceHorizontalTabs={forceHorizontalTabs}
          topRightContent={
            <RenderIf condition={showRequestRecordsButton}>
              <RequestRecordsButton
                className="ctw-mr-1.5"
                includePatientDemographicsForm={includePatientDemographicsForm}
              />
            </RenderIf>
          }
        />
      </div>
    </AnalyticsProvider>
  );
};

/**
 * ZusAggregatedProfile allows developers to utilize most of the components
 * available in this library as a single customizable component with tabbed
 * navigation. Simply pass an array with the names of the desired resources
 * to include _(see below)_.
 *
 * It's possible to set a custom title for the ZusAggregatedProfile component,
 * making it a single component which can be used to create a handful of
 * different widgets within an app.
 *
 * ```
 * export const ZusMedsWidget = <ZusAggregatedProfile
 *   title="Medications"
 *   resources={["medications", "medications-outside"]}
 * />
 *
 * export const ZusProblemsWidget = <ZusAggregatedProfile
 *   title="Problems"
 *   resources={["allergies", "conditions", "conditions-outside"]}
 * />
 * ```
 * The complete set of available resources in the ZusAggregatedProfile are
 * "allergies",
 * "care-team",
 * "conditions",
 * "conditions-outside",
 * "conditions-all",
 * "diagnostic-reports",
 * "documents",
 * "encounters",
 * "immunizations",
 * "medications",
 * "medications-outside",
 * "medications-all",
 * "timeline"
 */
export const ZusAggregatedProfile = withErrorBoundary(
  ZusAggregatedProfileComponent,
  "ZusAggregatedProfile",
  true
);
