import { ContactPoint } from "fhir/r4";

type ModifiedContactPoint = Omit<ContactPoint, "use" | "system"> & {
  use: string;
  system: string;
};

export type { ModifiedContactPoint };
