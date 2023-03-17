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

export type MinFilterItem = {
  belowTheFold?: boolean; // should the filter be below divider in main menu?
  className?: cx.Argument;
  display: string | ((status: ListBoxOptionStatus) => ReactNode | string);
  icon?: IconDefinition;
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

export type FilterChangeEvent = Record<string, Filter>;
