import { MedicationHeader } from "./medication-header";
import {
  createOrEditMedication,
  getAddMedicationWithDefaults,
} from "../../forms/actions/medications";
import {
  getAddMedicationData,
  getEditingPatientMedicationData,
  medicationAddSchema,
  medicationEditSchema,
} from "../../forms/schemas/medication-schema";
import { DrawerFormWithFields } from "@/components/core/form/drawer-form-with-fields";
import { ModalConfirmDelete } from "@/components/core/modal-confirm-delete";
import { useDrawer } from "@/components/core/providers/drawer-provider";
import { useModal } from "@/components/core/providers/modal-provider";
import { usePatient } from "@/components/core/providers/patient-provider";
import { useCTW } from "@/components/core/providers/use-ctw";
import { MedicationModel } from "@/fhir/models";
import { getNewMedication } from "@/fhir/models/medication";
import { useBaseTranslations } from "@/i18n";
import { deleteMedication } from "@/services/medications";
import { curry } from "@/utils/nodash";

export function useAddMedicationForm() {
  const { t } = useBaseTranslations();
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (referenceMedication?: MedicationModel) => {
    const medication = new MedicationModel(
      referenceMedication
        ? getAddMedicationWithDefaults(referenceMedication.resource)
        : getNewMedication(patientId)
    );

    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title="Add Medication"
          schema={medicationAddSchema}
          action={curry(createOrEditMedication)(medication, patientId)}
          data={getAddMedicationData({ medication })}
          {...props}
        />
      ),
    });
  };
}

export function useEditMedicationForm() {
  const { t } = useBaseTranslations();
  const { openDrawer } = useDrawer();
  const patientResponse = usePatient();
  const patientId = patientResponse.data?.id ?? "";

  return (medication: MedicationModel) => {
    openDrawer({
      component: (props) => (
        <DrawerFormWithFields
          title={t("resource.edit", { resource: t("glossary:medication_one") })}
          header={<MedicationHeader medication={medication} />}
          schema={medicationEditSchema}
          action={curry(createOrEditMedication)(medication, patientId)}
          data={getEditingPatientMedicationData({ medication })}
          {...props}
        />
      ),
    });
  };
}

export function useConfirmDeleteMedication() {
  const { t } = useBaseTranslations();
  const { openModal } = useModal();
  const { getRequestContext } = useCTW();

  return (medication: MedicationModel, onDelete?: (medication: MedicationModel) => void) => {
    const name =
      medication.display ??
      t("resource.unnamed", {
        resource: t("glossary:medication_one"),
      });

    openModal({
      component: (props) => (
        <ModalConfirmDelete
          resource={t("glossary:medication_one")}
          resourceName={name}
          onDelete={async () => {
            const requestContext = await getRequestContext();
            await deleteMedication(medication.resource, requestContext);
            onDelete?.(medication);
          }}
          {...props}
        />
      ),
    });
  };
}
