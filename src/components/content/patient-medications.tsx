import { format } from "date-fns";
import { compact } from "lodash";
import { useEffect, useContext, useRef, useState } from "react";
import { MedicationsTableBase } from "@/components/content/medications-table-base";
import { DrawerFormWithFields, FormEntry } from "@/components/content/forms/drawer-form-with-fields";
import { createMedicationStatement, getMedicationFormData, medicationStatementSchema } from "./forms/medications";
import type { ResourceMap } from "@/fhir/types";
import { MedicationStatementModel } from "@/models/medication-statement";
import { CTWPatientContext, usePatient } from "../core/patient-provider";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { useFhirClientRef } from "@/fhir/utils";
import { getMergedIncludedResources } from "@/fhir/bundle";
import {
  createPatientStatusMap,
  getRxNormCode,
} from "@/fhir/medication";
import type { ClinicalStatus } from "@/fhir/medication";
import { getSortInfo, sort } from "@/utils/sort";
import cx from "classnames";
import "./patient-medications.scss";
import { ToggleControl } from "@/components/core/toggle-control";
import { useQueryPatientLensMeds, useQueryPatientMeds } from "@/hooks/use-medications";

const BUILDER_PAGING = {
  size: 10,
  param: "my-medications-page",
};

const LENS_PAGING = {
  size: 10,
  param: "potential-medications-page",
};

type LoaderData = {
  builderMedications?: fhir4.MedicationStatement[];
  builderMedicationsTotal?: number;
  builderMedicationsPage?: number;
  builderPatientRxNormStatuses?: Record<string, string>;
  lensMedications?: fhir4.MedicationStatement[];
  lensMedicationsTotal?: number;
  lensMedicationsPage?: number;
  lensActiveRxNorms?: string[];
  includedResources?: ResourceMap;
};

export type MedicationFilters = {
  "clinical-status"?: ClinicalStatus | ClinicalStatus[];
};

type PatientMedicationsProps = {
  className?: string;
  status?: ClinicalStatus,
  medsSort?: string,
  potentialMedsSort?: string,
  // should we render the Zus confirmed meds component (default true)
  showConfirmedMedsTable?: boolean,
  // should we show the button to add new meds (default true)?
  showAddNewMedsButton?: boolean,
}

