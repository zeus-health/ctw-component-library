import { ConditionModel } from "@/models/conditions";
import { useState } from "react";
import { ConditionHistoryDetailCard } from "./condition-history-detail-card";
import { ConditionHistoryPreviewCard } from "./condition-history-preview-card";

export type ConditionHistoryPreviewAndDetailProp = {
  condition: ConditionModel;
};

export function ConditionHistoryDetailPreviewCard({
  condition,
}: ConditionHistoryPreviewAndDetailProp) {
  const [isDetailShown, setIsDetailShown] = useState(false);
  return (
    <>
      <ConditionHistoryPreviewCard
        recordedDate={condition.recordedDate || ""}
        name={condition.snomedDisplay || ""}
        recorder={condition.recorder || ""}
        isDetailShown={isDetailShown}
        onClick={() => setIsDetailShown(!isDetailShown)}
      />
      {isDetailShown && <ConditionHistoryDetailCard condition={condition} />}
    </>
  );
}
