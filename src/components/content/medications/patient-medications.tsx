import type { ClinicalStatus } from "@/fhir/medication";
import cx from "classnames";
import { useState } from "react";
import { AddNewMedDrawer } from "@/components/content/medications/add-new-med-drawer";
import { OtherProviderMedsTable } from "@/components/content/medications/other-provider-meds-table";
import { ProviderMedsTable } from "@/components/content/medications/provider-meds-table";
import * as CTWBox from "@/components/core/ctw-box";
import { TelemetryBoundary } from "@/components/core/telemetry-boundary";
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
};

export function PatientMedications({
  className,
  readOnly = false,
  showConfirmedMedsTable = true,
  showOtherProvidersMedsTable = true,
}: PatientMedicationsProps) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [includeInactiveMeds, setIncludeInactiveMeds] = useState(false);

  return (
    <TelemetryBoundary>
      <CTWBox.StackedWrapper
        className={cx("ctw-patient-medications", className)}
        data-zus-telemetry-namespace="PatientMedications"
      >
        <CTWBox.Heading title="Medications">
          {!readOnly && (
            <AddNewMedDrawer
              isOpen={drawerIsOpen}
              handleOnClose={() => setDrawerIsOpen(false)}
            >
              <button
                className="ctw-btn-clear ctw-link"
                type="button"
                onClick={() => setDrawerIsOpen(true)}
                data-zus-telemetry-click="Add medication"
              >
                + Add Medication
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
            <ProviderMedsTable showInactive={includeInactiveMeds} />
          </CTWBox.Body>
        )}

        {showOtherProvidersMedsTable && (
          <CTWBox.Body title="Other Provider Records">
            <OtherProviderMedsTable />
          </CTWBox.Body>
        )}
      </CTWBox.StackedWrapper>
    </TelemetryBoundary>
  );
}
