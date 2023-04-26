import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FilterItem } from "@/components/core/filter-bar/filter-bar-types";

export const dismissFilter: FilterItem = {
  key: "isArchived",
  type: "tag",
  belowDivider: true,
  display: ({ listView }) => (listView ? "show dismissed records" : "dismissed records"),
  icon: faEye,
  toggleDisplay: "hide dismissed records",
  toggleIcon: faEyeSlash,
};
