import ZusSVG from "@/assets/zus.svg";
import { PatientAllergiesProps } from "@/components/content/allergies/patient-allergies";
import { PatientConditionsProps } from "@/components/content/conditions/patient-conditions";
import { PatientDocumentProps } from "@/components/content/document/patient-documents";
import { PatientImmunizationsProps } from "@/components/content/immunizations/patient-immunizations";
import { OtherProviderMedsTableProps } from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTableProps } from "@/components/content/medications/provider-meds-table";
import {
  ZusAggregatedProfileTabs,
  zusAggregatedProfileTabs,
} from "@/components/content/zus-aggregated-profile/zus-aggregated-profile-tabs";
import { Title } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { TabGroup } from "@/components/core/tab-group/tab-group";

export type ZAPResourceName =
  | "allergies"
  | "conditions"
  | "conditions-outside"
  | "documents"
  | "immunizations"
  | "medications"
  | "medications-outside";

export type ZusAggregatedProfileProps = {
  resources: ZAPResourceName[];
  forceHorizontalTabs?: boolean;
  title?: string;
  removeBranding?: boolean;
} & SubComponentProps;

type SubComponentProps = Partial<{
  allergiesProps: PatientAllergiesProps;
  conditionsProps: Omit<
    PatientConditionsProps,
    "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords"
  >;
  conditionsOutsideProps: Omit<
    PatientConditionsProps,
    "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords"
  >;
  documentsProps: PatientDocumentProps;
  immunizationsProps: PatientImmunizationsProps;
  medicationsProps: ProviderMedsTableProps;
  medicationsOutsideProps: OtherProviderMedsTableProps;
}>;

const zusAggregatedProfile = ({
  forceHorizontalTabs = false,
  allergiesProps,
  conditionsProps,
  conditionsOutsideProps,
  documentsProps,
  immunizationsProps,
  medicationsProps,
  medicationsOutsideProps,
  resources,
  title = "Outside Records",
  removeBranding = false,
}: ZusAggregatedProfileProps) => {
  // Get the configuration for each tab group by resource type
  const subcomponentProps: Record<keyof ZusAggregatedProfileTabs, unknown> = {
    allergies: allergiesProps,
    conditions: conditionsProps,
    "conditions-outside": conditionsOutsideProps,
    documents: documentsProps,
    immunizations: immunizationsProps,
    medications: medicationsProps,
    "medications-outside": medicationsOutsideProps,
  };

  const tabbedContent = resources.map((tabName) => {
    const props = subcomponentProps[tabName] ?? {};
    return zusAggregatedProfileTabs[tabName](props);
  });

  return (
    <div className="ctw-zus-aggregated-profile ctw-p-5">
      <Title className="ctw-border-b-2 ctw-border-r-0 ctw-border-l-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light">
        <h3 className="ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium">
          {title}{" "}
          {!removeBranding && (
            <span className="ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light">
              Powered by <img src={ZusSVG} alt="Zus" className="-ctw-mb-1.5" />
            </span>
          )}
        </h3>
      </Title>
      <TabGroup
        content={tabbedContent}
        forceHorizontalTabs={forceHorizontalTabs}
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
 * "allergies", "conditions", "documents", "conditions-outside",
 * "immunizations", "medications" and "medications-outside".
 */
export const ZusAggregatedProfile = withErrorBoundary(
  zusAggregatedProfile,
  "ZusAggregatedProfile"
);
