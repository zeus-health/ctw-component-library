import "./zus-aggregated-profile.scss";

import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
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
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { RenderIf, RenderIfElse } from "@/components/core/render-if";
import { TabGroup } from "@/components/core/tab-group/tab-group";
import { intersection } from "@/utils/nodash";

export type ZAPResourceName =
  | "allergies"
  | "care-team"
  | "conditions"
  | "conditions-outside"
  | "conditions-all"
  | "diagnostic-reports"
  | "documents"
  | "immunizations"
  | "medications"
  | "medications-outside"
  | "medications-all"
  | "timeline"
  | "encounters";

export const defaultZAPResources: ZAPResourceName[] = [
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
  resources?: ZAPResourceName[];
  forceHorizontalTabs?: boolean;
  includePatientDemographicsForm?: boolean;
  title?: string;
  includeAiSearch?: boolean;
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
  includeAiSearch = false,
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
  resources = defaultZAPResources,
  hideTitle = false,
  title = "Outside Records",
  removeBranding = false,
  removeRequestRecords = false,
}: ZusAggregatedProfileProps) => {
  const { trackInteraction } = useAnalytics();
  const [aiSearchIsOpen, setAiSearchIsOpen] = useState(false);
  const toggleAiSearchIsOpen = () => {
    setAiSearchIsOpen(!aiSearchIsOpen);
    trackInteraction("toggle_ai_search", {
      value: aiSearchIsOpen ? "close" : "open",
    });
  };

  // Get the configuration for each tab group by resource type
  const subcomponentProps: Record<keyof ZusAggregatedProfileTabs, unknown> = {
    allergies: allergiesProps,
    "care-team": careTeamProps,
    conditions: conditionsProps,
    "conditions-outside": conditionsOutsideProps,
    "conditions-all": conditionsAllProps,
    "diagnostic-reports": diagnosticReportsProps,
    documents: documentsProps,
    immunizations: immunizationsProps,
    medications: medicationsProps,
    "medications-outside": medicationsOutsideProps,
    "medications-all": medicationsAllProps,
    timeline: timelineProps,
    encounters: encounterProps,
  };

  // Order provided resources by the specified order in zusAggregatedProfileTabs.
  // This way, the tabs will always be in the same order.
  const orderedResources = intersection(
    Object.keys(zusAggregatedProfileTabs) as ZAPResourceName[],
    resources
  );

  const tabbedContent = orderedResources.map((tabName) => {
    const props = subcomponentProps[tabName] ?? {};
    return zusAggregatedProfileTabs[tabName](props);
  });

  return (
    <AnalyticsProvider componentName="ZusAggregatedProfile">
      <div className="ctw-zus-aggregated-profile ctw-scrollable-pass-through-height ctw-text-base">
        {!hideTitle && (
          <Title className="ctw-border-b-2 ctw-border-l-0 ctw-border-r-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light">
            <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium">
              {title}
              {!removeBranding && (
                <span className="ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
                  Powered by <img src={ZusSVG} alt="Zus" className="-ctw-mb-1.5" />
                </span>
              )}
            </h3>
          </Title>
        )}
        <TabGroup
          content={tabbedContent}
          forceHorizontalTabs={forceHorizontalTabs}
          aiSearchIsOpen={aiSearchIsOpen}
          topRightContent={
            <div className="ctw-tab !ctw-ml-1.5">
              {/* Hide Request Records button if opted-out or AI Search is open */}
              <RenderIf condition={!removeRequestRecords && !aiSearchIsOpen}>
                <RequestRecordsButton
                  className="ctw-mr-1.5"
                  includePatientDemographicsForm={includePatientDemographicsForm}
                />
              </RenderIf>

              {/* If AI Search is included, show "search" and "close search" buttons */}
              <RenderIf condition={includeAiSearch}>
                <button
                  type="button"
                  className="ctw-btn-clear ctw-link ctw-mr-1 ctw-flex ctw-items-end ctw-whitespace-nowrap ctw-text-content-lighter"
                  onClick={toggleAiSearchIsOpen}
                >
                  <RenderIf condition={aiSearchIsOpen}>
                    <span className="ctw-mr-1 ctw-text-sm">Close Search</span>
                  </RenderIf>
                  <RenderIfElse condition={aiSearchIsOpen}>
                    {/* Close Icon */}
                    <span>
                      <XIcon className="ctw-h-4 ctw-w-4" />
                    </span>
                    {/* ELSE Search Icon */}
                    <span>
                      <SearchIcon className="ctw-h-4 ctw-w-4" />
                    </span>
                  </RenderIfElse>
                </button>
              </RenderIf>
            </div>
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
 * "diagnostic-reports",
 * "documents",
 * "immunizations",
 * "medications",
 * "medications-outside",
 * "timelines".
 */
export const ZusAggregatedProfile = withErrorBoundary(
  ZusAggregatedProfileComponent,
  "ZusAggregatedProfile",
  true
);
