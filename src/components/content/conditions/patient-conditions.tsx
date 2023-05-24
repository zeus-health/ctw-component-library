import cx from "classnames";
import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { RowActionsProps } from "@/components/core/table/table";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { usePatientBuilderConditions } from "@/services/fqs/conditions";

export type PatientConditionsProps = {
  className?: cx.Argument;
  enableFQS?: boolean;
  readOnly?: boolean;
};

const PatientConditionsComponent = ({
  className,
  enableFQS = false,
  readOnly = false,
}: PatientConditionsProps) => {
  const query = usePatientBuilderConditions(enableFQS);
  const showAddConditionForm = useAddConditionForm();
  const { t } = useBaseTranslations();

  const action = !readOnly && (
    <button type="button" className="ctw-btn-primary" onClick={() => showAddConditionForm()}>
      {t("resource.add", { resource: t("glossary:condition_one") })}
    </button>
  );

  return (
    <PatientConditionsBase
      action={action}
      className={cx(className)}
      query={query}
      readOnly={readOnly}
      rowActions={readOnly ? undefined : RowActions}
    />
  );
};

export const PatientConditions = withErrorBoundary(PatientConditionsComponent, "PatientConditions");

const RowActions = ({ record }: RowActionsProps<ConditionModel>) => {
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return (
    <div className="ctw-flex ctw-space-x-2">
      {!record.isDeleted && (
        <button type="button" className="ctw-btn-default" onClick={() => confirmDelete(record)}>
          Remove
        </button>
      )}

      <button
        type="button"
        className="ctw-btn-primary"
        onClick={() => showEditConditionForm(record)}
      >
        Edit
      </button>
    </div>
  );
};
