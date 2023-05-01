import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { ReactNode } from "react";
import { ListBoxOptionStatus } from "../list-box/list-box";

export type FilterBarProps = {
  className?: cx.Argument;
  onChange: (filters: FilterChangeEvent) => void;
  filters: FilterItem[];
  defaultState?: FilterChangeEvent;
};

type MinFilterItem = {
  belowDivider?: boolean; // Should the filter be below divider in main menu?
  className?: cx.Argument;
  display: string | ((status: ListBoxOptionStatus) => ReactNode | string);
  icon?: IconDefinition;
  key: string;
  // These allow the filter to still show up in the main filter menu
  // but with a different display and or icon.
  toggleDisplay?: string;
  toggleIcon?: IconDefinition;
};

export type FilterOptionSelect = {
  type: "select";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; name: string })[];
} & MinFilterItem;

export type FilterOptionCheckbox = {
  type: "checkbox";
  // Using strings in `values` will set both key and display automatically
  values: (string | { key: string; name: string; display: ReactNode })[];
} & MinFilterItem;

export type FilterOptionTag = {
  type: "tag";
} & MinFilterItem;

export type FilterItem = FilterOptionSelect | FilterOptionCheckbox | FilterOptionTag;

export type FilterValuesRecord = Record<string, string | string[]>;

export type Filter =
  | {
      key: string;
      selected: boolean;
      type: "tag";
    }
  | {
      key: string;
      selected: string[] | undefined;
      type: "checkbox";
    }
  | {
      key: string;
      selected: string;
      type: "select";
    };

export type FilterChangeEvent = Record<string, Filter | undefined>;
