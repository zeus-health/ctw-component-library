import cx from "classnames";
import { ReactNode } from "react";

export type FilterBarProps<T extends FilterItem> = {
  className?: cx.Argument;
  handleOnChange: (filters: FilterChangeEvent) => void;
  filters: T[];
  defaultState?: FilterChangeEvent;
};

export type FilterItemStatus = {
  active: boolean;
};

export type MinFilterItem = {
  belowTheFold?: boolean; // should the filter be below divider in main menu?
  className?: cx.Argument;
  display: string | ((status: FilterItemStatus) => ReactNode | string);
  icon?: string;
  key: string;
  type: "tag";
};

export type FilterOptionSelect = {
  type: "select";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; display: string })[];
} & Omit<MinFilterItem, "type">;

export type FilterOptionCheckbox = {
  type: "checkbox";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; display: string })[];
} & Omit<MinFilterItem, "type">;

export type FilterItem =
  | MinFilterItem
  | FilterOptionSelect
  | FilterOptionCheckbox;

export type FilterValuesRecord = Record<string, string | string[]>;

export type FilterChangeEvent = Record<
  string,
  | undefined
  | {
      key: string;
      selected: boolean;
      type: "tag";
    }
  | {
      key: string;
      selected: string[];
      type: "checkbox";
    }
  | {
      key: string;
      selected: string;
      type: "select";
    }
>;
