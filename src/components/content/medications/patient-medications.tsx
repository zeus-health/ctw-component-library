import type { ClinicalStatus } from "@/fhir/medication";
import cx from "classnames";
import { useState } from "react";
import { MedsHistoryTempProps } from "@/components/content/medications-table-base";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import {
  OtherProviderMedsTable,
  OtherProviderMedsTableProps,
} from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { ToggleControl } from "@/components/core/toggle-control";
import "./patient-medications.scss";

export type PatientMedicationsProps = {
  className?: string;
  status?: ClinicalStatus;
  // should we render the Zus confirmed meds component (default true)?
  showConfirmedMedsTable?: boolean;
  // should we render the Zus other providers meds component (default true)?
  showOtherProvidersMedsTable?: boolean;
  // should we show the button to add new meds (default true)?
  readOnly?: boolean;
} & Pick<OtherProviderMedsTableProps, "hideAddToRecord" | "handleAddToRecord"> &
  MedsHistoryTempProps;

export const PatientMedications = withErrorBoundary(
  ({
    className,
    readOnly = false,
    showConfirmedMedsTable = true,
    showOtherProvidersMedsTable = true,
    onOpenHistoryDrawer,
    onAfterOpenHistoryDrawer,
    ...otherProviderTableProps
  }: PatientMedicationsProps) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [includeInactiveMeds, setIncludeInactiveMeds] = useState(false);

    return (
      <CTWBox.StackedWrapper
        className={cx(" ctw-patient-medications", className)}
        data-zus-telemetry-namespace="PatientMedications"
      >
        <CTWBox.Heading title="Medications">
          {!readOnly && (
            <AddNewMedDrawer
              isOpen={drawerIsOpen}
              handleOnClose={() => setDrawerIsOpen(false)}
            >
              <button
                className="ctw-btn-clear ctw-link ctw-capitalize"
                type="button"
                onClick={() => setDrawerIsOpen(true)}
                data-testid="button.add-medication"
                data-zus-telemetry-click="Add new medication"
              >
                + Add medication
              </button>
            </AddNewMedDrawer>
          )}
        </CTWBox.Heading>

        {showConfirmedMedsTable && (
          <CTWBox.Body>
            <CTWBox.Title title="Confirmed Medications">
              <ToggleControl
                onFormChange={() =>
                  setIncludeInactiveMeds(!includeInactiveMeds)
                }
                toggleProps={{
                  name: "status",
                  text: "Include Inactive",
                }}
              />
            </CTWBox.Title>
            <ProviderMedsTable
              showInactive={includeInactiveMeds}
              onOpenHistoryDrawer={onOpenHistoryDrawer}
              onAfterOpenHistoryDrawer={onAfterOpenHistoryDrawer}
            />
          </CTWBox.Body>
        )}

        {showOtherProvidersMedsTable && (
          <CTWBox.Body title="Other Provider Records">
            <OtherProviderMedsTable
              {...otherProviderTableProps}
              onOpenHistoryDrawer={onOpenHistoryDrawer}
              onAfterOpenHistoryDrawer={onAfterOpenHistoryDrawer}
            />
          </CTWBox.Body>
        )}
      </CTWBox.StackedWrapper>
    );
  },
  "PatientMedications"
);
