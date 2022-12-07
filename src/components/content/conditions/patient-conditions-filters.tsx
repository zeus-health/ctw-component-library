export type FilterCollection = "patient" | "other";

export type Filters = {
  collection: FilterCollection;
  showHistoric: boolean;
};