export function PatientMedications (
  { className,
    medsSort = "",
    potentialMedsSort = "",
    showAddNewMedsButton = true,
    showConfirmedMedsTable = true,
  }: PatientMedicationsProps) {
  const [{
    builderMedications = [],
    lensMedications = [],
    builderMedicationsTotal = 0,
    builderMedicationsPage = 0,
    builderPatientRxNormStatuses,
    lensMedicationsTotal = 0,
    lensMedicationsPage = 0,
    lensActiveRxNorms,
    includedResources,
  }, setLoaderState] = useState<LoaderData>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const breakpoints = useBreakpoints(containerRef);
  const { patientID, systemURL } = useContext(CTWPatientContext);
  const fhirClientRef = useFhirClientRef();
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
      subject: { reference: `Patient/${patient.data.id}`, display: patient.data.display },
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

  // QUERIES
  const options = {
    enabled: !!(patient.data && fhirClientRef.current),
    meta: { fhirClientRef },
  };
  const medicationsResponse = useQueryPatientMeds(statusParam);
  const lensActiveMedicationsResponse = useQueryPatientLensMeds();
  const patientMedicationsResponse = useQueryPatientMeds();

  // START TMP BUILD
  useEffect(() => {
      if (medicationsResponse.data?.bundle && lensActiveMedicationsResponse.data?.bundle && patientMedicationsResponse.data?.bundle) {
        let { medications } = medicationsResponse.data;
        let lensActiveMedications = lensActiveMedicationsResponse.data.medications;
        const patientMedications = lensActiveMedicationsResponse.data.medications;
        // @todo refactor so eslint directive not needed
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const includedResources = getMergedIncludedResources([
          medicationsResponse.data.bundle,
          lensActiveMedicationsResponse.data.bundle,
          patientMedicationsResponse.data.bundle
        ]);

        // @todo refactor so eslint directive not needed
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const builderPatientRxNormStatuses = createPatientStatusMap(
          patientMedications,
          includedResources
        );

        const builderActiveRxNorms = compact(
          medications
            .filter((m) => m.status === "active") // Track ONLY active builder meds.
            .map((medication) => getRxNormCode(medication, includedResources))
        ) as string[];

        const activeRxNorms = compact(
          lensActiveMedications.map((medication) =>
            getRxNormCode(medication, includedResources)
          )) as string[];

        // Filter out any active medications that the builder already knows about.
        lensActiveMedications = lensActiveMedications.filter(
          (medication) =>
            !builderActiveRxNorms.includes(
              getRxNormCode(medication, includedResources) ?? ""
            )
        );

        const {
          sortColumn: myMedSortColumn = "display",
          sortOrder: myMedSortOrder = "asc"
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
              activeRxNorms,
              builderPatientRxNormStatuses
            )[myMedSortColumn],
          myMedSortOrder,
          myMedSortColumn === "effectiveStart"
        );

        const {
          sortColumn: potentialMedSortColumn = "display",
          sortOrder: potentialMedSortOrder = "asc",
        } = getSortInfo(
          MedicationStatementModel,
          potentialMedsSort
        );

        lensActiveMedications = sort(
          lensActiveMedications,
          (c) =>
            new MedicationStatementModel(
              c,
              includedResources,
              activeRxNorms,
              builderPatientRxNormStatuses
            )[potentialMedSortColumn],
          potentialMedSortOrder,
          potentialMedSortColumn === "effectiveStart"
        );

        // @todo: don't set these to 0 automatically
        const builderMedicationsPageOffset = 0;
        const lensMedicationsPageOffset = 0;

        setLoaderState({
          lensMedications: lensActiveMedications.slice(
            lensMedicationsPageOffset,
            lensMedicationsPageOffset + LENS_PAGING.size
          ),
          builderMedications: medications.slice(
            builderMedicationsPageOffset,
            builderMedicationsPageOffset + BUILDER_PAGING.size
          ),
          builderMedicationsTotal: medications.length,
          builderMedicationsPage,
          builderPatientRxNormStatuses,
          lensMedicationsTotal: lensActiveMedications.length,
          lensMedicationsPage,
          lensActiveRxNorms: activeRxNorms,
          includedResources,
        });
      }
    },
    [
      medicationsResponse.data,
      lensActiveMedicationsResponse.data,
      patientMedicationsResponse.data,
      builderMedicationsPage,
      lensMedicationsPage,
      includeInactiveMeds,
      potentialMedsSort,
      medsSort,
    ]);
  // END TMP BUILD


  const activeMedicationModels = builderMedications.map(
    (medication) =>
      new MedicationStatementModel(
        medication,
        includedResources,
        lensActiveRxNorms,
        builderPatientRxNormStatuses
      )
  );

  const potentialActiveMedicationModels = lensMedications.map(
    (medication) =>
      new MedicationStatementModel(
        medication,
        includedResources,
        lensActiveRxNorms,
        builderPatientRxNormStatuses
      )
  );

  return (
    <div
      ref={containerRef}
      className={cx("ctw-patient-medications", className, {
        "ctw-stacked": breakpoints.sm,
      })}
    >
      <div className="ctw-heading-container">
        <div className="ctw-title">Medications</div>
        { showAddNewMedsButton && <button
          className="ctw-btn-clear ctw-link"
          type="button"
          onClick={handleAddNewMedication}
        >
          + Add Medication
        </button> }
      </div>

      <div className="ctw-body-container">
        { showConfirmedMedsTable && <div className="ctw-space-y-3">
          <div className="ctw-title-container">
            <div className="ctw-title">Confirmed Medications</div>
            <ToggleControl
              onFormChange={() => setIncludeInactiveMeds(!includeInactiveMeds)}
              toggleProps={{ name: "status", text: "Include Inactive Medications" }}
            />
          </div>
          <MedicationsTableBase
            medicationStatements={activeMedicationModels}
            total={builderMedicationsTotal}
            param={BUILDER_PAGING.param}
            pageSize={BUILDER_PAGING.size}
            currentPage={builderMedicationsPage}
          />
        </div> }

        <div className="ctw-space-y-3">
          <div className="ctw-title-container">
            <div className="ctw-title">
              Potential Active Medications
            </div>
          </div>
          <MedicationsTableBase
            medicationStatements={potentialActiveMedicationModels}
            total={lensMedicationsTotal}
            param={LENS_PAGING.param}
            pageSize={LENS_PAGING.size}
            currentPage={lensMedicationsPage}
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
