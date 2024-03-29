import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { useAnalytics } from "@/components/core/providers/analytics/use-analytics";
import { FilterEntry } from "@/utils/filters";

export type ViewOption<T extends object> = {
  display: string;
  filters: FilterEntry<T>[];
};

export type ViewButtonProps<T extends object> = {
  className?: cx.Argument;
  defaultView: ViewOption<T>;
  onChange: (view: ViewOption<T>) => void;
  options: ViewOption<T>[];
};

export const ViewButton = <T extends object>({
  className,
  defaultView,
  onChange,
  options,
}: ViewButtonProps<T>) => {
  const [selected, setSelected] = useState<ViewOption<T>>(defaultView);
  const { trackInteraction } = useAnalytics();

  return (
    <DropdownMenuAction
      type="select"
      buttonClassName={cx(className, "ctw-bg-transparent ctw-border-none ctw-p-0 ctw-px-2")}
      onItemSelect={(item) => {
        const selectedOption = options.filter((option) => option.display === item.key)[0];
        onChange(selectedOption);
        setSelected(selectedOption);
        trackInteraction("change_view", { value: selectedOption.display });
      }}
      items={options.map((option) => ({
        key: option.display,
        name: option.display,
        isSelected: selected.display === option.display,
      }))}
    >
      <div className="ctw-btn-default ctw-flex ctw-items-center ctw-space-x-2">
        <span className="ctw-mr-1.5 ctw-w-full ctw-font-normal">{selected.display}</span>
        <FontAwesomeIcon icon={faChevronDown} className="ctw-ml-auto ctw-w-2" />
      </div>
    </DropdownMenuAction>
  );
};
