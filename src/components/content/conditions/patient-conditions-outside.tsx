import { PatientHistoryAction } from "../patient-history/patient-history-action";
import { useAddConditionForm } from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { ScrollingContainerProps } from "@/components/core/ctw-box";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { useCTW } from "@/components/core/providers/ctw-provider";
import { RowActionsProps } from "@/components/core/table/table";
import { toggleArchive, usePatientConditionsOutside } from "@/fhir/conditions";
import { ConditionModel } from "@/fhir/models";

export type PatientConditionsOutsideProps = {
  className?: string;
  hideRequestRecords?: boolean;
  readOnly?: boolean;
} & ScrollingContainerProps;

const PatientConditionsOutsideComponent = ({
  className,
  height,
  hideRequestRecords = false,
  readOnly = false,
  scrollingEnabled = false,
}: PatientConditionsOutsideProps) => {
  const query = usePatientConditionsOutside();

  const action = (
    <PatientHistoryAction hideRequestRecords={hideRequestRecords || readOnly} />
  );

  return (
    <PatientConditionsBase
      outside
      action={action}
      className={className}
      height={height}
      query={query}
      readOnly={readOnly}
      rowActions={readOnly ? undefined : RowActions}
      scrollingEnabled={scrollingEnabled}
    />
  );
};

export const PatientConditionsOutside = withErrorBoundary(
  PatientConditionsOutsideComponent,
  "PatientConditions"
);

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const showAddConditionForm = useAddConditionForm();
  const { getRequestContext } = useCTW();

  return (
    <div className="ctw-flex ctw-space-x-2">
      <button
        type="button"
        className="ctw-btn-default"
        onClick={async () => {
          await toggleArchive(record, await getRequestContext());
        }}
      >
        {record.isArchived ? "Restore" : "Dismiss"}
      </button>

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={() => showAddConditionForm(record)}
      >
        Add
      </button>
    </div>
  );
};
