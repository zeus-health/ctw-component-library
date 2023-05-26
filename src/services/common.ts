import { DomainResource } from "fhir/r4";
import { SYSTEM_ZUS_OWNER } from "@/fhir/system-urls";
import { filter, some } from "@/utils/nodash";

export const filterResourcesByBuilderId = <T extends DomainResource>(
  resources: T[],
  builderId: string
) => {
  const filteredResources = filter(resources, (record) =>
    some(record.meta?.tag, {
      system: SYSTEM_ZUS_OWNER,
      code: `builder/${builderId}`,
    })
  );
  return filteredResources;
};
