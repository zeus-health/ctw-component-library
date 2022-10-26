import { format } from "date-fns";
import { compact } from "lodash";
import { useEffect, useContext, useRef, useState } from "react";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import {
  DrawerFormWithFields,
  FormEntry,
} from "@/components/content/forms/drawer-form-with-fields";
import {
  createMedicationStatement,
  getMedicationFormData,
  medicationStatementSchema,
} from "./forms/medications";
import { MedicationStatementModel } from "@/models/medication-statement";
import { CTWPatientContext, usePatient } from "../core/patient-provider";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { getMergedIncludedResources } from "@/fhir/bundle";
import { createPatientStatusMap, getRxNormCode } from "@/fhir/medication";
import type { ClinicalStatus } from "@/fhir/medication";
import { getSortInfo, sort } from "@/utils/sort";
import cx from "classnames";
import "./patient-medications.scss";
import { ToggleControl } from "@/components/core/toggle-control";
import {
  useQueryPatientLensMeds,
  useQueryPatientBuilderMeds,
} from "@/hooks/use-medications";

type LoaderData = {
  builderPatientRxNormStatuses?: Record<string, string>;
  activeMedicationModels?: MedicationStatementModel[];
  otherProviderActiveMedicationModels?: MedicationStatementModel[];
};

type PatientMedicationsProps = {
  className?: string;
  status?: ClinicalStatus;
  medsSort?: string;
  otherProviderMedsSort?: string;
  // should we render the Zus confirmed meds component (default true)
  showConfirmedMedsTable?: boolean;
  // should we show the button to add new meds (default true)?
  readOnly?: boolean;
};

export function PatientMedications({
  className,
  medsSort = "",
  otherProviderMedsSort = "",
  readOnly = false,
  showConfirmedMedsTable = true,
}: PatientMedicationsProps) {
  const [
    { activeMedicationModels = [], otherProviderActiveMedicationModels = [] },
    setLoaderState,
  ] = useState<LoaderData>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const { patientID } = useContext(CTWPatientContext);
  const patient = usePatient();
  const [createMedData, setCreateMedData] = useState<FormEntry[]>();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [includeInactiveMeds, setIncludeInactiveMeds] = useState(false);
  const statusParam = includeInactiveMeds ? "all" : "active";

  const handleAddNewMedication = () => {
    if (!patient.data?.id) return;

    const newMedicationStatement = new MedicationStatementModel({
      resourceType: "MedicationStatement",
      status: "active",
      subject: {
        reference: `Patient/${patient.data.id}`,
        display: patient.data.display,
      },
      dateAsserted: format(new Date(), "yyyy-MM-dd"),
      informationSource: {
        type: "Organization",
        reference: `Organization/${patient.data.organization?.id}`,
        display: patient.data.organization?.name,
      },
    });

    setDrawerIsOpen(true);
    setCreateMedData(getMedicationFormData(newMedicationStatement));
  };

  const medicationsResponse = useQueryPatientBuilderMeds(statusParam);
  const lensActiveMedicationsResponse = useQueryPatientLensMeds();
  const patientMedicationsResponse = useQueryPatientBuilderMeds();

  useEffect(() => {
    if (
      medicationsResponse.data?.bundle &&
      lensActiveMedicationsResponse.data?.bundle &&
      patientMedicationsResponse.data?.bundle
    ) {
      let { medications } = medicationsResponse.data;
      let lensMedications = lensActiveMedicationsResponse.data.medications;
      const patientMedications = lensActiveMedicationsResponse.data.medications;

      const includedResources = getMergedIncludedResources([
        medicationsResponse.data.bundle,
        lensActiveMedicationsResponse.data.bundle,
        patientMedicationsResponse.data.bundle,
      ]);

      const builderPatientRxNormStatuses = createPatientStatusMap(
        patientMedications,
        includedResources
      );

      const builderActiveRxNorms = compact(
        medications
          .filter((m) => m.status === "active") // Track ONLY active builder meds.
          .map((medication) => getRxNormCode(medication, includedResources))
      );

      const lensActiveRxNorms = compact(
        lensMedications.map((medication) =>
          getRxNormCode(medication, includedResources)
        )
      );

      // Filter out any active medications that the builder already knows about.
      lensMedications = lensMedications.filter(
        (medication) =>
          !builderActiveRxNorms.includes(
            getRxNormCode(medication, includedResources) ?? ""
          )
      );

      const {
        sortColumn: myMedSortColumn = "display",
        sortOrder: myMedSortOrder = "asc",
      } = getSortInfo<MedicationStatementModel>(
        MedicationStatementModel,
        medsSort
      );

      medications = sort(
        medications,
        (c) =>
          new MedicationStatementModel(
            c,
            includedResources,
            lensActiveRxNorms,
            builderPatientRxNormStatuses
          )[myMedSortColumn],
        myMedSortOrder,
        myMedSortColumn === "effectiveStart"
      );

      const {
        sortColumn: otherProviderMedSortColumn = "display",
        sortOrder: otherProviderMedSortOrder = "asc",
      } = getSortInfo(MedicationStatementModel, otherProviderMedsSort);

      lensMedications = sort(
        lensMedications,
        (c) =>
          new MedicationStatementModel(
            c,
            includedResources,
            lensActiveRxNorms,
            builderPatientRxNormStatuses
          )[otherProviderMedSortColumn],
        otherProviderMedSortOrder,
        otherProviderMedSortColumn === "effectiveStart"
      );

      setLoaderState({
        builderPatientRxNormStatuses,
        activeMedicationModels: medications.map(
          (medication) =>
            new MedicationStatementModel(
              medication,
              includedResources,
              lensActiveRxNorms,
              builderPatientRxNormStatuses
            )
        ),
        otherProviderActiveMedicationModels: lensMedications.map(
          (medication) =>
            new MedicationStatementModel(
              medication,
              includedResources,
              lensActiveRxNorms,
              builderPatientRxNormStatuses
            )
        ),
      });
    }
  }, [
    medicationsResponse.data,
    lensActiveMedicationsResponse.data,
    patientMedicationsResponse.data,
    includeInactiveMeds,
    otherProviderMedsSort,
    medsSort,
  ]);

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-medications", className, {
        "ctw-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-heading-container">
        <div className="ctw-title">Medications</div>
        {!readOnly && (
          <button
            className="ctw-btn-clear ctw-link"
            type="button"
            onClick={handleAddNewMedication}
          >
            + Add Medication
          </button>
        )}
      </div>

      <div className="ctw-body-container">
        {showConfirmedMedsTable && (
          <div className="ctw-space-y-3">
            <div className="ctw-title-container">
              <div className="ctw-title">Confirmed Medications</div>
              <ToggleControl
                onFormChange={() =>
                  setIncludeInactiveMeds(!includeInactiveMeds)
                }
                toggleProps={{
                  name: "status",
                  text: "Include Inactive Medications",
                }}
              />
            </div>
            <MedicationsTableBase
              medicationStatements={activeMedicationModels}
            />
          </div>
        )}

        <div className="ctw-space-y-3">
          <div className="ctw-title-container">
            <div className="ctw-title">Other Provider Records</div>
          </div>
          <MedicationsTableBase
            medicationStatements={otherProviderActiveMedicationModels}
          />
        </div>
      </div>
      <DrawerFormWithFields
        title="Add Medication"
        patientID={patientID}
        action={createMedicationStatement}
        data={createMedData}
        schema={medicationStatementSchema}
        isOpen={drawerIsOpen}
        onClose={() => setDrawerIsOpen(false)}
      />
    </div>
  );
}
