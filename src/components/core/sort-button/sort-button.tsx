import { ChevronDownIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { DropdownMenuAction } from "@/components/core/dropdown-action-menu";
import { IndexSort } from "@/components/core/table/table-helpers";

export type SortOption<T> = {
  display: string;
  key: keyof T;
  sortIndices: IndexSort<T>[];
};

export type SortButtonProps<T> = {
  className?: cx.Argument;
  currentSorts: SortOption<T>;
  options: SortOption<T>[];
  updateSorts: (newSorts: SortOption<T>) => void;
};

export const SortButton = <T,>({
  options,
  updateSorts,
  currentSorts,
  className,
}: SortButtonProps<T>) => (
  <DropdownMenuAction
    type="select"
    buttonClassName={cx(
      className,
      "ctw-bg-transparent ctw-border-none ctw-p-0"
    )}
    onItemSelect={(event) => {
      const item = options.filter((option) => option.display === event.key)[0];
      updateSorts(item);
    }}
    items={options.map((option) => ({
      key: option.display,
      name: option.display,
      isSelected: currentSorts.display === option.display,
    }))}
  >
    <div className="ctw-btn-default ctw-flex ctw-items-center ctw-space-x-1">
      <span>Sort</span>
      <ChevronDownIcon className="ctw-h-4" />
    </div>
  </DropdownMenuAction>
);
