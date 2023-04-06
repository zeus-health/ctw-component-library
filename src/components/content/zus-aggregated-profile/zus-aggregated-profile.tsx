import { PatientConditionsOutsideProps } from "../conditions/patient-conditions-outside";
import { PatientMedicationsProps } from "../medications/patient-medications";
import { PatientMedicationsOutsideProps } from "../medications/patient-medications-outside";
import { PatientObservationsProps } from "../observations/patient-observations";
import { PatientObservationsOutsideProps } from "../observations/patient-observations-outside";
import ZusSVG from "@/assets/zus.svg";
import { PatientAllergiesProps } from "@/components/content/allergies/patient-allergies";
import { PatientCareTeamProps } from "@/components/content/care-team/patient-careteam";
import { PatientConditionsProps } from "@/components/content/conditions/patient-conditions";
import { PatientDocumentProps } from "@/components/content/document/patient-documents";
import { PatientImmunizationsProps } from "@/components/content/immunizations/patient-immunizations";
import { RequestRecordsButton } from "@/components/content/patient-history/request-records-button";
import { PatientTimelineProps } from "@/components/content/timeline/patient-timeline";
import {
  ZusAggregatedProfileTabs,
  zusAggregatedProfileTabs,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile-tabs";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { TabGroup } from "@/components/core/tab-group/tab-group";

export type ZAPResourceName =
  | "allergies"
  | "care-team"
  | "conditions"
  | "conditions-outside"
  | "documents"
  | "immunizations"
  | "medications"
  | "medications-outside"
  | "observations"
  | "observations-outside"
  | "timelines";

export type ZusAggregatedProfileProps = {
  resources: ZAPResourceName[];
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
  documentsProps: PatientDocumentProps;
  immunizationsProps: PatientImmunizationsProps;
  medicationsProps: PatientMedicationsProps;
  medicationsOutsideProps: PatientMedicationsOutsideProps;
  observationsProps: PatientObservationsProps;
  observationsOutsideProps: PatientObservationsOutsideProps;
  timelineProps: PatientTimelineProps;
}>;

const ZusAggregatedProfileComponent = ({
  forceHorizontalTabs = false,
  includePatientDemographicsForm,
  allergiesProps,
  careTeamProps,
  conditionsProps,
  conditionsOutsideProps,
  documentsProps,
  immunizationsProps,
  medicationsProps,
  medicationsOutsideProps,
  observationsProps,
  observationsOutsideProps,
  timelineProps,
  resources,
  hideTitle = false,
  title = "Outside Records",
  removeBranding = false,
  removeRequestRecords = false,
}: ZusAggregatedProfileProps) => {
  // Get the configuration for each tab group by resource type
  const subcomponentProps: Record<keyof ZusAggregatedProfileTabs, unknown> = {
    allergies: allergiesProps,
    "care-team": careTeamProps,
    conditions: conditionsProps,
    "conditions-outside": conditionsOutsideProps,
    documents: documentsProps,
    immunizations: immunizationsProps,
    medications: medicationsProps,
    "medications-outside": medicationsOutsideProps,
    observations: observationsProps,
    "observations-outside": observationsOutsideProps,
    timelines: timelineProps,
  };

  const tabbedContent = resources.map((tabName) => {
    const props = subcomponentProps[tabName] ?? {};
    return zusAggregatedProfileTabs[tabName](props);
  });

  return (
    <div className="ctw-zus-aggregated-profile ctw-scrollable-pass-through-height">
      {!hideTitle && (
        <Title className="ctw-border-b-2 ctw-border-l-0 ctw-border-r-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light">
          <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium">
            {title}{" "}
            {!removeBranding && (
              <span className="ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
                Powered by{" "}
                <img src={ZusSVG} alt="Zus" className="-ctw-mb-1.5" />
              </span>
            )}
          </h3>
        </Title>
      )}
      <TabGroup
        content={tabbedContent}
        forceHorizontalTabs={forceHorizontalTabs}
        topRightContent={
          removeRequestRecords ? undefined : (
            <RequestRecordsButton
              includePatientDemographicsForm={includePatientDemographicsForm}
            />
          )
        }
      />
    </div>
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
 * "documents",
 * "immunizations",
 * "medications",
 * "medications-outside",
 * "observations",
 * "observations-outside",
 * "timelines".
 */
export const ZusAggregatedProfile = withErrorBoundary(
  ZusAggregatedProfileComponent,
  "ZusAggregatedProfile"
);
