import { useTranslation } from "react-i18next";
import { ConditionModel } from "../../../fhir/models/condition";
import { Drawer } from "../../core/drawer";
import { useEditConditionForm } from "../conditions/helpers/modal-hooks";
import { ConditionHistory } from "./conditions-history";
import { useDrawer } from "@/components/core/providers/drawer-provider";

export function useConditionHistory() {
  const { openDrawer } = useDrawer();
  const showEditConditionForm = useEditConditionForm();

  return ({
    condition,
    readOnly,
  }: {
    condition: ConditionModel;
    readOnly: boolean;
  }) => {
    openDrawer({
      component: (props) => (
        <ConditionHistoryDrawer
          condition={condition}
          onEdit={readOnly ? undefined : () => showEditConditionForm(condition)}
          {...props}
        />
      ),
    });
  };
}

export type ConditionHistoryDrawerProps = {
  className?: string;
  condition: ConditionModel;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
};

export function ConditionHistoryDrawer({
  className,
  condition,
  isOpen,
  onClose,
  onEdit,
}: ConditionHistoryDrawerProps) {
  const { t } = useTranslation();

  return (
    <Drawer
      className={className}
      title={t("resource.history.heading", {
        resource: t("glossary:condition_one"),
      })}
      isOpen={isOpen}
      onClose={onClose}
      showCloseFooter
    >
      <Drawer.Body>
        <ConditionHistory
          condition={condition}
          onClose={onClose}
          onEdit={onEdit}
        />
      </Drawer.Body>
    </Drawer>
  );
}
