import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { useState } from "react";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { Sort } from "@/utils/sort";

export type SortOption<T extends object> = {
  display: string;
  sorts: Sort<T>[];
};

export type SortButtonProps<T extends object> = {
  className?: cx.Argument;
  defaultSort: SortOption<T>;
  onChange: (sort: SortOption<T>) => void;
  options: SortOption<T>[];
};

export const SortButton = <T extends object>({
  className,
  defaultSort,
  onChange,
  options,
}: SortButtonProps<T>) => {
  const [selected, setSelected] = useState<SortOption<T>>(defaultSort);

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
          Sort: <span className="ctw-font-normal">{selected.display}</span>{" "}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="ctw-w-2" />
      </div>
    </DropdownMenuAction>
  );
};
