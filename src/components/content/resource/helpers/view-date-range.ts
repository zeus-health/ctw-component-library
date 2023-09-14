import { differenceInDays } from "date-fns";
import { ViewOption } from "./view-button";

function dateFilter<T extends object>(field: keyof T, days: number) {
  const now = new Date();
  // Return any that don't have a date or are within "days".
  return (data: T[]) =>
    data.filter((d) => !d[field] || differenceInDays(now, new Date(String(d[field]))) <= days);
}

export function getDateRangeView<T extends object>(field: Extract<keyof T, string>) {
  const viewOptions: ViewOption<T>[] = [
    {
      display: "Past 30 days",
      filters: [dateFilter<T>(field, 30)],
    },
    {
      display: "Past 3 months",
      filters: [dateFilter<T>(field, 90)],
    },
    {
      display: "Past 6 months",
      filters: [dateFilter<T>(field, 180)],
    },
    {
      display: "Past year",
      filters: [dateFilter<T>(field, 365)],
    },
    {
      display: "All time",
      filters: [],
    },
  ];
  return {
    viewOptions,
    past30days: viewOptions[0],
    past3months: viewOptions[1],
    past6Months: viewOptions[2],
    allTime: viewOptions[4],
  };
}
