import { PatientAllergies } from "@/components/content/allergies/patient-allergies";
import { PatientConditions } from "@/components/content/conditions/patient-conditions";
import { BadgeOtherProviderConditionsCount } from "@/components/content/conditions/patient-conditions-tabs";
import { PatientDocuments } from "@/components/content/document/patient-documents";
import { PatientImmunizations } from "@/components/content/immunizations/patient-immunizations";
import { BadgeOtherProviderMedCount } from "@/components/content/medications/other-provider-meds-table";
import { OtherProviderMedsTableTab } from "@/components/content/medications/patient-medications-tabbed";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import { ZAPResourceName } from "@/components/content/zus-aggregated-profile/zus-aggregated-profile";
import { TabGroupItem } from "@/components/core/tab-group/tab-group";
import { ConditionModel, MedicationStatementModel } from "@/fhir/models";

export const zusAggregatedProfileTabs: Record<
  ZAPResourceName,
  TabGroupItem<ConditionModel | MedicationStatementModel>
> = {
  allergies: {
    key: "allergies-builder-records",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "allergy list",
    render: () => <PatientAllergies />,
  },

  conditions: {
    key: "condition-provider-records",
    display: () => "conditions list",
    render: () => <PatientConditions hideOutsideOwnedRecords />,
  },

  "conditions-outside": {
    key: "condition-outside-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside conditions</span>
        <BadgeOtherProviderConditionsCount />
      </>
    ),
    render: () => <PatientConditions hideBuilderOwnedRecords />,
  },

  documents: {
    key: "documents",
    getPanelClassName: () => "ctw-pt-5",
    display: () => "documents",
    render: () => <PatientDocuments />,
  },

  immunizations: {
    key: "immunization-outside-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">immunizations</span>
        <BadgeOtherProviderConditionsCount />
      </>
    ),
    render: () => <PatientImmunizations />,
  },

  medications: {
    key: "medication-builder-records",
    display: () => "medication list",
    render: () => <ProviderMedsTable />,
  },

  "medications-outside": {
    key: "other-provider-records",
    display: () => (
      <>
        <span className="ctw-pr-2 ctw-capitalize">outside medications</span>
        <BadgeOtherProviderMedCount />
      </>
    ),
    render: () => <OtherProviderMedsTableTab />,
  },
};
