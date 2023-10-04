import cx from "classnames";
import {
  useAddConditionForm,
  useConfirmDeleteCondition,
  useEditConditionForm,
} from "./helpers/modal-hooks";
import { PatientConditionsBase } from "./helpers/patient-conditions-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { AnalyticsProvider } from "@/components/core/providers/analytics/analytics-provider";
import { RowActionsConfigProp } from "@/components/core/table/table-rows";
import { ConditionModel } from "@/fhir/models";
import { useBaseTranslations } from "@/i18n";
import { usePatientBuilderConditions } from "@/services/conditions";

export type PatientConditionsProps = {
  className?: cx.Argument;
  readOnly?: boolean;
};

const PatientConditionsComponent = ({ className, readOnly = false }: PatientConditionsProps) => {
  const query = usePatientBuilderConditions();
  const showAddConditionForm = useAddConditionForm();
  const { t } = useBaseTranslations();
  const rowActions = useRowActions();
  const action = !readOnly && (
    <button type="button" className="ctw-btn-primary" onClick={() => showAddConditionForm()}>
      {t("resource.add", { resource: t("glossary:condition_one") })}
    </button>
  );

  return (
    <AnalyticsProvider componentName="PatientConditions">
      <PatientConditionsBase
        action={action}
        className={cx(className)}
        query={query}
        readOnly={readOnly}
        rowActions={readOnly ? undefined : rowActions}
      />
    </AnalyticsProvider>
  );
};

export const PatientConditions = withErrorBoundary(PatientConditionsComponent, "PatientConditions");

function useRowActions(): (r: ConditionModel) => RowActionsConfigProp<ConditionModel> {
  const showEditConditionForm = useEditConditionForm();
  const confirmDelete = useConfirmDeleteCondition();

  return (record: ConditionModel): RowActionsConfigProp<ConditionModel> => [
    {
      text: "Remove",
      className: "ctw-btn-default",
      onClick: () => confirmDelete(record),
    },
    {
      text: "Edit",
      className: "ctw-btn-primary",
      onClick: () => showEditConditionForm(record),
    },
  ];
}
