import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
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

  return (
    <DropdownMenuAction
      type="select"
      buttonClassName={cx(className, "ctw-bg-transparent ctw-border-none ctw-p-0")}
      onItemSelect={(item) => {
        const selectedOption = options.filter((option) => option.display === item.key)[0];
        onChange(selectedOption);
        setSelected(selectedOption);
      }}
      items={options.map((option) => ({
        key: option.display,
        name: option.display,
        isSelected: selected.display === option.display,
      }))}
    >
      <div className="ctw-btn-default ctw-flex ctw-items-center ctw-space-x-2">
        <span>
          <span className="ctw-font-normal">{selected.display}</span>{" "}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="ctw-w-2" />
      </div>
    </DropdownMenuAction>
  );
};
