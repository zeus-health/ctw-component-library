import { PatientHistoryAction } from "../patient-history/patient-history-action";
import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { RowActionsProps } from "@/components/core/table/table";
import { toggleArchive, usePatientConditionsOutside } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsOutsideProps = {
  className?: string;
  hideRequestRecords?: boolean;
};

export const PatientConditionsOutside = ({
  className,
  hideRequestRecords = false,
}: PatientConditionsOutsideProps) => {
  const query = usePatientConditionsOutside();

  return (
    <PatientConditionsBase
      query={query}
      className={className}
      action={<PatientHistoryAction hideRequestRecords={hideRequestRecords} />}
      rowActions={RowActions}
    />
  );
};

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const showAddConditionForm = useAddConditionForm();
  const { getRequestContext } = useCTW();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async (event) => {
          event.stopPropagation();
          await toggleArchive(record, await getRequestContext());
        }}
      >
        {record.isArchived ? "Restore" : "Dismiss"}
      </button>

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={(event) => {
          event.stopPropagation();
          showAddConditionForm(record);
        }}
      >
        Add
      </button>
    </div>
  );
};
