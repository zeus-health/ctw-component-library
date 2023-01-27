import {
  formatAge,
  formatDateISOToLocal,
  maybeFormatDateStringToLocal,
} from "./formatters";

export function displayOnset(
  resource: fhir4.Condition | fhir4.AllergyIntolerance
): string | undefined {
  if (resource.onsetAge) {
    return formatAge(resource.onsetAge);
  }

  if (resource.onsetDateTime) {
    return formatDateISOToLocal(resource.onsetDateTime);
  }

  if (resource.onsetPeriod) {
    return formatDateISOToLocal(resource.onsetPeriod.start);
  }

  if (resource.onsetRange) {
    return formatDateISOToLocal(resource.onsetRange.low?.value?.toString());
  }

  return maybeFormatDateStringToLocal(resource.onsetString);
}
