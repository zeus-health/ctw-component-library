import { Address } from "fhir/r4";

type ModifiedAddress = Omit<Address, "use" | "type"> & {
  use: string;
  type?: string;
};

export type { ModifiedAddress };
