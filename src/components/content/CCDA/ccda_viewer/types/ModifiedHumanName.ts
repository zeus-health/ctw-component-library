import { HumanName } from "fhir/r4";

type ModifiedHumanName = Omit<HumanName, "use"> & { use: string };

export type { ModifiedHumanName };
