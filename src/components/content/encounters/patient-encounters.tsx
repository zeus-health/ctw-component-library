import { encounterFilters } from "./helpers/filters";
import { PatientEncountersBase } from "./helpers/patient-encounters-base";
import { withErrorBoundary } from "@/components/core/error-boundary";
import { usePatientEncounters } from "@/fhir/encounters";

export type PatientEncountersProps = {
  className?: string;
};

const PatientEncountersComponent = ({ className }: PatientEncountersProps) => {
  const { data, isLoading } = usePatientEncounters();

  return (
    <PatientEncountersBase
      className={className}
      query={{ data, isLoading }}
      filters={encounterFilters(data)}
    />
  );
};

export const PatientEncounters = withErrorBoundary(PatientEncountersComponent, "PatientEncounters");
